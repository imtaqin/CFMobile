export interface ChangelogEntry {
  version: string;
  date: string;
  highlights: string[];
  fixes?: string[];
}

export const CHANGELOG: ChangelogEntry[] = [
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
