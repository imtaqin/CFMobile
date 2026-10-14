import { Platform } from 'react-native';
import { uuid } from 'expo-modules-core';
import { AuthConfig } from './types';

/**
 * "Continue with Cloudflare": OAuth 2.0 Authorization Code with PKCE.
 *
 * The app is a public client, so there is no client secret. Cloudflare only
 * accepts https redirect URLs, so the dashboard redirects to REDIRECT_URI and
 * that endpoint forwards the query to `cfmobile://oauth/callback`, which the
 * `app/oauth/callback.tsx` route receives. The code it carries is worthless
 * without the verifier kept in secure storage on this device.
 */
export const OAUTH_CLIENT_ID = '53342c7ed3322c90b550e0404352b7cc';
export const OAUTH_REDIRECT_URI = 'https://cfmobile-ai.imtaqin.id/oauth/callback';
/** Where the redirect hop sends the browser; the custom tab closes when it sees this. */
export const OAUTH_APP_RETURN = 'cfmobile://oauth/callback';

const AUTH_ENDPOINT = 'https://dash.cloudflare.com/oauth2/auth';
const TOKEN_ENDPOINT = 'https://dash.cloudflare.com/oauth2/token';
const REVOKE_ENDPOINT = 'https://dash.cloudflare.com/oauth2/revoke';
const PENDING_KEY = 'cf_oauth_pending';
const PENDING_TTL_MS = 15 * 60 * 1000;

/**
 * What the consent screen asks for: only the products this app has screens for.
 * Every name must also be enabled on the OAuth client in the Cloudflare
 * dashboard, or the authorization request is refused.
 */
export const OAUTH_SCOPES = [
  // A refresh token, so the sign-in outlives the short-lived access token.
  // Needs the refresh_token grant on the OAuth client.
  'offline_access',
  // Who is signed in, and which accounts
  'user-details.read', 'account-settings.read', 'memberships.read',
  // Zones and DNS
  'zone.read', 'zone.write', 'zone-settings.read', 'zone-settings.write',
  'dns.read', 'dns.write', 'zone-dns-settings.read', 'dns-firewall.read',
  // SSL, firewall, cache, rules
  'ssl-and-certificates.read', 'ssl-and-certificates.write',
  'firewall-services.read', 'firewall-services.write',
  'zone-waf.read', 'zone-waf.write', 'account-waf.read',
  'account-firewall-access-rules.read', 'account-firewall-access-rules.write',
  'cache.purge', 'cache-settings.read', 'cache-settings.write',
  'page-rules.read', 'page-rules.write',
  'zone-transform-rules.read', 'dynamic-redirect.read', 'snippets.read', 'snippets.write',
  'account-rule-lists.read', 'account-rule-lists.write', 'account-rulesets.read',
  'page-shield.read', 'zaraz.read', 'web3-hostnames.read',
  // Analytics and logs
  'analytics.read', 'account-analytics.read', 'logs.read',
  // Email
  'email-routing-address.read', 'email-routing-address.write',
  'email-routing-rule.read', 'email-routing-rule.write',
  // Traffic
  'healthcheck.read', 'healthcheck.write',
  'load-balancers.read', 'load-balancers.write', 'load-balancing-monitors-and-pools.read',
  'waiting-rooms.read', 'waiting-rooms.write', 'address-maps.read',
  // Developer platform
  'workers-scripts.edit', 'workers-scripts.metadata_read',
  'workers-routes.read', 'workers-routes.write', 'workers-tail.read',
  'workers-kv-storage.read', 'workers-kv-storage.write',
  'workers-r2.read', 'workers-r2.write', 'workers-r2-bucket-item.read', 'workers-r2-bucket-item.write',
  'd1.read', 'd1.write', 'page.read', 'page.write', 'queues.read', 'queues.write',
  'vectorize.read', 'pipelines.read', 'secrets-store.read', 'aig.read', 'ai.read',
  // Media, Turnstile, registrar
  'stream.read', 'images.read', 'challenge-widgets.read', 'challenge-widgets.write',
  'registrar-domains.read',
  // Zero Trust (read only)
  'argotunnel.read', 'argotunnel.write', 'access.read', 'access-app.read', 'teams.read',
  // Account
  'notifications.read', 'notifications.write',
];

interface Pending {
  state: string;
  verifier: string;
  /** Came from "add another account", so return to where the user was instead of the home tab. */
  add: boolean;
  createdAt: number;
}

interface TokenResponse {
  access_token: string;
  refresh_token?: string;
  expires_in?: number;
  token_type?: string;
}

const storage = {
  get: async (key: string): Promise<string | null> => {
    if (Platform.OS === 'web') return sessionStorage.getItem(key);
    return require('expo-secure-store').getItemAsync(key);
  },
  set: async (key: string, value: string): Promise<void> => {
    if (Platform.OS === 'web') { sessionStorage.setItem(key, value); return; }
    return require('expo-secure-store').setItemAsync(key, value);
  },
  remove: async (key: string): Promise<void> => {
    if (Platform.OS === 'web') { sessionStorage.removeItem(key); return; }
    return require('expo-secure-store').deleteItemAsync(key);
  },
};

// ─── PKCE ────────────────────────────────────────────────────────────────────

/**
 * Unguessable URL-safe string. `uuid.v4()` is backed by the platform's secure
 * random source, which avoids pulling in a native crypto module just for this.
 */
function randomString(): string {
  return [uuid.v4(), uuid.v4(), uuid.v4()].join('').replace(/-/g, '');
}

const K = [
  0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
  0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
  0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
  0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
  0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
  0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
  0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
  0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2,
];

/** SHA-256 of an ASCII string. Hermes has no WebCrypto, and PKCE needs exactly this one hash. */
export function sha256(ascii: string): Uint8Array {
  const length = ascii.length;
  const padded = new Uint8Array(((length + 9 + 63) >> 6) << 6);
  for (let i = 0; i < length; i++) padded[i] = ascii.charCodeAt(i) & 0xff;
  padded[length] = 0x80;
  const view = new DataView(padded.buffer);
  view.setUint32(padded.length - 4, length * 8, false);

  const h = [0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a, 0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19];
  const w = new Uint32Array(64);
  const rotr = (x: number, n: number) => (x >>> n) | (x << (32 - n));

  for (let offset = 0; offset < padded.length; offset += 64) {
    for (let i = 0; i < 16; i++) w[i] = view.getUint32(offset + i * 4, false);
    for (let i = 16; i < 64; i++) {
      const s0 = rotr(w[i - 15], 7) ^ rotr(w[i - 15], 18) ^ (w[i - 15] >>> 3);
      const s1 = rotr(w[i - 2], 17) ^ rotr(w[i - 2], 19) ^ (w[i - 2] >>> 10);
      w[i] = (w[i - 16] + s0 + w[i - 7] + s1) | 0;
    }
    let [a, b, c, d, e, f, g, hh] = h;
    for (let i = 0; i < 64; i++) {
      const s1 = rotr(e, 6) ^ rotr(e, 11) ^ rotr(e, 25);
      const ch = (e & f) ^ (~e & g);
      const t1 = (hh + s1 + ch + K[i] + w[i]) | 0;
      const s0 = rotr(a, 2) ^ rotr(a, 13) ^ rotr(a, 22);
      const maj = (a & b) ^ (a & c) ^ (b & c);
      const t2 = (s0 + maj) | 0;
      hh = g; g = f; f = e; e = (d + t1) | 0; d = c; c = b; b = a; a = (t1 + t2) | 0;
    }
    h[0] = (h[0] + a) | 0; h[1] = (h[1] + b) | 0; h[2] = (h[2] + c) | 0; h[3] = (h[3] + d) | 0;
    h[4] = (h[4] + e) | 0; h[5] = (h[5] + f) | 0; h[6] = (h[6] + g) | 0; h[7] = (h[7] + hh) | 0;
  }

  const out = new Uint8Array(32);
  const outView = new DataView(out.buffer);
  h.forEach((value, i) => outView.setUint32(i * 4, value, false));
  return out;
}

const B64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';

export function base64Url(bytes: Uint8Array): string {
  let out = '';
  for (let i = 0; i < bytes.length; i += 3) {
    const b0 = bytes[i];
    const b1 = i + 1 < bytes.length ? bytes[i + 1] : 0;
    const b2 = i + 2 < bytes.length ? bytes[i + 2] : 0;
    out += B64[b0 >> 2] + B64[((b0 & 3) << 4) | (b1 >> 4)];
    if (i + 1 < bytes.length) out += B64[((b1 & 15) << 2) | (b2 >> 6)];
    if (i + 2 < bytes.length) out += B64[b2 & 63];
  }
  return out;
}

// ─── Flow ────────────────────────────────────────────────────────────────────

function form(params: Record<string, string>): string {
  return Object.entries(params)
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
    .join('&');
}

/** Start a sign-in: remember the verifier and state, return the URL to open in the browser. */
export async function beginOAuth(add: boolean): Promise<string> {
  const pending: Pending = { state: randomString(), verifier: randomString(), add, createdAt: Date.now() };
  await storage.set(PENDING_KEY, JSON.stringify(pending));

  return `${AUTH_ENDPOINT}?${form({
    response_type: 'code',
    client_id: OAUTH_CLIENT_ID,
    redirect_uri: OAUTH_REDIRECT_URI,
    scope: OAUTH_SCOPES.join(' '),
    state: pending.state,
    code_challenge: base64Url(sha256(pending.verifier)),
    code_challenge_method: 'S256',
  })}`;
}

function toConfig(token: TokenResponse, previous?: AuthConfig): AuthConfig {
  return {
    method: 'oauth',
    apiToken: token.access_token,
    refreshToken: token.refresh_token ?? previous?.refreshToken,
    expiresAt: token.expires_in ? Date.now() + token.expires_in * 1000 : undefined,
    email: previous?.email,
  };
}

async function tokenRequest(params: Record<string, string>): Promise<TokenResponse> {
  const res = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded', Accept: 'application/json' },
    body: form(params),
  });
  const text = await res.text();
  let json: any = null;
  try {
    json = JSON.parse(text);
  } catch {
    // not JSON: fall through to the status-based error
  }
  if (!res.ok || !json?.access_token) {
    throw new Error(json?.error_description ?? json?.error ?? `Token request failed (${res.status})`);
  }
  return json as TokenResponse;
}

/**
 * Finish a sign-in from the redirect. Throws when the state does not match the
 * one this device started with, so a link crafted by someone else is ignored.
 */
export async function completeOAuth(code: string, state: string): Promise<{ config: AuthConfig; add: boolean }> {
  const raw = await storage.get(PENDING_KEY);
  await storage.remove(PENDING_KEY);
  const pending = raw ? (JSON.parse(raw) as Pending) : null;
  if (!pending || pending.state !== state || Date.now() - pending.createdAt > PENDING_TTL_MS) {
    throw new Error('This sign-in link is no longer valid. Start again.');
  }

  const token = await tokenRequest({
    grant_type: 'authorization_code',
    code,
    redirect_uri: OAUTH_REDIRECT_URI,
    client_id: OAUTH_CLIENT_ID,
    code_verifier: pending.verifier,
  });
  return { config: toConfig(token), add: pending.add };
}

/** Exchange a refresh token for a new access token. */
export async function refreshOAuth(config: AuthConfig): Promise<AuthConfig> {
  if (!config.refreshToken) throw new Error('No refresh token');
  const token = await tokenRequest({
    grant_type: 'refresh_token',
    refresh_token: config.refreshToken,
    client_id: OAUTH_CLIENT_ID,
  });
  return toConfig(token, config);
}

/** Best effort: tell Cloudflare to drop the token when the user signs out. */
export async function revokeOAuth(config: AuthConfig): Promise<void> {
  const token = config.refreshToken ?? config.apiToken;
  if (config.method !== 'oauth' || !token) return;
  try {
    await fetch(REVOKE_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: form({ token, client_id: OAUTH_CLIENT_ID }),
    });
  } catch {
    // offline or already revoked: the local copy is deleted either way
  }
}

/** True when the access token is past, or within a minute of, its expiry. */
export function isExpired(config: AuthConfig): boolean {
  return config.method === 'oauth' && !!config.expiresAt && Date.now() > config.expiresAt - 60_000;
}
