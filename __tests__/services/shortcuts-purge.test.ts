import * as SecureStore from 'expo-secure-store';

// A widget cannot ask "are you sure?", so the whole safety of a purge button
// on a home screen is this arming window. Mock the API so nothing is actually
// purged and the arming can be checked on its own.
const mockPurgeAllCache = jest.fn(async () => ({ success: true, errors: [], messages: [], result: { id: 'p1' } }));

jest.mock('@/services/cloudflare', () => ({
  purgeAllCache: (...args: unknown[]) => mockPurgeAllCache(...(args as [])),
  loadAuth: jest.fn(),
  saveAuth: jest.fn(),
  getZones: jest.fn(),
  getZoneSetting: jest.fn(),
  updateSecurityLevel: jest.fn(),
  toggleDevMode: jest.fn(),
  getZoneAnalytics: jest.fn(),
}));

jest.mock('@/services/change-history', () => ({ logSetting: jest.fn() }));
jest.mock('@/services/profiles', () => ({ getActiveProfile: jest.fn() }));

import * as shortcuts from '@/services/shortcuts';

const zone = { id: 'zone1', name: 'example.com' };
const store = new Map<string, string>();

beforeEach(() => {
  store.clear();
  mockPurgeAllCache.mockClear();
  (SecureStore.getItemAsync as jest.Mock).mockImplementation(async (k: string) => store.get(k) ?? null);
  (SecureStore.setItemAsync as jest.Mock).mockImplementation(async (k: string, v: string) => { store.set(k, v); });
});

afterEach(() => {
  jest.useRealTimers();
});

describe('purging from a widget takes two taps', () => {
  it('is not armed to begin with', async () => {
    expect(await shortcuts.isPurgeArmed()).toBe(false);
  });

  it('arms on the first tap', async () => {
    await shortcuts.armPurge();

    expect(await shortcuts.isPurgeArmed()).toBe(true);
    // Arming must not reach Cloudflare.
    expect(mockPurgeAllCache).not.toHaveBeenCalled();
  });

  it('forgets the arming after the window closes', async () => {
    jest.useFakeTimers().setSystemTime(new Date('2026-10-19T12:00:00Z'));
    await shortcuts.armPurge();
    expect(await shortcuts.isPurgeArmed()).toBe(true);

    // Well past the ten-second window: a pocket tap tomorrow must not count.
    jest.setSystemTime(new Date('2026-10-19T12:00:30Z'));

    expect(await shortcuts.isPurgeArmed()).toBe(false);
  });

  it('purges and disarms on the confirming tap', async () => {
    await shortcuts.armPurge();
    await shortcuts.purgeCache(zone);

    expect(mockPurgeAllCache).toHaveBeenCalledWith('zone1');
    expect(await shortcuts.isPurgeArmed()).toBe(false);
  });

  it('can be stood down without purging', async () => {
    await shortcuts.armPurge();
    await shortcuts.disarmPurge();

    expect(await shortcuts.isPurgeArmed()).toBe(false);
    expect(mockPurgeAllCache).not.toHaveBeenCalled();
  });

  it('treats a corrupt stored value as not armed', async () => {
    store.set('cf_shortcut_purge_armed', 'not a number');

    expect(await shortcuts.isPurgeArmed()).toBe(false);
  });
});
