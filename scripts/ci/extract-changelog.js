// Prints markdown release notes for the given version from services/changelog.ts
const fs = require('fs');

const version = process.argv[2];
const src = fs.readFileSync('services/changelog.ts', 'utf8');

const escaped = version.replace(/\./g, '\\.');
const entryRe = new RegExp("\\{\\s*version:\\s*'" + escaped + "'[\\s\\S]*?\\n  \\}");
const m = src.match(entryRe);

if (!m) {
  console.log('Release v' + version);
  process.exit(0);
}

const block = m[0];

function grab(name) {
  const am = block.match(new RegExp(name + ':\\s*\\[([\\s\\S]*?)\\]'));
  if (!am) return [];
  const out = [];
  const re = /'([^']+)'/g;
  let x;
  while ((x = re.exec(am[1]))) out.push(x[1]);
  return out;
}

const highlights = grab('highlights');
const fixes = grab('fixes');

let out = '';
if (highlights.length) {
  out += "## What's new\n" + highlights.map((h) => '- ' + h).join('\n') + '\n\n';
}
if (fixes.length) {
  out += '## Fixes\n' + fixes.map((h) => '- ' + h).join('\n') + '\n';
}
console.log(out.trim() || 'Release v' + version);
