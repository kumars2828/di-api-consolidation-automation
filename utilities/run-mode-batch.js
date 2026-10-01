import { existsSync, mkdirSync, readFileSync, readdirSync, renameSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { mkdtempSync } from 'node:fs';
import { resolve } from 'node:path';
import { tmpdir } from 'node:os';
import { spawn, spawnSync } from 'node:child_process';

const mode = process.argv[2];
const isListOnly = process.argv.includes('--list');
const isParallel = process.argv.includes('--parallel');

const MODE_SUFFIX = {
  POST_GET: 'PostGet',
  POST_POST: 'PostPost'
};

if (!MODE_SUFFIX[mode]) {
  console.error('Usage: node ./utilities/run-mode-batch.js POST_GET|POST_POST [--list] [--parallel]');
  process.exit(1);
}

const packageJsonPath = resolve(process.cwd(), 'package.json');
const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf8'));
const scripts = packageJson.scripts || {};
const suffix = MODE_SUFFIX[mode];

const matchedScriptNames = Object.keys(scripts)
  .filter((name) => name.endsWith(suffix))
  .filter((name) => !name.startsWith('RunAll'))
  .sort((a, b) => a.localeCompare(b));

if (matchedScriptNames.length === 0) {
  console.error(`No scripts found for mode ${mode}. Expected names ending with ${suffix}.`);
  process.exit(1);
}

console.log(`Mode: ${mode}`);
console.log(`Matched scripts (${matchedScriptNames.length}):`);
matchedScriptNames.forEach((scriptName) => console.log(`- ${scriptName}`));

const reportDir = resolve(process.cwd(), 'mochawesome-report');
const reportHtml = resolve(reportDir, 'report.html');
const reportJson = resolve(reportDir, 'report.json');
const reporterConfigFile = isParallel ? 'report-config-parallel.json' : 'report-config.json';
const lastModified = (file) => existsSync(file) ? statSync(file, { bigint: true }).mtimeNs : null;
const priorHtmlModified = lastModified(reportHtml);
const priorJsonModified = lastModified(reportJson);
const environment = { ...process.env };
const testRuns = [];

for (const scriptName of matchedScriptNames) {
  const script = scripts[scriptName];
  const match = script.match(/^(?:cross-env\s+)?([A-Z_]+)=(POST_GET|POST_POST) mocha (\.\/test\/\S+\.js)\s/);
  if (!match || match[2] !== mode) {
    console.error(`Cannot include script in batch: ${scriptName}`);
    process.exit(1);
  }
  environment[match[1]] = mode;
  testRuns.push({ scriptName, testFile: match[3], environmentVariable: match[1] });
}

if (isListOnly) {
  process.exit(0);
}

if (isParallel) {
  const parallelRoot = mkdtempSync(resolve(tmpdir(), `di-api-${mode.toLowerCase()}-`));
  const differenceDir = resolve(process.cwd(), 'difference-reports');
  const mochawesomeDir = resolve(parallelRoot, 'mochawesome');
  const markdownDir = resolve(parallelRoot, 'markdown');
  mkdirSync(mochawesomeDir, { recursive: true });
  mkdirSync(markdownDir, { recursive: true });
  mkdirSync(differenceDir, { recursive: true });

  const safeName = (value) => value.replace(/[^a-zA-Z0-9_.-]/g, '_');
  const oldDifferencePrefix = `RunAll${MODE_SUFFIX[mode]}Parallel-`;
  readdirSync(differenceDir)
    .filter((file) => file.startsWith(oldDifferencePrefix) && file.endsWith('.md'))
    .forEach((file) => rmSync(resolve(differenceDir, file), { force: true }));
  rmSync(resolve(differenceDir, `RunAll${MODE_SUFFIX[mode]}Parallel.md`), { force: true });
  rmSync(reportHtml, { force: true });
  rmSync(reportJson, { force: true });
  rmSync(resolve(reportDir, 'results.html'), { force: true });
  rmSync(resolve(reportDir, 'results.json'), { force: true });

  const runTestFile = ({ scriptName, testFile, environmentVariable }) => new Promise((resolveRun) => {
    const name = safeName(scriptName);
    const configPath = resolve(parallelRoot, `${name}.json`);
    const config = {
      reporterEnabled: 'mochawesome, ./utilities/differences-reporter.cjs',
      mochawesomeReporterOptions: {
        reportDir: resolve(mochawesomeDir, name),
        reportFilename: 'report',
        quiet: true,
        overwrite: true
      }
    };
    writeFileSync(configPath, JSON.stringify(config));
    const childEnvironment = {
      ...environment,
      [environmentVariable]: mode,
      npm_lifecycle_event: `RunAll${MODE_SUFFIX[mode]}Parallel-${name}`
    };
    const child = spawn(process.execPath, [
      resolve(process.cwd(), 'node_modules/mocha/bin/mocha.js'),
      testFile,
      '--reporter', 'mocha-multi-reporters',
      '--reporter-options', `configFile=${configPath}`,
      '--exit'
    ], { stdio: 'inherit', env: childEnvironment });
    child.on('close', (code) => {
      const childMarkdown = resolve(differenceDir, `${childEnvironment.npm_lifecycle_event}.md`);
      if (existsSync(childMarkdown)) {
        rmSync(resolve(markdownDir, `${name}.md`), { force: true });
        renameSync(childMarkdown, resolve(markdownDir, `${name}.md`));
      }
      resolveRun(code ?? 1);
    });
    child.on('error', () => resolveRun(1));
  });

  const runResults = await Promise.all(testRuns.map(runTestFile));
  const markdownFiles = readdirSync(markdownDir)
    .filter((file) => file.endsWith('.md'))
    .sort();
  const combinedMarkdown = markdownFiles
    .map((file) => readFileSync(resolve(markdownDir, file), 'utf8'))
    .join('\n\n---\n\n');
  const combinedMarkdownPath = resolve(differenceDir, `RunAll${MODE_SUFFIX[mode]}Parallel.md`);
  writeFileSync(combinedMarkdownPath, combinedMarkdown);

  const jsonFiles = testRuns.map(({ scriptName }) => resolve(mochawesomeDir, safeName(scriptName), 'report.json'));
  const mergedJsonPath = resolve(process.cwd(), 'mochawesome-report', 'report.json');
  mkdirSync(resolve(process.cwd(), 'mochawesome-report'), { recursive: true });
  const mergeResult = spawnSync(resolve(process.cwd(), 'node_modules/.bin/mochawesome-merge'), [
    ...jsonFiles.flatMap((file) => ['-f', file]),
    '-o', mergedJsonPath
  ], { stdio: 'inherit' });
  const generateResult = mergeResult.status === 0
    ? spawnSync(resolve(process.cwd(), 'node_modules/.bin/marge'), [
      mergedJsonPath,
      '-o', resolve(process.cwd(), 'mochawesome-report'),
      '-f', 'report'
    ], { stdio: 'inherit' })
    : mergeResult;

  const exitCode = runResults.some((code) => code !== 0) || generateResult.status !== 0 ? 1 : 0;
  rmSync(parallelRoot, { recursive: true, force: true });
  console.log(`Parallel Markdown report: ${combinedMarkdownPath}`);
  console.log(`Parallel Mochawesome report: ${reportHtml}`);
  process.exit(exitCode);
}

const testFiles = testRuns.map(({ testFile }) => testFile);

const mochaArguments = [
  resolve(process.cwd(), 'node_modules/mocha/bin/mocha.js'),
  ...testFiles,
  ...(isParallel ? ['--parallel'] : []),
  '--reporter', 'mocha-multi-reporters',
  '--reporter-options', `configFile=${reporterConfigFile}`
];

const runResult = spawnSync(process.execPath, mochaArguments, { stdio: 'inherit', env: environment });

if (lastModified(reportHtml) !== priorHtmlModified && lastModified(reportJson) !== priorJsonModified) {
  console.log(`Combined report: ${reportHtml}`);
} else {
  console.error('The combined report was not updated.');
  process.exit(1);
}

process.exit(runResult.status ?? 1);