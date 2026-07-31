const { withGradleProperties } = require('@expo/config-plugins');

/**
 * Play Console flags plain minification as "optimization isn't enabled" — it wants
 * R8 full mode plus the precise resource shrinker. Prebuild regenerates
 * gradle.properties, so these have to be re-applied as a config plugin instead of
 * edited by hand.
 */
const PROPERTIES = {
  'android.enableR8.fullMode': 'true',
  'android.enableNewResourceShrinker.preciseShrinking': 'true',
};

module.exports = function withR8FullMode(config) {
  return withGradleProperties(config, (cfg) => {
    for (const [key, value] of Object.entries(PROPERTIES)) {
      const existing = cfg.modResults.find((item) => item.type === 'property' && item.key === key);
      if (existing) {
        existing.value = value;
      } else {
        cfg.modResults.push({ type: 'property', key, value });
      }
    }
    return cfg;
  });
};
