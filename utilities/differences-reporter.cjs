'use strict';

const fs = require('fs');
const path = require('path');
const { Runner } = require('mocha');

const { EVENT_TEST_PASS, EVENT_TEST_FAIL, EVENT_RUN_END } = Runner.constants;

const OUTPUT_DIR = path.resolve(process.cwd(), 'difference-reports');
const MAX_TABLE_ROWS = 100;
const MAX_LIST_ITEMS = 25;
const PREVIEW_LENGTH = 200;

const isPlainObject = (v) => v !== null && typeof v === 'object' && !Array.isArray(v);
const preview = (v) => {
    const s = v === undefined ? 'undefined' : JSON.stringify(v);
    return s.length > PREVIEW_LENGTH ? `${s.slice(0, PREVIEW_LENGTH)}…` : s;
};
const cell = (v) => String(v).replace(/\|/g, '\\|').replace(/\r?\n/g, ' ');
const generalize = (p) => p.replace(/\[\d+\]/g, '[*]');
const joinPath = (base, key) => (base ? `${base}.${key}` : key);
const codeList = (items) => items.map((i) => `\`${i}\``).join(', ');

const caseStyle = (key) => {
    if (/^[A-Z][A-Z0-9_]*$/.test(key)) return 'UPPERCASE';
    if (/^[A-Z]/.test(key)) return 'PascalCase';
    if (/^[a-z][a-z0-9_]*$/.test(key)) return 'lowercase';
    if (/^[a-z]/.test(key)) return 'camelCase';
    return 'mixed case';
};

// Walks both bodies, matching object keys case-insensitively (the tests ignore `_links` too)
const compare = (oldVal, newVal, currentPath, acc) => {
    if (isPlainObject(oldVal) && isPlainObject(newVal)) {
        const oldKeys = new Map(Object.keys(oldVal).filter((k) => k !== '_links').map((k) => [k.toLowerCase(), k]));
        const newKeys = new Map(Object.keys(newVal).filter((k) => k !== '_links').map((k) => [k.toLowerCase(), k]));
        for (const [lower, oldKey] of oldKeys) {
            const newKey = newKeys.get(lower);
            const keyPath = joinPath(currentPath, oldKey);
            if (newKey === undefined) {
                acc.onlyOld.push({ path: keyPath, value: oldVal[oldKey] });
                continue;
            }
            if (newKey !== oldKey) acc.renames.push({ parent: currentPath, from: oldKey, to: newKey });
            compare(oldVal[oldKey], newVal[newKey], keyPath, acc);
        }
        for (const [lower, newKey] of newKeys) {
            if (!oldKeys.has(lower)) acc.onlyNew.push({ path: joinPath(currentPath, newKey), value: newVal[newKey] });
        }
        return;
    }

    if (Array.isArray(oldVal) && Array.isArray(newVal)) {
        if (oldVal.length !== newVal.length) {
            acc.lengths.push({ path: currentPath, oldLen: oldVal.length, newLen: newVal.length });
        }
        const shared = Math.min(oldVal.length, newVal.length);
        for (let i = 0; i < shared; i++) compare(oldVal[i], newVal[i], `${currentPath}[${i}]`, acc);
        for (let i = shared; i < oldVal.length; i++) acc.onlyOld.push({ path: `${currentPath}[${i}]`, value: oldVal[i] });
        for (let i = shared; i < newVal.length; i++) acc.onlyNew.push({ path: `${currentPath}[${i}]`, value: newVal[i] });
        return;
    }

    if (JSON.stringify(oldVal) !== JSON.stringify(newVal)) {
        acc.values.push({ path: currentPath || '(root)', oldValue: oldVal, newValue: newVal });
    }
};

const describeRenames = (renames) => {
    const lines = [];
    const topLevel = renames.filter((r) => r.parent === '');
    const unique = new Map();
    topLevel.forEach((r) => unique.set(`${r.from}>${r.to}`, r));
    const top = [...unique.values()];

    if (top.length === 1) {
        const r = top[0];
        lines.push(`The top-level field was renamed from ${caseStyle(r.from)} \`${r.from}\` to ${caseStyle(r.to)} \`${r.to}\`.`);
    } else if (top.length > 1) {
        lines.push(`The top-level fields were renamed: ${top.map((r) => `\`${r.from}\` → \`${r.to}\``).join(', ')}.`);
    }

    const byParent = new Map();
    renames.filter((r) => r.parent !== '').forEach((r) => {
        const parent = generalize(r.parent);
        if (!byParent.has(parent)) byParent.set(parent, new Map());
        byParent.get(parent).set(`${r.from}>${r.to}`, r);
    });

    const parents = [...byParent.entries()];
    parents.slice(0, MAX_LIST_ITEMS).forEach(([parent, pairs]) => {
        const list = [...pairs.values()];
        const lowercased = list.every((r) => r.to === r.from.toLowerCase());
        const verb = lowercased ? 'lowercased' : 'renamed';
        const where = parent.endsWith('[*]') ? `every object in \`${parent.slice(0, -3)}\`` : `\`${parent}\``;
        lines.push(`Inside ${where}, the key${list.length > 1 ? 's' : ''} ${codeList(list.map((r) => r.from))} `
            + `${list.length > 1 ? 'were' : 'was'} also ${verb} to ${codeList(list.map((r) => r.to))}.`);
    });
    if (parents.length > MAX_LIST_ITEMS) {
        lines.push(`…and nested keys under ${parents.length - MAX_LIST_ITEMS} more location(s) had the same casing change.`);
    }
    return lines;
};

const describeIdenticalContent = (oldBody) => {
    if (!isPlainObject(oldBody)) return [];
    return Object.entries(oldBody).filter(([k]) => k !== '_links').map(([key, value]) => {
        if (Array.isArray(value)) {
            const isSimpleObjects = value.length > 0 && value.length <= 10 && value.every((item) => isPlainObject(item)
                && Object.values(item).every((v) => v === null || typeof v !== 'object')
                && Object.keys(item).length <= 3);
            const values = isSimpleObjects
                ? ` and their actual values (${value.map((item) => Object.values(item).join('/')).join(', ')})`
                : '';
            const noun = value.every(isPlainObject) ? 'objects' : 'items';
            return `All ${value.length} ${noun} in \`${key}\`${values} are identical between old and new — same order, same count, same content.`;
        }
        return `The value of \`${key}\` is identical between old and new.`;
    });
};

const describeComparison = (oldBody, newBody, labels) => {
    const acc = { renames: [], onlyOld: [], onlyNew: [], values: [], lengths: [] };
    compare(oldBody, newBody, '', acc);

    const realDiffs = acc.onlyOld.length + acc.onlyNew.length + acc.values.length + acc.lengths.length;
    const out = ['**What the difference is:**', ''];

    if (realDiffs === 0 && acc.renames.length === 0) {
        out.push('No differences — both responses are identical.');
        return { lines: out, count: 0, kind: 'None' };
    }

    if (realDiffs === 0) {
        out.push('This is a **field-name casing change only** — no data values changed.', '');
        [...describeRenames(acc.renames), ...describeIdenticalContent(oldBody)].forEach((l) => out.push(`- ${l}`));
        return { lines: out, count: 0, kind: 'Field-name casing only' };
    }

    const summary = [
        acc.values.length && `${acc.values.length} value change(s)`,
        acc.lengths.length && `${acc.lengths.length} array size change(s)`,
        acc.onlyOld.length && `${acc.onlyOld.length} field(s)/item(s) only in ${labels.old}`,
        acc.onlyNew.length && `${acc.onlyNew.length} field(s)/item(s) only in ${labels.new}`
    ].filter(Boolean).join(', ');
    out.push(`There are **real data differences**: ${summary}.`
        + (acc.renames.length ? ' Field-name casing also changed (listed below).' : ''));

    if (acc.renames.length) {
        out.push('', '**Field-name casing changes:**', '');
        describeRenames(acc.renames).forEach((l) => out.push(`- ${l}`));
    }

    if (acc.lengths.length) {
        out.push('', '**Array size changes:**', '');
        acc.lengths.slice(0, MAX_LIST_ITEMS).forEach((l) => out.push(
            `- \`${l.path || '(root)'}\`: ${labels.old} has ${l.oldLen} item(s), ${labels.new} has ${l.newLen} item(s).`));
    }

    const listSection = (title, items) => {
        if (!items.length) return;
        out.push('', `**${title}:**`, '');
        items.slice(0, MAX_LIST_ITEMS).forEach((i) => out.push(`- \`${i.path}\` = \`${preview(i.value)}\``));
        if (items.length > MAX_LIST_ITEMS) out.push(`- …and ${items.length - MAX_LIST_ITEMS} more.`);
    };
    listSection(`Only in ${labels.old}`, acc.onlyOld);
    listSection(`Only in ${labels.new}`, acc.onlyNew);

    if (acc.values.length) {
        out.push('', '**Value changes:**', '', `| Field path | ${labels.old} value | ${labels.new} value |`, '|---|---|---|');
        acc.values.slice(0, MAX_TABLE_ROWS).forEach((v) => out.push(
            `| \`${cell(v.path)}\` | ${cell(preview(v.oldValue))} | ${cell(preview(v.newValue))} |`));
        if (acc.values.length > MAX_TABLE_ROWS) out.push('', `…and ${acc.values.length - MAX_TABLE_ROWS} more value change(s).`);
    }

    return {
        lines: out,
        count: realDiffs,
        kind: `Data differences (${realDiffs})${acc.renames.length ? ' + casing' : ''}`
    };
};

const contextsOf = (test) => {
    const ctx = test.context;
    if (!ctx) return [];
    const list = Array.isArray(ctx) ? ctx : [ctx];
    return list.map((c) => {
        if (typeof c !== 'string') return c;
        try { return JSON.parse(c); } catch { return c; }
    }).filter((c) => c && typeof c === 'object');
};

const statusText = (s) => (s === 204 ? '204 (No Content)' : s ?? 'no response');

const buildEntry = ({ test, state, err }) => {
    const responses = contextsOf(test)
        .filter((c) => c.value && c.value.Method && Object.prototype.hasOwnProperty.call(c.value, 'Status'))
        .map((c) => c.value);
    const [primary, secondary] = responses;
    const api = primary?.URL?.split('?')[0].split('/').pop() || test.titlePath()[0].trim();
    const dataset = (test.title.match(/dataset_\d+/) || [test.title.trim()])[0];
    const labels = {
        old: `Old (${primary?.Method ?? 'POST'})`,
        new: `New (${secondary ? (secondary.Method === 'GET' ? 'GET' : 'Consolidate POST') : 'secondary'})`
    };

    const lines = [`### ${dataset} — ${state === 'passed' ? 'PASSED' : 'FAILED'}`, ''];
    lines.push('| | Method | URL | Response Status |', '|---|---|---|---|');
    [[labels.old, primary], [labels.new, secondary]].forEach(([label, r]) => {
        lines.push(`| ${label} | ${r?.Method ?? '-'} | ${cell(r?.URL ?? '-')} | ${statusText(r?.Status)} |`);
    });
    lines.push('');

    let count = 0;
    let kind = 'Not compared';
    if (!primary || !secondary) {
        lines.push('**What the difference is:**', '', 'Comparison not possible — one of the responses was not captured.');
    } else if (primary.Status !== 200 || secondary.Status !== 200) {
        kind = 'Status mismatch';
        const bad = [[labels.old, primary], [labels.new, secondary]]
            .filter(([, r]) => r.Status !== 200)
            .map(([label, r]) => `${label} returned ${statusText(r.Status)}`);
        lines.push('**What the difference is:**', '', `Comparison not possible — ${bad.join(' and ')}, so there is no body to compare.`);
        count = 1;
    } else {
        const result = describeComparison(primary.Body, secondary.Body, labels);
        lines.push(...result.lines);
        count = result.count;
        kind = result.kind;
    }

    if (state === 'failed' && err && count === 0 && !/expected .* to (be|equal)/i.test(err.message)) {
        lines.push('', `**Test error:** \`${cell(err.message.split('\n')[0])}\``);
    }

    return {
        api, dataset, state, kind,
        oldStatus: statusText(primary?.Status),
        newStatus: statusText(secondary?.Status),
        mode: secondary?.Method === 'GET' ? 'POST vs GET' : secondary ? 'POST vs POST' : '-',
        lines
    };
};

class DifferencesReporter {
    constructor(runner) {
        const results = [];
        runner.on(EVENT_TEST_PASS, (test) => results.push({ test, state: 'passed' }));
        runner.on(EVENT_TEST_FAIL, (test, err) => results.push({ test, state: 'failed', err }));
        runner.once(EVENT_RUN_END, () => {
            try {
                writeReport(results);
            } catch (e) {
                console.error(`Differences report was not written: ${e.message}`);
            }
        });
    }
}

const writeReport = (results) => {
    // npm sets npm_lifecycle_event to the script name, e.g. ListWarningLabelsPostGet or RunAllPostGet
    const name = (process.env.npm_lifecycle_event || 'differences').replace(/[^\w.-]/g, '_');
    const hookFailures = results.filter((r) => r.test.type === 'hook');
    const entries = results.filter((r) => r.test.type !== 'hook').map(buildEntry);

    const out = [`# ${name} — Differences Report`, '', `Generated: ${new Date().toISOString()}`, ''];
    out.push(`Total tests: ${entries.length} | Passed: ${entries.filter((e) => e.state === 'passed').length} `
        + `| Failed: ${entries.filter((e) => e.state === 'failed').length}`, '');

    if (hookFailures.length) {
        out.push('## Setup errors', '');
        hookFailures.forEach((h) => out.push(`- ${cell(h.test.fullTitle())}: \`${cell(h.err?.message?.split('\n')[0] ?? '')}\``));
        out.push('');
    }

    out.push('## Summary', '', '| API | Dataset | Mode | Result | Old Status | New Status | Difference |', '|---|---|---|---|---|---|---|');
    entries.forEach((e) => out.push(`| ${e.api} | ${e.dataset} | ${e.mode} | ${e.state.toUpperCase()} | ${e.oldStatus} | ${e.newStatus} | ${e.kind} |`));
    out.push('');

    const byApi = new Map();
    entries.forEach((e) => {
        if (!byApi.has(e.api)) byApi.set(e.api, []);
        byApi.get(e.api).push(e);
    });
    for (const [api, apiEntries] of byApi) {
        out.push(`## ${api}`, '');
        apiEntries.forEach((e) => out.push(...e.lines, ''));
    }

    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    const file = path.join(OUTPUT_DIR, `${name}.md`);
    fs.writeFileSync(file, out.join('\n'));
    console.log(`Differences report: ${file}`);
};

module.exports = DifferencesReporter;
