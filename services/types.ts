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

export type AuthMethod = 'token' | 'global_key';

export interface AuthConfig {
  method: AuthMethod;
  apiToken?: string;
  globalKey?: string;
  email?: string;
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

export interface DNSRecordInput {
  type: DNSRecordType;
  name: string;
  content: string;
  ttl?: number;
  proxied?: boolean;
  priority?: number;
  comment?: string;
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
