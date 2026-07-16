import { DNSRecordInput, DNSRecordType } from './types';

export interface TemplatePlaceholder {
  key: string;
  label: string;
  placeholder: string;
  required: boolean;
}

export interface TemplateRecord {
  type: DNSRecordType;
  name: string; // can be '@', literal label, or '{{target}}' (replaced by user-chosen target)
  content: string;
  ttl?: number;
  proxied?: boolean;
  priority?: number;
  comment?: string;
}

export type TargetMode = 'fixed' | 'choosable';

export interface DnsTemplate {
  id: string;
  name: string;
  category: 'hosting' | 'email' | 'verification' | 'security' | 'misc';
  description: string;
  icon: string;
  color: string;
  domain?: string; // brand domain for fetching real logo (e.g. 'vercel.com')
  placeholders: TemplatePlaceholder[];

  // 'choosable' = user picks apex or subdomain (uses apexRecords / subdomainRecords)
  // 'fixed'     = same records regardless (uses records)
  targetMode: TargetMode;

  // For 'choosable' templates
  apexRecords?: TemplateRecord[];
  subdomainRecords?: TemplateRecord[];

  // For 'fixed' templates (email/verification/security)
  records?: TemplateRecord[];

  docs?: string;
}

export function brandLogoUrl(domain: string): string {
  return `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
}

// Sources verified against:
// Vercel: https://vercel.com/docs/projects/domains/working-with-domains
// Netlify: https://docs.netlify.com/domains-https/custom-domains/
// GitHub Pages: https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site
// Cloudflare Pages: https://developers.cloudflare.com/pages/configuration/custom-domains/
// Render: https://render.com/docs/custom-domains
// Fly.io: https://fly.io/docs/networking/custom-domains-with-fly/
// Heroku: https://devcenter.heroku.com/articles/custom-domains
// Google Workspace: https://support.google.com/a/answer/140034
// Microsoft 365: https://learn.microsoft.com/en-us/microsoft-365/admin/setup/add-domain
// Zoho Mail: https://www.zoho.com/mail/help/adminconsole/configure-email-delivery.html
// SendGrid: https://docs.sendgrid.com/ui/account-and-settings/how-to-set-up-domain-authentication
// Mailgun: https://documentation.mailgun.com/en/latest/quickstart-sending.html

export const DNS_TEMPLATES: DnsTemplate[] = [
  // ─── Hosting (choosable apex/subdomain) ──────────────────────────────────
  {
    id: 'vercel',
    name: 'Vercel',
    category: 'hosting',
    description: 'Point apex or a subdomain to a Vercel project',
    icon: 'cloud',
    color: '#000000',
    domain: 'vercel.com',
    targetMode: 'choosable',
    placeholders: [],
    apexRecords: [
      { type: 'A', name: '@', content: '76.76.21.21', ttl: 1, proxied: true, comment: 'Vercel apex' },
    ],
    subdomainRecords: [
      { type: 'CNAME', name: '{{target}}', content: 'cname.vercel-dns.com', ttl: 1, proxied: true, comment: 'Vercel subdomain' },
    ],
    docs: 'https://vercel.com/docs/projects/domains/working-with-domains',
  },
  {
    id: 'netlify',
    name: 'Netlify',
    category: 'hosting',
    description: 'Point apex or a subdomain to a Netlify site',
    icon: 'cloud',
    color: '#00C7B7',
    domain: 'netlify.com',
    targetMode: 'choosable',
    placeholders: [
      { key: 'site', label: 'Netlify Site', placeholder: 'your-site.netlify.app', required: true },
    ],
    apexRecords: [
      { type: 'A', name: '@', content: '75.2.60.5', ttl: 1, proxied: true, comment: 'Netlify apex' },
    ],
    subdomainRecords: [
      { type: 'CNAME', name: '{{target}}', content: '{{site}}', ttl: 1, proxied: true, comment: 'Netlify subdomain' },
    ],
    docs: 'https://docs.netlify.com/domains-https/custom-domains/',
  },
  {
    id: 'github-pages',
    name: 'GitHub Pages',
    category: 'hosting',
    description: 'Point apex or a subdomain to GitHub Pages',
    icon: 'code',
    color: '#181717',
    domain: 'github.com',
    targetMode: 'choosable',
    placeholders: [
      { key: 'username', label: 'GitHub Username/Org', placeholder: 'your-username', required: true },
    ],
    apexRecords: [
      { type: 'A', name: '@', content: '185.199.108.153', ttl: 1, proxied: false, comment: 'GitHub Pages' },
      { type: 'A', name: '@', content: '185.199.109.153', ttl: 1, proxied: false, comment: 'GitHub Pages' },
      { type: 'A', name: '@', content: '185.199.110.153', ttl: 1, proxied: false, comment: 'GitHub Pages' },
      { type: 'A', name: '@', content: '185.199.111.153', ttl: 1, proxied: false, comment: 'GitHub Pages' },
    ],
    subdomainRecords: [
      { type: 'CNAME', name: '{{target}}', content: '{{username}}.github.io', ttl: 1, proxied: false, comment: 'GitHub Pages' },
    ],
    docs: 'https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site',
  },
  {
    id: 'cloudflare-pages',
    name: 'Cloudflare Pages',
    category: 'hosting',
    description: 'Point apex or a subdomain to a Cloudflare Pages project',
    icon: 'cf-pages',
    color: '#F6821F',
    domain: 'pages.cloudflare.com',
    targetMode: 'choosable',
    placeholders: [
      { key: 'project', label: 'Project Name', placeholder: 'your-project', required: true },
    ],
    apexRecords: [
      { type: 'CNAME', name: '@', content: '{{project}}.pages.dev', ttl: 1, proxied: true, comment: 'Cloudflare Pages apex' },
    ],
    subdomainRecords: [
      { type: 'CNAME', name: '{{target}}', content: '{{project}}.pages.dev', ttl: 1, proxied: true, comment: 'Cloudflare Pages' },
    ],
    docs: 'https://developers.cloudflare.com/pages/configuration/custom-domains/',
  },
  {
    id: 'render',
    name: 'Render',
    category: 'hosting',
    description: 'Point apex or a subdomain to a Render service',
    icon: 'cloud',
    color: '#46E3B7',
    domain: 'render.com',
    targetMode: 'choosable',
    placeholders: [
      { key: 'service', label: 'Render Service', placeholder: 'your-service.onrender.com', required: true },
    ],
    apexRecords: [
      { type: 'A', name: '@', content: '216.24.57.1', ttl: 1, proxied: true, comment: 'Render apex' },
    ],
    subdomainRecords: [
      { type: 'CNAME', name: '{{target}}', content: '{{service}}', ttl: 1, proxied: true, comment: 'Render subdomain' },
    ],
    docs: 'https://render.com/docs/custom-domains',
  },
  {
    id: 'fly-io',
    name: 'Fly.io',
    category: 'hosting',
    description: 'Point apex or a subdomain to a Fly.io app',
    icon: 'cloud',
    color: '#7B3AED',
    domain: 'fly.io',
    targetMode: 'choosable',
    placeholders: [
      { key: 'app', label: 'Fly App Name', placeholder: 'your-app', required: true },
      { key: 'ipv4', label: 'IPv4 (apex only)', placeholder: 'flyctl ips list', required: false },
      { key: 'ipv6', label: 'IPv6 (apex only)', placeholder: 'flyctl ips list', required: false },
    ],
    apexRecords: [
      { type: 'A', name: '@', content: '{{ipv4}}', ttl: 1, proxied: false, comment: 'Fly.io apex IPv4' },
      { type: 'AAAA', name: '@', content: '{{ipv6}}', ttl: 1, proxied: false, comment: 'Fly.io apex IPv6' },
    ],
    subdomainRecords: [
      { type: 'CNAME', name: '{{target}}', content: '{{app}}.fly.dev', ttl: 1, proxied: false, comment: 'Fly.io subdomain' },
    ],
    docs: 'https://fly.io/docs/networking/custom-domains-with-fly/',
  },
  {
    id: 'heroku',
    name: 'Heroku',
    category: 'hosting',
    description: 'Point a subdomain to a Heroku app (apex not officially supported)',
    icon: 'cloud',
    color: '#430098',
    domain: 'heroku.com',
    targetMode: 'choosable',
    placeholders: [
      { key: 'dns_target', label: 'Heroku DNS Target', placeholder: 'lookup with: heroku domains', required: true },
    ],
    apexRecords: [
      { type: 'CNAME', name: '@', content: '{{dns_target}}', ttl: 1, proxied: true, comment: 'Heroku apex (CF flatten)' },
    ],
    subdomainRecords: [
      { type: 'CNAME', name: '{{target}}', content: '{{dns_target}}', ttl: 1, proxied: false, comment: 'Heroku subdomain' },
    ],
    docs: 'https://devcenter.heroku.com/articles/custom-domains',
  },

  // ─── Email (fixed: always apex/specific labels) ─────────────────────────
  {
    id: 'google-workspace',
    name: 'Google Workspace',
    category: 'email',
    description: 'MX record for Google Workspace (single MX as of 2023)',
    icon: 'mail',
    color: '#4285F4',
    domain: 'workspace.google.com',
    targetMode: 'fixed',
    placeholders: [],
    records: [
      { type: 'MX', name: '@', content: 'smtp.google.com', priority: 1, ttl: 1, comment: 'Google Workspace' },
    ],
    docs: 'https://support.google.com/a/answer/140034',
  },
  {
    id: 'microsoft-365',
    name: 'Microsoft 365',
    category: 'email',
    description: 'MX, SPF, and autodiscover for Microsoft 365 mail',
    icon: 'mail',
    color: '#0078D4',
    domain: 'microsoft.com',
    targetMode: 'fixed',
    placeholders: [
      { key: 'tenant', label: 'M365 MX target', placeholder: 'yourdomain-com.mail.protection.outlook.com', required: true },
    ],
    records: [
      { type: 'MX', name: '@', content: '{{tenant}}', priority: 0, ttl: 1, comment: 'Microsoft 365 MX' },
      { type: 'TXT', name: '@', content: 'v=spf1 include:spf.protection.outlook.com -all', ttl: 1, comment: 'M365 SPF' },
      { type: 'CNAME', name: 'autodiscover', content: 'autodiscover.outlook.com', ttl: 1, comment: 'M365 autodiscover' },
    ],
    docs: 'https://learn.microsoft.com/en-us/microsoft-365/admin/setup/add-domain',
  },
  {
    id: 'zoho-mail',
    name: 'Zoho Mail',
    category: 'email',
    description: 'MX and SPF records for Zoho Mail',
    icon: 'mail',
    color: '#E42527',
    domain: 'zoho.com',
    targetMode: 'fixed',
    placeholders: [],
    records: [
      { type: 'MX', name: '@', content: 'mx.zoho.com', priority: 10, ttl: 1, comment: 'Zoho Mail' },
      { type: 'MX', name: '@', content: 'mx2.zoho.com', priority: 20, ttl: 1, comment: 'Zoho Mail' },
      { type: 'MX', name: '@', content: 'mx3.zoho.com', priority: 50, ttl: 1, comment: 'Zoho Mail' },
      { type: 'TXT', name: '@', content: 'v=spf1 include:zoho.com ~all', ttl: 1, comment: 'Zoho SPF' },
    ],
    docs: 'https://www.zoho.com/mail/help/adminconsole/configure-email-delivery.html',
  },
  {
    id: 'sendgrid',
    name: 'SendGrid',
    category: 'email',
    description: 'CNAME record for SendGrid sender authentication',
    icon: 'mail',
    color: '#1A82E2',
    domain: 'sendgrid.com',
    targetMode: 'fixed',
    placeholders: [
      { key: 'subdomain', label: 'CNAME prefix', placeholder: 'em1234', required: true },
      { key: 'target', label: 'SendGrid target', placeholder: 'u1234.wl.sendgrid.net', required: true },
    ],
    records: [
      { type: 'CNAME', name: '{{subdomain}}', content: '{{target}}', ttl: 1, proxied: false, comment: 'SendGrid' },
    ],
    docs: 'https://docs.sendgrid.com/ui/account-and-settings/how-to-set-up-domain-authentication',
  },
  {
    id: 'mailgun',
    name: 'Mailgun',
    category: 'email',
    description: 'MX and SPF for a Mailgun sending subdomain',
    icon: 'mail',
    color: '#F8BC2F',
    domain: 'mailgun.com',
    targetMode: 'fixed',
    placeholders: [
      { key: 'domain', label: 'Mailgun subdomain', placeholder: 'mg', required: true },
    ],
    records: [
      { type: 'MX', name: '{{domain}}', content: 'mxa.mailgun.org', priority: 10, ttl: 1, comment: 'Mailgun MX' },
      { type: 'MX', name: '{{domain}}', content: 'mxb.mailgun.org', priority: 10, ttl: 1, comment: 'Mailgun MX' },
      { type: 'TXT', name: '{{domain}}', content: 'v=spf1 include:mailgun.org ~all', ttl: 1, comment: 'Mailgun SPF' },
    ],
    docs: 'https://documentation.mailgun.com/en/latest/quickstart-sending.html',
  },

  // ─── Verification (fixed: apex TXT) ─────────────────────────────────────
  {
    id: 'google-site-verify',
    name: 'Google Site Verification',
    category: 'verification',
    description: 'TXT record to verify domain ownership with Google',
    icon: 'check-circle',
    color: '#4285F4',
    domain: 'google.com',
    targetMode: 'fixed',
    placeholders: [
      { key: 'token', label: 'Verification token', placeholder: 'google-site-verification=...', required: true },
    ],
    records: [
      { type: 'TXT', name: '@', content: '{{token}}', ttl: 1, comment: 'Google verification' },
    ],
    docs: 'https://support.google.com/webmasters/answer/9008080',
  },
  {
    id: 'microsoft-verify',
    name: 'Microsoft Verification',
    category: 'verification',
    description: 'TXT record to verify domain ownership with Microsoft',
    icon: 'check-circle',
    color: '#0078D4',
    domain: 'microsoft.com',
    targetMode: 'fixed',
    placeholders: [
      { key: 'token', label: 'Verification token', placeholder: 'MS=ms...', required: true },
    ],
    records: [
      { type: 'TXT', name: '@', content: '{{token}}', ttl: 1, comment: 'Microsoft verification' },
    ],
  },
  {
    id: 'facebook-verify',
    name: 'Facebook/Meta Verification',
    category: 'verification',
    description: 'TXT record to verify domain ownership with Meta',
    icon: 'check-circle',
    color: '#1877F2',
    domain: 'facebook.com',
    targetMode: 'fixed',
    placeholders: [
      { key: 'token', label: 'Verification token', placeholder: 'facebook-domain-verification=...', required: true },
    ],
    records: [
      { type: 'TXT', name: '@', content: '{{token}}', ttl: 1, comment: 'Facebook verification' },
    ],
  },

  // ─── Security (fixed) ───────────────────────────────────────────────────
  {
    id: 'spf-default',
    name: 'Default SPF Record',
    category: 'security',
    description: 'Strict SPF allowing only your MX servers',
    icon: 'shield',
    color: '#10B981',
    targetMode: 'fixed',
    placeholders: [],
    records: [
      { type: 'TXT', name: '@', content: 'v=spf1 mx -all', ttl: 1, comment: 'SPF strict' },
    ],
  },
  {
    id: 'dmarc-monitor',
    name: 'DMARC (Monitor mode)',
    category: 'security',
    description: 'DMARC record in monitoring mode (p=none)',
    icon: 'shield',
    color: '#10B981',
    targetMode: 'fixed',
    placeholders: [
      { key: 'rua', label: 'Reports email', placeholder: 'reports@yourdomain.com', required: true },
    ],
    records: [
      { type: 'TXT', name: '_dmarc', content: 'v=DMARC1; p=none; rua=mailto:{{rua}}; ruf=mailto:{{rua}}; fo=1', ttl: 1, comment: 'DMARC monitor' },
    ],
    docs: 'https://dmarc.org/overview/',
  },
  {
    id: 'dmarc-reject',
    name: 'DMARC (Reject mode)',
    category: 'security',
    description: 'DMARC record with strict reject policy',
    icon: 'shield',
    color: '#EF4444',
    targetMode: 'fixed',
    placeholders: [
      { key: 'rua', label: 'Reports email', placeholder: 'reports@yourdomain.com', required: true },
    ],
    records: [
      { type: 'TXT', name: '_dmarc', content: 'v=DMARC1; p=reject; rua=mailto:{{rua}}; ruf=mailto:{{rua}}; fo=1; aspf=s; adkim=s', ttl: 1, comment: 'DMARC reject' },
    ],
  },
  {
    id: 'caa-letsencrypt',
    name: 'CAA — Let\'s Encrypt only',
    category: 'security',
    description: 'Allow only Let\'s Encrypt to issue certificates',
    icon: 'lock',
    color: '#10B981',
    targetMode: 'fixed',
    placeholders: [],
    records: [
      { type: 'CAA', name: '@', content: '0 issue "letsencrypt.org"', ttl: 1, comment: 'CAA Let\'s Encrypt' },
    ],
  },
  {
    id: 'block-email',
    name: 'Block Email (no MX)',
    category: 'security',
    description: 'Reject all incoming email and lock SPF (RFC 7505)',
    icon: 'lock',
    color: '#EF4444',
    targetMode: 'fixed',
    placeholders: [],
    records: [
      { type: 'MX', name: '@', content: '.', priority: 0, ttl: 1, comment: 'Null MX' },
      { type: 'TXT', name: '@', content: 'v=spf1 -all', ttl: 1, comment: 'No-mail SPF' },
      { type: 'TXT', name: '_dmarc', content: 'v=DMARC1; p=reject; sp=reject', ttl: 1, comment: 'No-mail DMARC' },
    ],
    docs: 'https://datatracker.ietf.org/doc/html/rfc7505',
  },
];

export interface ApplyOptions {
  values: Record<string, string>;
  targetMode?: 'apex' | 'subdomain';
  targetName?: string; // used when targetMode === 'subdomain', e.g. 'www', 'app', 'api'
}

export function applyTemplate(
  template: DnsTemplate,
  opts: ApplyOptions
): DNSRecordInput[] {
  const { values } = opts;

  let source: TemplateRecord[] = [];
  if (template.targetMode === 'choosable') {
    if (opts.targetMode === 'subdomain') {
      source = template.subdomainRecords ?? [];
    } else {
      source = template.apexRecords ?? [];
    }
  } else {
    source = template.records ?? [];
  }

  const sub: Record<string, string> = {
    ...values,
    target: opts.targetMode === 'subdomain' ? (opts.targetName?.trim() || 'www') : '@',
  };

  return source.map((r) => {
    const replace = (s: string) =>
      s.replace(/\{\{(\w+)\}\}/g, (_, key) => sub[key] ?? `{{${key}}}`);

    return {
      type: r.type,
      name: replace(r.name),
      content: replace(r.content),
      ttl: r.ttl ?? 1,
      proxied: r.proxied ?? false,
      priority: r.priority,
      comment: r.comment ? replace(r.comment) : undefined,
    };
  });
}
