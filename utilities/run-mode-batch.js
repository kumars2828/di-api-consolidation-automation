import { readFileSync } from 'node:fs';
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

let failed = false;

for (const scriptName of matchedScriptNames) {
  console.log(`\nRunning: npm run ${scriptName}`);
  const runResult = spawnSync('npm', ['run', scriptName], {
    stdio: 'inherit',
    shell: process.platform === 'win32'
  });

  if (runResult.status !== 0) {
    failed = true;
    console.error(`Script failed: ${scriptName} (exit ${runResult.status ?? 1})`);
  }
}

if (failed) {
  process.exit(1);
}

console.log('\nAll scripts completed successfully.');