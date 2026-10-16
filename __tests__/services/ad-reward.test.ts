import * as SecureStore from 'expo-secure-store';

// A real premium purchase would unlock everything and hide what these tests
// are about, so this install is deliberately a non-paying one.
jest.mock('@/services/premium', () => ({
  isPremium: () => false,
  usePremium: () => false,
}));

import * as adReward from '@/services/ad-reward';

const store = new Map<string, string>();

beforeEach(() => {
  store.clear();
  (SecureStore.getItemAsync as jest.Mock).mockImplementation(async (k: string) => store.get(k) ?? null);
  (SecureStore.setItemAsync as jest.Mock).mockImplementation(async (k: string, v: string) => { store.set(k, v); });
  adReward.reset();
});

afterEach(() => {
  jest.useRealTimers();
});

describe('rewarded day passes', () => {
  it('opens only the screen the ad was watched for', async () => {
    await adReward.initAdReward();
    expect(adReward.isUnlocked('stream')).toBe(false);

    adReward.grantPass('stream');

    expect(adReward.isUnlocked('stream')).toBe(true);
    expect(adReward.isUnlocked('images')).toBe(false);
  });

  it('runs out a day later', async () => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2026-03-01T10:00:00Z'));
    await adReward.initAdReward();

    adReward.grantPass('vectorize');
    expect(adReward.passHoursLeft('vectorize')).toBe(24);

    jest.setSystemTime(new Date('2026-03-02T09:59:00Z'));
    expect(adReward.isUnlocked('vectorize')).toBe(true);

    jest.setSystemTime(new Date('2026-03-02T10:01:00Z'));
    expect(adReward.isUnlocked('vectorize')).toBe(false);
    expect(adReward.passHoursLeft('vectorize')).toBe(0);
  });

  it('stops counting views once the daily cap is reached', async () => {
    await adReward.initAdReward();
    expect(adReward.viewsLeftToday()).toBe(adReward.DAILY_CAP);

    for (let i = 0; i < adReward.DAILY_CAP; i += 1) adReward.noteAdWatched();

    expect(adReward.viewsLeftToday()).toBe(0);
  });

  it('gives the allowance back the next day', async () => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2026-03-01T12:00:00Z'));
    await adReward.initAdReward();

    adReward.noteAdWatched();
    adReward.noteAdWatched();
    expect(adReward.viewsLeftToday()).toBe(adReward.DAILY_CAP - 2);

    // Two days on, so the rollover lands whatever the machine's timezone is.
    jest.setSystemTime(new Date('2026-03-03T12:00:00Z'));
    expect(adReward.viewsLeftToday()).toBe(adReward.DAILY_CAP);
  });

  it('still holds the pass after the app restarts', async () => {
    await adReward.initAdReward();
    adReward.grantPass('hyperdrive');

    // Same device, fresh process: the module forgets, the store does not.
    adReward.reset();
    await adReward.initAdReward();

    expect(adReward.isUnlocked('hyperdrive')).toBe(true);
  });

  it('drops a pass that expired while the app was closed', async () => {
    store.set('cf_ad_passes', JSON.stringify({
      day: '2026-03-01',
      views: 1,
      passes: { stream: Date.now() - 1000 },
    }));

    await adReward.initAdReward();

    expect(adReward.isUnlocked('stream')).toBe(false);
    expect(JSON.parse(store.get('cf_ad_passes') ?? '{}').passes?.stream).toBeUndefined();
  });

  it('starts clean when the stored blob is corrupt', async () => {
    store.set('cf_ad_passes', 'not json at all');

    await adReward.initAdReward();

    expect(adReward.isUnlocked('stream')).toBe(false);
    expect(adReward.viewsLeftToday()).toBe(adReward.DAILY_CAP);
  });
});
