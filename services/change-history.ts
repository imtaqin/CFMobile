import { Platform } from 'react-native';
import * as FileSystem from 'expo-file-system/legacy';
import { DNSRecord, DNSRecordInput } from './types';

/**
 * A log of the changes made from this app (DNS records, zone settings, WAF
 * custom rules and IP access rules), kept in a file on the device.
 * It never leaves the phone, and it knows nothing about changes made in the
 * Cloudflare dashboard or by anyone else. Each entry keeps the values before
 * and after, which is what makes "undo" possible.
 */
const FILE = `${FileSystem.documentDirectory}change-history.json`;
const WEB_KEY = 'cf_change_history';
const MAX_ENTRIES = 300;

export type DnsSnapshot = Required<Pick<DNSRecordInput, 'type' | 'name' | 'content'>> &
  Pick<DNSRecordInput, 'ttl' | 'proxied' | 'priority' | 'comment'>;

/** What an entry changed. Entries written before this field existed are DNS changes. */
export type ChangeKind = 'dns' | 'setting' | 'waf_rule' | 'ip_rule';

/** The editable part of a WAF custom rule. */
export interface WafRuleSnapshot {
  action: string;
  expression: string;
  description?: string;
  enabled?: boolean;
}

/** The part of an IP access rule needed to create it again. */
export interface IpRuleSnapshot {
  mode: string;
  configuration: { target: string; value: string };
  notes?: string;
}

export interface ChangeEntry {
  id: string;
  kind?: ChangeKind;
  /** ISO timestamp of when the change was applied. */
  at: string;
  zoneId: string;
  zoneName?: string;
  action: 'create' | 'update' | 'delete';
  /** Missing only if Cloudflare did not return one for a new record. */
  recordId?: string;
  /** DNS changes only. */
  before: DnsSnapshot | null;
  after: DnsSnapshot | null;
  /** Setting id (`ssl`, `security_level`, ...) for settings; rule id for rules. */
  target?: string;
  /** WAF rules: the ruleset the rule lives in. */
  rulesetId?: string;
  /** Values for settings and rules; null on the side where the rule did not exist. */
  valueBefore?: unknown;
  valueAfter?: unknown;
  /** Set once the entry has been undone from the History screen. */
  revertedAt?: string;
}

export interface FieldChange {
  /** A DNS field, or any other key when `label` says what to show. */
  field: 'type' | 'name' | 'content' | 'ttl' | 'proxied' | 'priority' | 'comment' | (string & {});
  /** Translation key for fields that are not DNS fields. */
  label?: string;
  before: string | null;
  after: string | null;
}

const FIELDS = ['type', 'name', 'content', 'ttl', 'proxied', 'priority', 'comment'] as const;

/** The editable part of a record, in a stable shape. */
export function snapshot(record: DNSRecord | DNSRecordInput): DnsSnapshot {
  return {
    type: record.type,
    name: record.name,
    content: record.content,
    ttl: record.ttl,
    proxied: record.proxied,
    priority: record.priority,
    comment: record.comment || undefined,
  };
}

function show(field: string, value: unknown): string | null {
  if (value === undefined || value === null || value === '') return null;
  if (field === 'proxied') return value ? 'on' : 'off';
  if (field === 'ttl') return value === 1 ? 'auto' : String(value);
  return String(value);
}

/**
 * Field-by-field difference between two versions of a record. Pass null for
 * `before` (a new record) or `after` (a deleted one) to list every set field.
 */
export function diffFields(before: DnsSnapshot | null, after: DnsSnapshot | null): FieldChange[] {
  const out: FieldChange[] = [];
  for (const field of FIELDS) {
    const a = before ? show(field, before[field]) : null;
    const b = after ? show(field, after[field]) : null;
    if (a !== b) out.push({ field, before: a, after: b });
  }
  return out;
}

/** A setting value as text: on/off stay as they are, objects become JSON. */
function showValue(value: unknown): string | null {
  if (value === undefined || value === null || value === '') return null;
  if (typeof value === 'boolean') return value ? 'on' : 'off';
  if (typeof value === 'object') return JSON.stringify(value);
  return String(value);
}

/** Translation key for a zone setting's name, when the app has one. */
export const SETTING_LABELS: Record<string, string> = {
  ssl: 'history.setting_ssl',
  always_use_https: 'history.setting_always_use_https',
  min_tls_version: 'history.setting_min_tls_version',
  security_level: 'history.setting_security_level',
  development_mode: 'history.setting_development_mode',
  browser_cache_ttl: 'history.setting_browser_cache_ttl',
  security_header: 'history.setting_security_header',
};

/** Field-by-field difference for any entry, DNS or not. */
export function entryChanges(entry: ChangeEntry): FieldChange[] {
  const kind = entry.kind ?? 'dns';
  if (kind === 'dns') return diffFields(entry.before, entry.after);
  if (kind === 'setting') {
    const a = showValue(entry.valueBefore), b = showValue(entry.valueAfter);
    return a === b ? [] : [{ field: 'value', label: 'history.value', before: a, after: b }];
  }
  const keys: [string, string, (v: any) => unknown][] = kind === 'waf_rule'
    ? [['action', 'history.rule_action', (v) => v.action], ['expression', 'history.rule_expression', (v) => v.expression],
       ['description', 'history.rule_description', (v) => v.description], ['enabled', 'history.rule_enabled', (v) => v.enabled]]
    : [['mode', 'history.rule_action', (v) => v.mode], ['value', 'history.rule_target', (v) => v.configuration?.value],
       ['notes', 'history.rule_notes', (v) => v.notes]];
  const out: FieldChange[] = [];
  for (const [field, label, get] of keys) {
    const a = entry.valueBefore ? showValue(get(entry.valueBefore)) : null;
    const b = entry.valueAfter ? showValue(get(entry.valueAfter)) : null;
    if (a !== b) out.push({ field, label, before: a, after: b });
  }
  return out;
}

async function read(): Promise<ChangeEntry[]> {
  try {
    const raw = Platform.OS === 'web'
      ? localStorage.getItem(WEB_KEY)
      : (await FileSystem.getInfoAsync(FILE)).exists ? await FileSystem.readAsStringAsync(FILE) : null;
    const list = raw ? JSON.parse(raw) : [];
    return Array.isArray(list) ? list : [];
  } catch {
    // A corrupt file must not take the DNS screens down with it.
    return [];
  }
}

async function write(list: ChangeEntry[]): Promise<void> {
  const raw = JSON.stringify(list.slice(0, MAX_ENTRIES));
  if (Platform.OS === 'web') localStorage.setItem(WEB_KEY, raw);
  else await FileSystem.writeAsStringAsync(FILE, raw);
}

/** Newest first. */
export async function getHistory(): Promise<ChangeEntry[]> {
  return read();
}

/** Record a change that has already been applied. Never throws: logging must not fail a save. */
export async function addChange(entry: Omit<ChangeEntry, 'id' | 'at'>): Promise<void> {
  try {
    const list = await read();
    list.unshift({
      ...entry,
      id: `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`,
      at: new Date().toISOString(),
    });
    await write(list);
  } catch {
    // storage full or unavailable: the change itself still went through
  }
}

/** Log a zone setting change that has already been applied. */
export function logSetting(zoneId: string, settingId: string, before: unknown, after: unknown, zoneName?: string): Promise<void> {
  return addChange({
    kind: 'setting', zoneId, zoneName, action: 'update', target: settingId,
    before: null, after: null, valueBefore: before, valueAfter: after,
  });
}

/** Log a WAF custom rule change that has already been applied. */
export function logWafRule(
  zoneId: string, rulesetId: string, action: ChangeEntry['action'], ruleId: string | undefined,
  before: WafRuleSnapshot | null, after: WafRuleSnapshot | null,
): Promise<void> {
  return addChange({
    kind: 'waf_rule', zoneId, action, target: ruleId, rulesetId,
    before: null, after: null, valueBefore: before, valueAfter: after,
  });
}

/** Log an IP access rule being added or removed. */
export function logIpRule(zoneId: string, action: 'create' | 'delete', ruleId: string | undefined, rule: IpRuleSnapshot): Promise<void> {
  return addChange({
    kind: 'ip_rule', zoneId, action, target: ruleId,
    before: null, after: null,
    valueBefore: action === 'delete' ? rule : null,
    valueAfter: action === 'create' ? rule : null,
  });
}

export async function markReverted(id: string): Promise<void> {
  const list = await read();
  const entry = list.find((e) => e.id === id);
  if (!entry) return;
  entry.revertedAt = new Date().toISOString();
  await write(list);
}

export async function clearHistory(): Promise<void> {
  await write([]);
}
