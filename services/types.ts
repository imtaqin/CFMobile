// Cloudflare API Response Types

export interface CFResponse<T> {
  success: boolean;
  errors: { code: number; message: string }[];
  messages: { code: number; message: string }[];
  result: T;
  result_info?: {
    page: number;
    per_page: number;
    count: number;
    total_count: number;
    total_pages: number;
  };
}

export type AuthMethod = 'token' | 'global_key' | 'oauth';

export interface AuthConfig {
  method: AuthMethod;
  /** API token, or the OAuth access token when method is 'oauth'. Both go out as a Bearer header. */
  apiToken?: string;
  globalKey?: string;
  email?: string;
  /** OAuth only. */
  refreshToken?: string;
  /** OAuth only: when the access token stops working, in epoch milliseconds. */
  expiresAt?: number;
}

export interface CFUser {
  id: string;
  email: string;
  username: string;
  first_name: string | null;
  last_name: string | null;
  telephone: string | null;
  country: string | null;
  organizations: any[];
}

export interface Zone {
  id: string;
  name: string;
  status: 'active' | 'pending' | 'initializing' | 'moved' | 'deleted' | 'deactivated' | 'read only';
  paused: boolean;
  type: string;
  development_mode: number;
  name_servers: string[];
  original_name_servers: string[];
  original_registrar: string | null;
  modified_on: string;
  created_on: string;
  activated_on: string;
  plan: {
    id: string;
    name: string;
    price: number;
    currency: string;
    frequency: string;
    is_subscribed: boolean;
  };
  account: { id: string; name: string };
}

export interface DNSRecord {
  id: string;
  zone_id: string;
  zone_name: string;
  name: string;
  type: DNSRecordType;
  content: string;
  proxiable: boolean;
  proxied: boolean;
  ttl: number;
  locked: boolean;
  comment?: string;
  tags?: string[];
  created_on: string;
  modified_on: string;
  priority?: number;
  data?: Record<string, any>;
}

export type DNSRecordType =
  | 'A' | 'AAAA' | 'CNAME' | 'MX' | 'TXT' | 'NS' | 'SRV'
  | 'CAA' | 'CERT' | 'DNSKEY' | 'DS' | 'HTTPS' | 'LOC'
  | 'NAPTR' | 'PTR' | 'SMIMEA' | 'SSHFP' | 'SVCB' | 'TLSA' | 'URI';

/**
 * The value parts of an SRV or CAA record. Cloudflare marks `content`
 * read-only for both types, so these go up in `data` instead; leaving them
 * out is what gets the record rejected with "weight is a required data field".
 */
export interface DNSRecordData {
  /** SRV */
  priority?: number;
  weight?: number;
  port?: number;
  target?: string;
  /** CAA */
  flags?: number;
  tag?: string;
  value?: string;
}

export interface DNSRecordInput {
  type: DNSRecordType;
  name: string;
  /** Omitted for SRV and CAA, which carry their value in `data`. */
  content?: string;
  ttl?: number;
  proxied?: boolean;
  priority?: number;
  comment?: string;
  data?: DNSRecordData;
}

export interface SSLSetting {
  id: string;
  value: 'off' | 'flexible' | 'full' | 'strict';
  modified_on: string;
  editable: boolean;
}

export interface FirewallRule {
  id: string;
  paused: boolean;
  description: string;
  action: string;
  priority: number;
  filter: {
    id: string;
    expression: string;
    paused: boolean;
    description: string;
  };
  created_on: string;
  modified_on: string;
}

export interface PageRule {
  id: string;
  targets: { target: string; constraint: { operator: string; value: string } }[];
  actions: { id: string; value: any }[];
  priority: number;
  status: 'active' | 'disabled';
  created_on: string;
  modified_on: string;
}

export interface WorkerScript {
  id: string;
  etag: string;
  handlers: string[];
  modified_on: string;
  created_on: string;
  usage_model: string;
  logpush: boolean;
}

export interface KVNamespace {
  id: string;
  title: string;
  supports_url_encoding: boolean;
}

export interface R2Bucket {
  name: string;
  creation_date: string;
  location?: string;
}

export interface PagesProject {
  id: string;
  name: string;
  subdomain: string;
  domains: string[];
  created_on: string;
  production_branch: string;
  latest_deployment?: {
    id: string;
    url: string;
    environment: string;
    created_on: string;
  };
}

export interface ZoneAnalyticsDashboard {
  totals: {
    requests: { all: number; cached: number; uncached: number };
    bandwidth: { all: number; cached: number; uncached: number };
    threats: { all: number };
    pageviews: { all: number };
    uniques: { all: number };
  };
  timeseries: {
    since: string;
    until: string;
    requests: { all: number; cached: number; uncached: number };
    bandwidth: { all: number; cached: number; uncached: number };
    threats: { all: number };
    pageviews: { all: number };
    uniques: { all: number };
  }[];
}

export interface ZoneSetting {
  id: string;
  value: any;
  modified_on: string | null;
  editable: boolean;
}

export interface AccountMember {
  id: string;
  user: { id: string; email: string; first_name: string | null; last_name: string | null };
  status: string;
  roles: { id: string; name: string; description: string }[];
}
