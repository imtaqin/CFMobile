import * as SecureStore from 'expo-secure-store';
import * as appLock from '@/services/app-lock';

jest.mock('expo-local-authentication', () => ({
  hasHardwareAsync: jest.fn(async () => true),
  isEnrolledAsync: jest.fn(async () => true),
  authenticateAsync: jest.fn(async () => ({ success: true })),
}));

// An in-memory secure store, so values written by one call are read by the next.
const store = new Map<string, string>();
beforeEach(() => {
  store.clear();
  (SecureStore.getItemAsync as jest.Mock).mockImplementation(async (k: string) => store.get(k) ?? null);
  (SecureStore.setItemAsync as jest.Mock).mockImplementation(async (k: string, v: string) => { store.set(k, v); });
  (SecureStore.deleteItemAsync as jest.Mock).mockImplementation(async (k: string) => { store.delete(k); });
});

describe('app lock', () => {
  it('is off until something is set up', async () => {
    const s = await appLock.getLockSettings();
    expect(s.method).toBe('none');
    expect(await appLock.isLockActive(s)).toBe(false);
  });

  it('accepts the PIN it stored and rejects another one', async () => {
    await appLock.setSecret('pin', '2468');
    const s = await appLock.getLockSettings();
    expect(s).toMatchObject({ method: 'pin', pinLength: 4 });
    expect(await appLock.isLockActive(s)).toBe(true);
    expect(await appLock.verifySecret('1357')).toEqual({ ok: false, waitMs: 0 });
    expect(await appLock.verifySecret('2468')).toEqual({ ok: true });
  });

  it('keeps only a salted hash, never the PIN itself', async () => {
    await appLock.setSecret('pin', '2468');
    const stored = [...store.values()].join(' ');
    expect(stored).not.toContain('2468');
    // A second PIN of the same value gets a different salt and so a different hash.
    const first = store.get('cf_app_lock_secret');
    await appLock.setSecret('pin', '2468');
    expect(store.get('cf_app_lock_secret')).not.toBe(first);
  });

  it('makes every try wait after five wrong ones, and resets on success', async () => {
    await appLock.setSecret('pin', '2468');
    for (let i = 0; i < 5; i++) expect((await appLock.verifySecret('0000')).ok).toBe(false);
    const sixth = await appLock.verifySecret('0000');
    expect(sixth.ok).toBe(false);
    expect(sixth.ok === false && sixth.waitMs).toBe(30_000);
    // Even the right PIN is refused while the wait runs.
    expect((await appLock.verifySecret('2468')).ok).toBe(false);
    expect(await appLock.lockoutRemaining()).toBeGreaterThan(0);
  });

  it('stores patterns as the dots in order', async () => {
    await appLock.setSecret('pattern', appLock.encodePattern([0, 4, 8, 5]));
    expect((await appLock.getLockSettings()).method).toBe('pattern');
    expect((await appLock.verifySecret('8-4-0-5')).ok).toBe(false);
    expect((await appLock.verifySecret('0-4-8-5')).ok).toBe(true);
  });

  it('turns everything off when the secret is cleared', async () => {
    await appLock.setSecret('pin', '2468');
    await appLock.clearSecret();
    expect((await appLock.getLockSettings()).method).toBe('none');
    expect(store.has('cf_app_lock_secret')).toBe(false);
  });

  it('validates PIN length and digits', () => {
    expect(appLock.isValidPin('123')).toBe(false);
    expect(appLock.isValidPin('1234')).toBe(true);
    expect(appLock.isValidPin('12345678')).toBe(true);
    expect(appLock.isValidPin('123456789')).toBe(false);
    expect(appLock.isValidPin('12a4')).toBe(false);
  });
});
