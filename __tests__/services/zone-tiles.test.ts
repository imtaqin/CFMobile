import * as SecureStore from 'expo-secure-store';
import * as zoneTiles from '@/services/zone-tiles';

const store = new Map<string, string>();

beforeEach(() => {
  store.clear();
  (SecureStore.getItemAsync as jest.Mock).mockImplementation(async (k: string) => store.get(k) ?? null);
  (SecureStore.setItemAsync as jest.Mock).mockImplementation(async (k: string, v: string) => { store.set(k, v); });
  zoneTiles.reset();
});

describe('hiding zone tiles', () => {
  it('shows everything on a fresh install', async () => {
    await zoneTiles.initZoneTiles();

    expect(zoneTiles.isHidden('zaraz')).toBe(false);
    expect(zoneTiles.hiddenCount()).toBe(0);
  });

  it('hides and shows one tile again', async () => {
    await zoneTiles.initZoneTiles();

    zoneTiles.toggle('zaraz');
    expect(zoneTiles.isHidden('zaraz')).toBe(true);
    expect(zoneTiles.isHidden('dns')).toBe(false);

    zoneTiles.toggle('zaraz');
    expect(zoneTiles.isHidden('zaraz')).toBe(false);
  });

  it('remembers the choice across a restart', async () => {
    await zoneTiles.initZoneTiles();
    zoneTiles.toggle('zaraz');
    zoneTiles.toggle('logpush');
    // Let the write settle, then come back as a cold start would.
    await Promise.resolve();
    zoneTiles.reset();
    await zoneTiles.initZoneTiles();

    expect(zoneTiles.isHidden('zaraz')).toBe(true);
    expect(zoneTiles.isHidden('logpush')).toBe(true);
    expect(zoneTiles.hiddenCount()).toBe(2);
  });

  it('brings everything back at once', async () => {
    await zoneTiles.initZoneTiles();
    zoneTiles.toggle('zaraz');
    zoneTiles.toggle('logpush');

    zoneTiles.showAll();

    expect(zoneTiles.hiddenCount()).toBe(0);
  });

  it('shows everything when the stored value is corrupt', async () => {
    store.set('cf_hidden_tiles', '{not json');
    await zoneTiles.initZoneTiles();

    expect(zoneTiles.hiddenCount()).toBe(0);
  });

  it('ignores non-string entries in a tampered file', async () => {
    store.set('cf_hidden_tiles', JSON.stringify(['zaraz', 42, null, 'logpush']));
    await zoneTiles.initZoneTiles();

    expect(zoneTiles.hiddenCount()).toBe(2);
    expect(zoneTiles.isHidden('zaraz')).toBe(true);
  });
});
