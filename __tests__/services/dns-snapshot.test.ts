import * as snap from '@/services/dns-snapshot';
import { DNSRecord } from '@/services/types';

/**
 * A restore can delete DNS records, so the comparison is the part that has to
 * be right. Everything tested here is pure: no storage, no network.
 */

let n = 0;
function live(over: Partial<DNSRecord> = {}): DNSRecord {
  n += 1;
  return {
    id: `rec${n}`,
    zone_id: 'z1',
    zone_name: 'example.com',
    name: 'example.com',
    type: 'A',
    content: '1.2.3.4',
    proxiable: true,
    proxied: false,
    ttl: 1,
    locked: false,
    created_on: '2026-01-01T00:00:00Z',
    modified_on: '2026-01-01T00:00:00Z',
    ...over,
  };
}

function snapshotOf(records: DNSRecord[]): snap.Snapshot {
  return {
    version: 1,
    zoneId: 'z1',
    zoneName: 'example.com',
    takenAt: '2026-02-01T00:00:00Z',
    records: records.map(snap.toSnapRecord),
  };
}

describe('comparing a snapshot with the live zone', () => {
  it('reports nothing when the zone has not moved', () => {
    const records = [live(), live({ name: 'www.example.com', type: 'CNAME', content: 'example.com' })];
    const d = snap.diff(snapshotOf(records), records);

    expect(snap.isClean(d)).toBe(true);
  });

  it('finds a record that was deleted from the zone', () => {
    const kept = live();
    const gone = live({ name: 'old.example.com', content: '9.9.9.9' });
    const d = snap.diff(snapshotOf([kept, gone]), [kept]);

    expect(d.missing.map((r) => r.name)).toEqual(['old.example.com']);
    expect(d.extra).toHaveLength(0);
    expect(d.changed).toHaveLength(0);
  });

  it('finds a record that was added since', () => {
    const before = live();
    const added = live({ name: 'new.example.com', content: '8.8.8.8' });
    const d = snap.diff(snapshotOf([before]), [before, added]);

    expect(d.extra.map((r) => r.name)).toEqual(['new.example.com']);
    expect(d.missing).toHaveLength(0);
  });

  it('separates a settings change from a content change', () => {
    const original = live({ ttl: 300 });
    // Same record, someone turned the proxy on and changed the TTL.
    const retuned = { ...original, ttl: 1, proxied: true };
    const d = snap.diff(snapshotOf([original]), [retuned]);

    expect(d.changed).toHaveLength(1);
    expect(d.changed[0].snap.ttl).toBe(300);
    expect(d.missing).toHaveLength(0);
    expect(d.extra).toHaveLength(0);
  });

  it('treats an edited address as one record out and one in, not a settings change', () => {
    const original = live({ content: '1.2.3.4' });
    const edited = { ...original, content: '5.6.7.8' };
    const d = snap.diff(snapshotOf([original]), [edited]);

    expect(d.changed).toHaveLength(0);
    expect(d.missing).toHaveLength(1);
    expect(d.missing[0].content).toBe('1.2.3.4');
    expect(d.extra).toHaveLength(1);
    expect(d.extra[0].content).toBe('5.6.7.8');
  });

  it('keeps round-robin records on one name apart', () => {
    const a = live({ content: '1.1.1.1' });
    const b = live({ content: '2.2.2.2' });
    const c = live({ content: '3.3.3.3' });
    // Two of the three survive; the comparison must not pair them up wrongly.
    const d = snap.diff(snapshotOf([a, b, c]), [a, c]);

    expect(d.missing.map((r) => r.content)).toEqual(['2.2.2.2']);
    expect(d.extra).toHaveLength(0);
    expect(d.changed).toHaveLength(0);
  });

  it('matches hostnames without regard to case', () => {
    const stored = live({ name: 'WWW.example.com', type: 'CNAME', content: 'example.com' });
    const now = { ...stored, name: 'www.example.com' };
    const d = snap.diff(snapshotOf([stored]), [now]);

    expect(snap.isClean(d)).toBe(true);
  });

  it('compares SRV records on their data, not their label', () => {
    const srv = live({
      type: 'SRV',
      name: '_sip._tcp.example.com',
      content: '10 5 5060 sip.example.com',
      data: { priority: 10, weight: 5, port: 5060, target: 'sip.example.com' },
    });
    const movedPort = { ...srv, data: { ...srv.data, port: 5061 } } as DNSRecord;

    expect(snap.isClean(snap.diff(snapshotOf([srv]), [srv]))).toBe(true);

    const d = snap.diff(snapshotOf([srv]), [movedPort]);
    expect(d.missing).toHaveLength(1);
    expect(d.extra).toHaveLength(1);
  });
});

describe('building a restore plan', () => {
  const missingRec = live({ name: 'gone.example.com', content: '9.9.9.9', ttl: 120 });
  const extraRec = live({ name: 'new.example.com', content: '8.8.8.8' });
  const drifted = live({ ttl: 300 });

  const d: snap.SnapshotDiff = {
    missing: [snap.toSnapRecord(missingRec)],
    extra: [extraRec],
    changed: [{ live: { ...drifted, ttl: 1 }, snap: snap.toSnapRecord(drifted) }],
  };

  it('deletes nothing unless deleting is asked for', () => {
    const p = snap.plan(d, { restoreMissing: true, fixChanged: true, deleteExtra: false });

    expect(p.deletes).toHaveLength(0);
    expect(p.posts).toHaveLength(1);
    expect(p.patches).toHaveLength(1);
    expect(snap.planSize(p)).toBe(2);
  });

  it('includes the deletions when it is', () => {
    const p = snap.plan(d, { restoreMissing: false, fixChanged: false, deleteExtra: true });

    expect(p.deletes).toEqual([{ id: extraRec.id }]);
    expect(p.posts).toHaveLength(0);
    expect(p.patches).toHaveLength(0);
  });

  it('builds an empty plan when every option is off', () => {
    const p = snap.plan(d, { restoreMissing: false, fixChanged: false, deleteExtra: false });

    expect(snap.planSize(p)).toBe(0);
  });

  it('patches by record id and carries the snapshot TTL', () => {
    const p = snap.plan(d, { restoreMissing: false, fixChanged: true, deleteExtra: false });

    expect(p.patches[0].id).toBe(drifted.id);
    expect(p.patches[0].ttl).toBe(300);
  });

  it('sends SRV values as data and never as content', () => {
    const srv = live({
      type: 'SRV',
      name: '_sip._tcp.example.com',
      content: '10 5 5060 sip.example.com',
      data: { priority: 10, weight: 5, port: 5060, target: 'sip.example.com' },
    });
    const input = snap.toInput(snap.toSnapRecord(srv));

    expect(input.data).toEqual({ priority: 10, weight: 5, port: 5060, target: 'sip.example.com' });
    expect(input.content).toBeUndefined();
  });

  it('only sends the proxy flag on record types that can be proxied', () => {
    const txt = snap.toInput(snap.toSnapRecord(live({ type: 'TXT', content: 'v=spf1 -all' })));
    const a = snap.toInput(snap.toSnapRecord(live({ type: 'A', proxied: true })));

    expect(txt.proxied).toBeUndefined();
    expect(a.proxied).toBe(true);
  });

  it('keeps the MX priority', () => {
    const mx = snap.toInput(snap.toSnapRecord(live({ type: 'MX', content: 'mail.example.com', priority: 20 })));

    expect(mx.priority).toBe(20);
  });
});

describe('reading a snapshot file', () => {
  it('accepts a snapshot it wrote itself', () => {
    const original = snapshotOf([live(), live({ type: 'MX', content: 'mail.example.com', priority: 10 })]);
    const parsed = snap.parse(JSON.stringify(original));

    expect(parsed?.records).toHaveLength(2);
    expect(parsed?.zoneName).toBe('example.com');
  });

  it('rejects anything that is not one', () => {
    expect(snap.parse('not json')).toBeNull();
    expect(snap.parse('{}')).toBeNull();
    expect(snap.parse(JSON.stringify({ version: 2, zoneId: 'z', zoneName: 'n', records: [] }))).toBeNull();
    expect(snap.parse(JSON.stringify({ version: 1, zoneId: 'z', zoneName: 'n', records: [] }))).toBeNull();
  });

  it('drops malformed records rather than the whole file', () => {
    const body = JSON.stringify({
      version: 1,
      zoneId: 'z1',
      zoneName: 'example.com',
      takenAt: '2026-02-01T00:00:00Z',
      records: [
        { type: 'A', name: 'example.com', content: '1.2.3.4', ttl: 1 },
        { name: 'no-type.example.com' },
        null,
      ],
    });

    expect(snap.parse(body)?.records).toHaveLength(1);
  });
});
