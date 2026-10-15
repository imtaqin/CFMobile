/*
 * Machine-translate a namespace's English strings into the other 11 locales
 * using Google's public translate endpoint, then merge into locales/*.json.
 *
 * Usage:
 *   node scripts/i18n-translate.js <namespace> path/to/source-en.json
 *
 * source-en.json is a flat { key: "English text" } object for the namespace
 * (interpolation placeholders like {{name}} are preserved — they're protected
 * before translation and restored after). The script writes the namespace
 * into all 12 locale files and reports any locale left incomplete.
 *
 * Cloudflare product names (Workers, Pages, Turnstile, R2, D1, KV, ...) are
 * also protected the same way as placeholders, because a generic translate
 * API happily "translates" a brand name into the dictionary word it's spelled
 * like (Turnstile -> the Japanese word for a subway ticket gate, for example).
 * Add a name to BRAND_NAMES below if a new product name starts showing up
 * mistranslated in a spot-check.
 */
const fs = require('fs');
const path = require('path');

const DIR = path.join(__dirname, '..', 'locales');
const LANGS = ['id', 'es', 'pt', 'de', 'fr', 'ru', 'ja', 'ko', 'zh', 'tr', 'vi'];

const BRAND_NAMES = [
  'Cloudflare', 'Workers', 'Pages', 'Turnstile', 'Zaraz', 'Argo', 'Spectrum',
  'Workers AI', 'AI Gateway', 'Durable Objects', 'Hyperdrive', 'Vectorize',
  'Snippets', 'Waiting Room', 'Web3', 'R2', 'D1', 'KV', 'WAF', 'DNS', 'CDN',
  'SSL', 'TLS', 'HSTS', 'HTTP', 'HTTPS', 'IPv6', 'CIDR', 'ASN', 'CNAME',
  'WHOIS', 'CAPTCHA', 'Wrangler', 'Page Shield', 'mTLS', 'CSR', 'Origin CA', 'Logpush', 'SQL',
  'Secrets Store', 'AutoRAG', 'AI Search', 'Workers for Platforms',
  'Zero Trust', 'App Launcher', 'Cloudflare Access', 'Access Applications',
  'Infrastructure Access Targets', 'IPv4', 'IPv6', 'Gateway Rules', 'AI Chat',
  'Under Attack Mode', 'Global API Key',
];

const [, , namespace, sourcePath] = process.argv;
if (!namespace || !sourcePath) {
  console.error('Usage: node scripts/i18n-translate.js <namespace> <source-en.json>');
  process.exit(1);
}

const source = JSON.parse(fs.readFileSync(sourcePath, 'utf8'));

// Digit-only marker, no letters at all — a word-shaped token like
// "XPLACEHOLDERX0X" gets "corrected" by some target languages when it's the
// *entire* untranslated string (no real surrounding text to anchor on):
// Spanish/Korean respelled it, Chinese literally translated "PLACEHOLDER"
// mid-token. Pure digits give the translator nothing that looks like a word,
// so it passes through untouched. Found via zone.snippets ("Snippets" alone)
// coming back as "X占位符X0X" in zh, "XPLACHOLDERX0X" in es.
const MARK_PREFIX = '77330';
const MARK_SUFFIX = '03377';

function protectPlaceholders(text) {
  const holders = [];
  let protected_ = text.replace(/\{\{.*?\}\}/g, (m) => {
    holders.push(m);
    return `${MARK_PREFIX}${holders.length - 1}${MARK_SUFFIX}`;
  });
  // Longest names first so "Workers AI" is protected whole, not as "Workers" + " AI".
  for (const name of [...BRAND_NAMES].sort((a, b) => b.length - a.length)) {
    const re = new RegExp(`\\b${name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'g');
    protected_ = protected_.replace(re, (m) => {
      holders.push(m);
      return `${MARK_PREFIX}${holders.length - 1}${MARK_SUFFIX}`;
    });
  }
  return { protected_, holders };
}

function restorePlaceholders(text, holders) {
  return text.replace(new RegExp(`${MARK_PREFIX}(\\d+)${MARK_SUFFIX}`, 'g'), (_, i) => holders[Number(i)]);
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function translate(text, targetLang) {
  const { protected_, holders } = protectPlaceholders(text);
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${targetLang}&dt=t&q=${encodeURIComponent(protected_)}`;
  // The public endpoint answers 429 when asked too fast: pace the requests and back off.
  let res;
  for (let attempt = 0; ; attempt++) {
    await sleep(attempt === 0 ? 1200 : Math.min(5000 * 2 ** (attempt - 1), 120000));
    res = await fetch(url);
    if (res.status !== 429 || attempt >= 8) break;
  }
  if (!res.ok) throw new Error(`translate ${targetLang} failed: ${res.status}`);
  const json = await res.json();
  const translated = json[0].map((seg) => seg[0]).join('');
  return restorePlaceholders(translated, holders);
}

async function translateNamespace(targetLang) {
  const out = {};
  for (const [key, text] of Object.entries(source)) {
    out[key] = await translate(text, targetLang);
  }
  return out;
}

async function main() {
  // en gets the source verbatim; every other locale is machine-translated.
  const enFile = path.join(DIR, 'en.json');
  const enJson = JSON.parse(fs.readFileSync(enFile, 'utf8'));
  enJson[namespace] = { ...enJson[namespace], ...source };
  fs.writeFileSync(enFile, JSON.stringify(enJson, null, 2) + '\n');

  for (const lang of LANGS) {
    console.log(`translating ${namespace} -> ${lang}...`);
    const translated = await translateNamespace(lang);
    const file = path.join(DIR, `${lang}.json`);
    const json = JSON.parse(fs.readFileSync(file, 'utf8'));
    json[namespace] = { ...json[namespace], ...translated };
    fs.writeFileSync(file, JSON.stringify(json, null, 2) + '\n');
  }

  const enKeys = Object.keys(source).sort();
  let bad = 0;
  for (const f of fs.readdirSync(DIR).filter((f) => f.endsWith('.json'))) {
    const j = JSON.parse(fs.readFileSync(path.join(DIR, f), 'utf8'));
    const gap = enKeys.filter((k) => !Object.keys(j[namespace] || {}).includes(k));
    if (gap.length) {
      bad++;
      console.log(`${f}: missing ${namespace}.${gap.join(`, ${namespace}.`)}`);
    }
  }
  console.log(bad === 0
    ? `ALL 12 LOCALES COMPLETE (${enKeys.length} ${namespace} keys)`
    : `${bad} locales incomplete`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
