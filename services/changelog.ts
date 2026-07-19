export interface ChangelogEntry {
  version: string;
  date: string;
  highlights: string[];
  fixes?: string[];
}

export const CHANGELOG: ChangelogEntry[] = [
  {
    version: '1.4.2',
    date: '2026-07-19',
    highlights: [
      'Now in 12 languages: English, Indonesian, Spanish, Portuguese, German, French, Russian, Japanese, Korean, Chinese, Turkish, Vietnamese',
    ],
    fixes: [
      'Biometric unlock no longer resets the app to onboarding',
      'Analytics menu now appears correctly in zone management',
      'Settings shows your name instead of "User"',
    ],
  },
  {
    version: '1.4.1',
    date: '2026-07-18',
    highlights: [
      'New app icon',
      'Way fewer ads — single banner on the home screen only',
      'Friendly one-time notice about ads, with Premium option',
      'New profile avatars',
      'Update notifications from Google Play',
    ],
    fixes: [
      'Clear message when tailing an assets-only Worker',
      'Developer info corrected',
    ],
  },
  {
    version: '1.4.0',
    date: '2026-07-17',
    highlights: [
      'Premium: one-time purchase removes all ads forever',
      'Free version shows ads to support development',
      'Restore purchase from Settings',
    ],
  },
  {
    version: '1.3.0',
    date: '2026-07-16',
    highlights: [
      'All ads removed — the app is now completely ad-free',
      'Privacy notice on login: credentials never leave your device, app is open source',
      'Analytics charts: requests, bandwidth, threats & visitors over time',
      'Biometric app lock (fingerprint / face)',
      'Under Attack Mode quick toggle in zone detail',
      'DNS bulk import & export (BIND zone files)',
      'Email Routing: rules, catch-all, destination addresses',
      'Audit log viewer in settings',
      'R2 file browser: list, upload, download, delete objects',
      'Workers live logs (tail) — tap any worker',
    ],
  },
  {
    version: '1.2.2',
    date: '2026-05-01',
    highlights: [
      'Real brand logos for DNS templates (Vercel, Netlify, GitHub, etc.)',
      'Redesigned login page with hero section & feature pills',
      'Better visual hierarchy across DNS, zone detail, and zones screens',
      'Tile-grid management menu in zone detail',
      'Bottom action bar in DNS list (no more stacked FABs)',
    ],
    fixes: [
      'Template chip pills no longer change size when switched',
      'Apply template requires explicit confirmation',
    ],
  },
  {
    version: '1.2.1',
    date: '2026-04-29',
    highlights: [
      'DNS templates now respect apex vs subdomain context',
      'Records reference official documentation per provider',
      'Confirmation step before applying any template',
    ],
  },
  {
    version: '1.2.0',
    date: '2026-04-28',
    highlights: [
      'DNS Templates: 1-tap setup for Vercel, Netlify, GitHub Pages, Cloudflare Pages, Render, Fly.io, Heroku, Google Workspace, Microsoft 365, Zoho, SendGrid, Mailgun, SPF, DMARC, CAA',
      'Permission detection — menu items hide based on token scope',
      'Theme toggle (Light/Dark/System) now applies to tab bar',
      'Login: video tutorials & dashboard shortcut',
    ],
    fixes: [
      'Login no longer bounces back when token has minimal permissions',
      'Edge-to-edge display for Android 15+',
      'Tablet & foldable support (orientation unlocked)',
      'Better email & account ID masking',
    ],
  },
  {
    version: '1.1.0',
    date: '2026-04-15',
    highlights: [
      'Redesigned dashboard with hero card and horizontal quick actions',
      'Dark / Light / System theme toggle in settings',
      'Zone picker for quick actions',
      'Privacy-first: sensitive data masked by default',
      'Language dropdown selector',
      'Banner ads (Google AdMob)',
    ],
  },
  {
    version: '1.0.0',
    date: '2026-04-01',
    highlights: [
      'Initial release',
      'Manage zones, DNS records, SSL/TLS, firewall, cache, analytics',
      'Workers, KV, R2, Pages support',
      'Multi-account switching',
      'English & Bahasa Indonesia',
    ],
  },
];
