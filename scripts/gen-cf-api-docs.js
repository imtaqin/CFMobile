/* Turn the Cloudflare OpenAPI schema into one markdown file per product, so the
   whole API surface is greppable from the repo without hitting the network. */
const fs = require('fs');
const path = require('path');

const SRC = process.argv[2];
const OUT = process.argv[3];

const doc = JSON.parse(fs.readFileSync(SRC, 'utf8'));
const METHODS = ['get', 'post', 'put', 'patch', 'delete'];

const slug = (s) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'misc';

const groups = new Map();

for (const [p, item] of Object.entries(doc.paths || {})) {
  for (const m of METHODS) {
    const op = item[m];
    if (!op) continue;
    const tag = (op.tags && op.tags[0]) || p.split('/').filter(Boolean)[2] || 'misc';
    if (!groups.has(tag)) groups.set(tag, []);

    const params = [...(item.parameters || []), ...(op.parameters || [])]
      .filter((x) => x && x.in === 'query')
      .map((x) => x.name);

    groups.get(tag).push({
      method: m.toUpperCase(),
      path: p,
      summary: (op.summary || '').replace(/\s+/g, ' ').trim(),
      opId: op.operationId || '',
      query: params,
    });
  }
}

fs.mkdirSync(OUT, { recursive: true });
for (const f of fs.readdirSync(OUT)) {
  if (f.endsWith('.md')) fs.unlinkSync(path.join(OUT, f));
}

const index = [];
for (const [tag, ops] of [...groups].sort((a, b) => a[0].localeCompare(b[0]))) {
  ops.sort((a, b) => a.path.localeCompare(b.path) || a.method.localeCompare(b.method));
  const file = `${slug(tag)}.md`;

  const lines = [`# ${tag}`, '', `${ops.length} endpoints.`, ''];
  for (const o of ops) {
    lines.push(`## ${o.method} ${o.path}`);
    if (o.summary) lines.push('', o.summary);
    const meta = [];
    if (o.opId) meta.push(`operationId: \`${o.opId}\``);
    if (o.query.length) meta.push(`query: ${o.query.map((q) => `\`${q}\``).join(', ')}`);
    if (meta.length) lines.push('', meta.join(' · '));
    lines.push('');
  }
  fs.writeFileSync(path.join(OUT, file), lines.join('\n'));
  index.push({ tag, file, count: ops.length });
}

index.sort((a, b) => b.count - a.count);
const total = index.reduce((n, i) => n + i.count, 0);
fs.writeFileSync(
  path.join(OUT, 'README.md'),
  [
    '# Cloudflare API reference',
    '',
    `Generated from the official OpenAPI schema (\`cloudflare/api-schemas\`): ${total} endpoints across ${index.length} products.`,
    'Regenerate with `npm run cf:docs`.',
    '',
    '| Product | Endpoints | File |',
    '| --- | ---: | --- |',
    ...index.map((i) => `| ${i.tag} | ${i.count} | [${i.file}](${i.file}) |`),
    '',
  ].join('\n')
);

console.log(`${total} endpoints, ${index.length} products`);
console.log(index.slice(0, 25).map((i) => `${i.count.toString().padStart(4)}  ${i.tag}`).join('\n'));
