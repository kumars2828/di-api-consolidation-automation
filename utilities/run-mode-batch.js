import { existsSync, readFileSync, statSync } from 'node:fs';
import { resolve } from 'node:path';
import { spawnSync } from 'node:child_process';

const mode = process.argv[2];
const isListOnly = process.argv.includes('--list');

const MODE_SUFFIX = {
  POST_GET: 'PostGet',
  POST_POST: 'PostPost'
};

if (!MODE_SUFFIX[mode]) {
  console.error('Usage: node ./utilities/run-mode-batch.js POST_GET|POST_POST [--list]');
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

if (isListOnly) {
  process.exit(0);
}

const reportDir = resolve(process.cwd(), 'mochawesome-report');
const reportHtml = resolve(reportDir, 'report.html');
const reportJson = resolve(reportDir, 'report.json');
const lastModified = (file) => existsSync(file) ? statSync(file, { bigint: true }).mtimeNs : null;
const priorHtmlModified = lastModified(reportHtml);
const priorJsonModified = lastModified(reportJson);
const environment = { ...process.env };
const testFiles = [];

for (const scriptName of matchedScriptNames) {
  const script = scripts[scriptName];
  const match = script.match(/^([A-Z_]+)=(POST_GET|POST_POST) mocha (\.\/test\/\S+\.js)\s/);
  if (!match || match[2] !== mode) {
    console.error(`Cannot include script in batch: ${scriptName}`);
    process.exit(1);
  }
  environment[match[1]] = mode;
  testFiles.push(match[3]);
}

const runResult = spawnSync(process.execPath, [
  resolve(process.cwd(), 'node_modules/mocha/bin/mocha.js'),
  ...testFiles,
  '--reporter', 'mocha-multi-reporters',
  '--reporter-options', 'configFile=report-config.json'
], { stdio: 'inherit', env: environment });

if (lastModified(reportHtml) !== priorHtmlModified && lastModified(reportJson) !== priorJsonModified) {
  console.log(`Combined report: ${reportHtml}`);
} else {
  console.error('The combined report was not updated.');
  process.exit(1);
}

process.exit(runResult.status ?? 1);