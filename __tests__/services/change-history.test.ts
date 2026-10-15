import { diffFields, snapshot, DnsSnapshot } from '@/services/change-history';

jest.mock('expo-file-system/legacy', () => ({
  documentDirectory: 'file:///doc/',
  getInfoAsync: jest.fn(async () => ({ exists: false })),
  readAsStringAsync: jest.fn(async () => '[]'),
  writeAsStringAsync: jest.fn(async () => undefined),
}));

const base: DnsSnapshot = { type: 'A', name: 'api.example.com', content: '203.0.113.10', ttl: 1, proxied: true };

describe('change history diff', () => {
  it('lists only the fields that changed', () => {
    const after: DnsSnapshot = { ...base, content: '203.0.113.24', proxied: false };
    expect(diffFields(base, after)).toEqual([
      { field: 'content', before: '203.0.113.10', after: '203.0.113.24' },
      { field: 'proxied', before: 'on', after: 'off' },
    ]);
  });

  it('returns nothing when the record is unchanged', () => {
    expect(diffFields(base, { ...base })).toEqual([]);
  });

  it('treats a missing comment and an empty comment as the same', () => {
    expect(diffFields({ ...base, comment: undefined }, snapshot({ ...base, comment: '' }))).toEqual([]);
  });

  it('shows TTL 1 as auto and other TTLs as numbers', () => {
    expect(diffFields(base, { ...base, ttl: 300 })).toEqual([{ field: 'ttl', before: 'auto', after: '300' }]);
  });

  it('lists every set field for a new record', () => {
    const fields = diffFields(null, base).map((c) => c.field);
    expect(fields).toEqual(['type', 'name', 'content', 'ttl', 'proxied']);
    expect(diffFields(null, base).every((c) => c.before === null)).toBe(true);
  });

  it('lists every set field for a deleted record', () => {
    expect(diffFields(base, null).every((c) => c.after === null)).toBe(true);
  });

  it('keeps only the editable fields in a snapshot', () => {
    const record = {
      id: 'r1', zone_id: 'z1', zone_name: 'example.com', name: 'api.example.com', type: 'A' as const,
      content: '203.0.113.10', proxiable: true, proxied: true, ttl: 1, locked: false,
      created_on: '2026-01-01', modified_on: '2026-01-02',
    };
    expect(snapshot(record)).toEqual({
      type: 'A', name: 'api.example.com', content: '203.0.113.10', ttl: 1, proxied: true,
      priority: undefined, comment: undefined,
    });
  });
});

describe('history beyond DNS', () => {
  const { entryChanges } = require('@/services/change-history');
  const base = { id: 'x', at: '2026-10-14T00:00:00Z', zoneId: 'z', before: null, after: null };

  it('shows a setting change as one value row', () => {
    expect(entryChanges({ ...base, kind: 'setting', action: 'update', target: 'ssl', valueBefore: 'flexible', valueAfter: 'strict' }))
      .toEqual([{ field: 'value', label: 'history.value', before: 'flexible', after: 'strict' }]);
  });

  it('lists only the WAF rule fields that changed', () => {
    const rule = { action: 'block', expression: 'ip.src eq 203.0.113.9', description: 'bad bot', enabled: true };
    expect(entryChanges({ ...base, kind: 'waf_rule', action: 'update', valueBefore: rule, valueAfter: { ...rule, enabled: false } }))
      .toEqual([{ field: 'enabled', label: 'history.rule_enabled', before: 'on', after: 'off' }]);
  });

  it('shows a removed IP rule on the before side', () => {
    const rule = { mode: 'block', configuration: { target: 'ip', value: '203.0.113.9' } };
    expect(entryChanges({ ...base, kind: 'ip_rule', action: 'delete', valueBefore: rule, valueAfter: null })).toEqual([
      { field: 'mode', label: 'history.rule_action', before: 'block', after: null },
      { field: 'value', label: 'history.rule_target', before: '203.0.113.9', after: null },
    ]);
  });

  it('still reads old DNS entries that have no kind', () => {
    const record = { type: 'A', name: 'a.example.com', content: '203.0.113.1', ttl: 1, proxied: true };
    expect(entryChanges({ ...base, action: 'update', before: record, after: { ...record, content: '203.0.113.2' } }))
      .toEqual([{ field: 'content', before: '203.0.113.1', after: '203.0.113.2' }]);
  });
});
