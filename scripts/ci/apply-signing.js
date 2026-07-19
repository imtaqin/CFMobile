// Injects release signing (from env vars) into the prebuild-generated build.gradle.
const fs = require('fs');
const f = 'android/app/build.gradle';
let s = fs.readFileSync(f, 'utf8');

if (!s.includes('signingConfigs.release')) {
  s = s.replace(
    /signingConfigs \{\s*\n(\s*)debug \{/,
    (m, indent) => `signingConfigs {\n${indent}release {\n${indent}    storeFile file('upload.jks')\n${indent}    storePassword System.getenv("KEYSTORE_PASSWORD")\n${indent}    keyAlias System.getenv("KEY_ALIAS")\n${indent}    keyPassword System.getenv("KEY_PASSWORD")\n${indent}}\n${indent}debug {`
  );
  s = s.replace(
    /\/\/ Caution![^\n]*\n[^\n]*\n(\s*)signingConfig signingConfigs\.debug/,
    (m, indent) => `${indent}signingConfig signingConfigs.release`
  );
  fs.writeFileSync(f, s);
}
const ok = s.includes("storeFile file('upload.jks')") && /release \{[\s\S]*?signingConfig signingConfigs\.release/.test(s);
console.log(ok ? 'signing applied' : 'FAILED to apply signing');
process.exit(ok ? 0 : 1);
