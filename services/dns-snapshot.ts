import { Platform } from 'react-native';
import * as FileSystem from 'expo-file-system/legacy';
import * as api from './cloudflare';
import { snapshot as recordSnapshot, DnsSnapshot } from './change-history';
import { DNSRecord, DNSRecordData, DNSRecordInput } from './types';

/**
 * Zone-wide DNS snapshots: take one before a risky change, compare it with
 * what is live now, and put back exactly what moved.
 *
 * This is not the BIND export already on the DNS screen. BIND is a one-way
 * bulk add — it drops the proxy flag and comments, and it cannot tell you a
 * record has gone missing. A snapshot keeps every field the API accepts back,
 * so a restore can create what vanished, delete what appeared and correct
 * what changed, in one batch call.
 *
 * Snapshots live in a file on the device and never leave it unless the user
 * shares one.
 */

const DIR = `${FileSystem.documentDirectory}dns-snapshots`;
const WEB_PREFIX = 'cf_dns_snapshot_';

/** Snapshots kept per zone; the oldest is dropped past this. */
const MAX_PER_ZONE = 10;

/** Record as stored: the change-history shape plus the `data` SRV and CAA need. */
export type SnapRecord = DnsSnapshot & { data?: DNSRecordData };

export interface Snapshot {
  /** Bumped only if the stored shape changes incompatibly. */
  version: 1;
  zoneId: string;
  zoneName: string;
  takenAt: string;
  records: SnapRecord[];
}

/** A stored snapshot without its records, for listing. */
export interface SnapshotMeta {
  id: string;
  zoneId: string;
  zoneName: string;
  takenAt: string;
  count: number;
}

export interface ChangedRecord {
  live: DNSRecord;
  snap: SnapRecord;
}

export interface SnapshotDiff {
  /** Live now, absent from the snapshot — restoring deletes these. */
  extra: DNSRecord[];
  /** In the snapshot, gone from live — restoring creates these. */
  missing: SnapRecord[];
  /** Same record, different TTL / proxy / priority / comment. */
  changed: ChangedRecord[];
}

// ─── Storage ─────────────────────────────────────────────────────────────────

const store = {
  async list(): Promise<string[]> {
    if (Platform.OS === 'web') {
      return Object.keys(localStorage).filter((k) => k.startsWith(WEB_PREFIX));
    }
    const info = await FileSystem.getInfoAsync(DIR);
    if (!info.exists) return [];
    const names = await FileSystem.readDirectoryAsync(DIR);
    return names.filter((n) => n.endsWith('.json'));
  },
  async read(key: string): Promise<string | null> {
    if (Platform.OS === 'web') return localStorage.getItem(key);
    try {
      return await FileSystem.readAsStringAsync(`${DIR}/${key}`);
    } catch {
      return null;
    }
  },
  async write(key: string, body: string): Promise<void> {
    if (Platform.OS === 'web') { localStorage.setItem(key, body); return; }
    const info = await FileSystem.getInfoAsync(DIR);
    if (!info.exists) await FileSystem.makeDirectoryAsync(DIR, { intermediates: true });
    await FileSystem.writeAsStringAsync(`${DIR}/${key}`, body);
  },
  async remove(key: string): Promise<void> {
    if (Platform.OS === 'web') { localStorage.removeItem(key); return; }
    await FileSystem.deleteAsync(`${DIR}/${key}`, { idempotent: true });
  },
};

/** File name for a snapshot. The zone id is in the name so listing can filter without reading. */
function keyFor(zoneId: string, takenAt: string): string {
  const stamp = takenAt.replace(/[:.]/g, '-');
  return Platform.OS === 'web' ? `${WEB_PREFIX}${zoneId}__${stamp}` : `${zoneId}__${stamp}.json`;
}

function zoneOf(key: string): string {
  return key.replace(WEB_PREFIX, '').split('__')[0];
}

// ─── Taking and keeping snapshots ────────────────────────────────────────────

/** Strip a live record down to what a restore has to send back. */
export function toSnapRecord(record: DNSRecord): SnapRecord {
  const base = recordSnapshot(record) as SnapRecord;
  // SRV and CAA carry their value in `data`; `content` for them is only a label.
  if (record.data && Object.keys(record.data).length > 0) base.data = record.data;
  return base;
}

/**
 * Every DNS record in the zone, following the pagination to the end.
 *
 * `maxPages` is for callers that must not run long, such as the background
 * monitor. It throws rather than returning a short list, because a partial
 * list read as the whole zone would look like a pile of deleted records.
 */
export async function fetchAllRecords(zoneId: string, maxPages?: number): Promise<DNSRecord[]> {
  const first = await api.getDnsRecords(zoneId, 1);
  const out = [...(first.result ?? [])];
  const pages = first.result_info?.total_pages ?? 1;
  if (maxPages !== undefined && pages > maxPages) {
    throw new Error(`zone has ${pages} pages of records, over the ${maxPages} page limit`);
  }
  for (let page = 2; page <= pages; page++) {
    const next = await api.getDnsRecords(zoneId, page);
    out.push(...(next.result ?? []));
  }
  return out;
}

export async function takeSnapshot(zoneId: string, zoneName: string): Promise<Snapshot> {
  const records = await fetchAllRecords(zoneId);
  const snap: Snapshot = {
    version: 1,
    zoneId,
    zoneName,
    takenAt: new Date().toISOString(),
    records: records.map(toSnapRecord),
  };
  await store.write(keyFor(zoneId, snap.takenAt), JSON.stringify(snap));
  await prune(zoneId);
  return snap;
}

/** Drop the oldest snapshots for a zone past the keep limit. */
async function prune(zoneId: string): Promise<void> {
  const mine = (await store.list()).filter((k) => zoneOf(k) === zoneId).sort();
  for (const key of mine.slice(0, Math.max(0, mine.length - MAX_PER_ZONE))) {
    await store.remove(key);
  }
}

export async function listSnapshots(zoneId?: string): Promise<SnapshotMeta[]> {
  const keys = await store.list();
  const out: SnapshotMeta[] = [];
  for (const key of keys) {
    if (zoneId && zoneOf(key) !== zoneId) continue;
    const body = await store.read(key);
    if (!body) continue;
    const snap = parse(body);
    if (snap) {
      out.push({
        id: key,
        zoneId: snap.zoneId,
        zoneName: snap.zoneName,
        takenAt: snap.takenAt,
        count: snap.records.length,
      });
    }
  }
  return out.sort((a, b) => b.takenAt.localeCompare(a.takenAt));
}

export async function readSnapshot(id: string): Promise<Snapshot | null> {
  const body = await store.read(id);
  return body ? parse(body) : null;
}

export async function deleteSnapshot(id: string): Promise<void> {
  await store.remove(id);
}

/**
 * Parse a snapshot, rejecting anything that is not one. The file may have come
 * from the user's own storage or another device, so nothing here is trusted.
 */
export function parse(body: string): Snapshot | null {
  try {
    const raw = JSON.parse(body);
    if (!raw || raw.version !== 1 || !Array.isArray(raw.records)) return null;
    if (typeof raw.zoneId !== 'string' || typeof raw.zoneName !== 'string') return null;
    const records: SnapRecord[] = [];
    for (const r of raw.records) {
      if (!r || typeof r.type !== 'string' || typeof r.name !== 'string') continue;
      records.push({
        type: r.type,
        name: r.name,
        content: typeof r.content === 'string' ? r.content : '',
        ttl: typeof r.ttl === 'number' ? r.ttl : undefined,
        proxied: typeof r.proxied === 'boolean' ? r.proxied : undefined,
        priority: typeof r.priority === 'number' ? r.priority : undefined,
        comment: typeof r.comment === 'string' ? r.comment : undefined,
        data: r.data && typeof r.data === 'object' ? r.data : undefined,
      });
    }
    if (records.length === 0) return null;
    return {
      version: 1,
      zoneId: raw.zoneId,
      zoneName: raw.zoneName,
      takenAt: typeof raw.takenAt === 'string' ? raw.takenAt : new Date().toISOString(),
      records,
    };
  } catch {
    return null;
  }
}

// ─── Comparing ───────────────────────────────────────────────────────────────

/**
 * Identity of a record for matching. Content is part of it, so two A records
 * on the same name are told apart instead of looking like one that changed.
 */
function identity(r: { type: string; name: string; content?: string; data?: DNSRecordData }): string {
  const value = r.data && Object.keys(r.data).length > 0
    ? JSON.stringify(Object.entries(r.data).sort())
    : (r.content ?? '');
  return `${r.type}|${r.name.toLowerCase()}|${value}`;
}

/** Fields a restore can correct without recreating the record. */
function settings(r: { ttl?: number; proxied?: boolean; priority?: number; comment?: string }) {
  return {
    ttl: r.ttl ?? 1,
    proxied: r.proxied ?? false,
    priority: r.priority,
    comment: r.comment || undefined,
  };
}

function sameSettings(a: DNSRecord, b: SnapRecord): boolean {
  const x = settings(a);
  const y = settings(b);
  return x.ttl === y.ttl && x.proxied === y.proxied && x.priority === y.priority && x.comment === y.comment;
}

export function diff(snap: Snapshot, live: DNSRecord[]): SnapshotDiff {
  // Identity can repeat (two identical records), so each key holds a queue.
  const byId = new Map<string, DNSRecord[]>();
  for (const r of live) {
    const key = identity(r);
    const bucket = byId.get(key);
    if (bucket) bucket.push(r);
    else byId.set(key, [r]);
  }

  const missing: SnapRecord[] = [];
  const changed: ChangedRecord[] = [];

  for (const s of snap.records) {
    const bucket = byId.get(identity(s));
    const match = bucket?.shift();
    if (!match) missing.push(s);
    else if (!sameSettings(match, s)) changed.push({ live: match, snap: s });
  }

  // Whatever is left in the queues is live but not in the snapshot.
  const extra: DNSRecord[] = [];
  for (const bucket of byId.values()) extra.push(...bucket);

  return { extra, missing, changed };
}

export function isClean(d: SnapshotDiff): boolean {
  return d.extra.length === 0 && d.missing.length === 0 && d.changed.length === 0;
}

// ─── Restoring ───────────────────────────────────────────────────────────────

/** Turn a snapshot record into the create/update payload the API takes. */
export function toInput(r: SnapRecord): DNSRecordInput {
  const input: DNSRecordInput = {
    type: r.type,
    name: r.name,
    ttl: r.ttl ?? 1,
    comment: r.comment || undefined,
  };
  // SRV and CAA send `data`; everything else sends `content`.
  if (r.data && Object.keys(r.data).length > 0) input.data = r.data;
  else input.content = r.content;
  if (['A', 'AAAA', 'CNAME'].includes(r.type)) input.proxied = r.proxied ?? false;
  if (r.type === 'MX' && r.priority !== undefined) input.priority = r.priority;
  return input;
}

export interface RestoreOptions {
  /** Create the records the snapshot has and the zone no longer does. */
  restoreMissing: boolean;
  /** Put TTL / proxy / comment back to the snapshot's values. */
  fixChanged: boolean;
  /** Delete records added since the snapshot. Off by default — it is the destructive half. */
  deleteExtra: boolean;
}

export interface RestorePlan {
  posts: DNSRecordInput[];
  patches: (Partial<DNSRecordInput> & { id: string })[];
  deletes: { id: string }[];
}

export function plan(d: SnapshotDiff, options: RestoreOptions): RestorePlan {
  return {
    posts: options.restoreMissing ? d.missing.map(toInput) : [],
    patches: options.fixChanged
      ? d.changed.map(({ live, snap }) => {
        const input = toInput(snap);
        // A patch only carries the fields that drifted; identity stays put.
        const fields: Partial<DNSRecordInput> & { id: string } = { id: live.id, ttl: input.ttl };
        if (input.proxied !== undefined) fields.proxied = input.proxied;
        if (input.priority !== undefined) fields.priority = input.priority;
        fields.comment = input.comment ?? '';
        return fields;
      })
      : [],
    deletes: options.deleteExtra ? d.extra.map((r) => ({ id: r.id })) : [],
  };
}

export function planSize(p: RestorePlan): number {
  return p.posts.length + p.patches.length + p.deletes.length;
}

/** Apply a plan. One batch call, so the zone is never left half-restored. */
export async function applyPlan(zoneId: string, p: RestorePlan) {
  return api.batchDnsRecords(zoneId, {
    posts: p.posts.length ? p.posts : undefined,
    patches: p.patches.length ? p.patches : undefined,
    deletes: p.deletes.length ? p.deletes : undefined,
  });
}

/** Snapshot as a file the user can keep or send somewhere, returning its path. */
export async function writeExport(snap: Snapshot): Promise<string> {
  const name = `dns-${snap.zoneName}-${snap.takenAt.slice(0, 10)}.cfsnapshot.json`;
  const uri = `${FileSystem.cacheDirectory}${name}`;
  await FileSystem.writeAsStringAsync(uri, JSON.stringify(snap, null, 2));
  return uri;
}

/** Store a snapshot that came from a file. Returns null if it is not one. */
export async function importSnapshot(body: string, zoneId: string): Promise<Snapshot | null> {
  const snap = parse(body);
  if (!snap) return null;
  // Keep it under the zone it is being restored into, not the one it was taken from.
  const landed: Snapshot = { ...snap, zoneId };
  await store.write(keyFor(zoneId, landed.takenAt), JSON.stringify(landed));
  await prune(zoneId);
  return landed;
}
