const fs = require('fs');
const KEY = process.env.OPENROUTER_KEY;
const MODELS = ['google/gemini-2.5-flash', 'google/gemini-flash-1.5', 'minimax/minimax-m2'];

const LANGS = {
  es: 'Spanish', pt: 'Brazilian Portuguese', de: 'German', fr: 'French',
  ru: 'Russian', ja: 'Japanese', ko: 'Korean', zh: 'Simplified Chinese',
  tr: 'Turkish', vi: 'Vietnamese',
};

const en = JSON.parse(fs.readFileSync('locales/en.json', 'utf8'));

function sameShape(a, b) {
  if (typeof a !== typeof b) return false;
  if (typeof a !== 'object' || a === null) return typeof b === 'string' || typeof b === typeof a;
  const ka = Object.keys(a), kb = Object.keys(b);
  if (ka.length !== kb.length) return false;
  return ka.every((k) => kb.includes(k) && sameShape(a[k], b[k]));
}

async function translate(code, name) {
  const prompt = `Translate the VALUES of this i18n JSON from English to ${name}.
Rules:
- Keep ALL keys exactly the same. Same nesting. Output ONLY valid JSON, no markdown fences, no commentary.
- Keep placeholders like {{name}}, {{price}}, {{count}} EXACTLY unchanged.
- Keep brand/product names unchanged: CloudFlare Mobile, Cloudflare, Google Play, GitHub, Workers, KV, R2, Pages, DNS, SSL/TLS, API, BIND, Under Attack Mode (translate descriptions around them, keep technical terms natural for developers).
- Natural, concise mobile-app UI style.

${JSON.stringify(en)}`;

  for (const model of MODELS) {
    try {
      const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: { Authorization: `Bearer ${KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ model, messages: [{ role: 'user', content: prompt }], temperature: 0.2 }),
      });
      const j = await res.json();
      let text = j?.choices?.[0]?.message?.content ?? '';
      text = text.trim().replace(/^```(json)?/i, '').replace(/```$/, '').trim();
      const out = JSON.parse(text);
      if (!sameShape(en, out)) throw new Error('shape mismatch');
      fs.writeFileSync(`locales/${code}.json`, JSON.stringify(out, null, 2) + '\n');
      console.log(code, 'OK via', model);
      return;
    } catch (e) {
      console.log(code, 'retry:', model, String(e).slice(0, 80));
    }
  }
  console.error(code, 'FAILED all models');
}

(async () => {
  for (const [code, name] of Object.entries(LANGS)) await translate(code, name);
})();
