import {
  acquire,
  release,
  noteRateLimit,
  cooldownRemaining,
  reset,
} from '@/services/rate-limit';

describe('rate limit gate', () => {
  beforeEach(() => {
    jest.useRealTimers();
    reset();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('lets six requests through at once and queues the seventh', async () => {
    for (let i = 0; i < 6; i += 1) await acquire();

    let seventhStarted = false;
    const seventh = acquire().then(() => {
      seventhStarted = true;
    });

    // Nothing released yet, so the seventh must still be waiting.
    await Promise.resolve();
    expect(seventhStarted).toBe(false);

    release();
    await seventh;
    expect(seventhStarted).toBe(true);
  });

  it('hands a freed slot to the next request in line, not to a newcomer only', async () => {
    for (let i = 0; i < 6; i += 1) await acquire();

    const order: string[] = [];
    const first = acquire().then(() => order.push('first'));
    const second = acquire().then(() => order.push('second'));

    release();
    await first;
    expect(order).toEqual(['first']);

    release();
    await second;
    expect(order).toEqual(['first', 'second']);
  });

  it('holds every request back for the cooldown after a 429', async () => {
    jest.useFakeTimers();
    noteRateLimit(5);
    expect(cooldownRemaining()).toBeGreaterThan(0);

    let went = false;
    const pending = acquire().then(() => {
      went = true;
    });

    await Promise.resolve();
    expect(went).toBe(false);

    await jest.advanceTimersByTimeAsync(5000);
    await pending;
    expect(went).toBe(true);
    expect(cooldownRemaining()).toBe(0);
  });

  it('keeps the longest cooldown when a second 429 lands', () => {
    noteRateLimit(5);
    const after5 = cooldownRemaining();
    noteRateLimit(30);
    expect(cooldownRemaining()).toBeGreaterThan(after5);

    // A shorter window must not cut the current one short.
    const longest = cooldownRemaining();
    noteRateLimit(1);
    expect(cooldownRemaining()).toBeGreaterThanOrEqual(longest - 50);
  });

  it('caps the cooldown so one odd Retry-After cannot freeze the app', () => {
    noteRateLimit(99999);
    expect(cooldownRemaining()).toBeLessThanOrEqual(60_000);
  });

  it('never drops below zero slots when release is called too often', async () => {
    release();
    release();
    // Six should still fit after the stray releases.
    for (let i = 0; i < 6; i += 1) await acquire();

    let seventhStarted = false;
    const seventh = acquire().then(() => {
      seventhStarted = true;
    });
    await Promise.resolve();
    expect(seventhStarted).toBe(false);

    release();
    await seventh;
    expect(seventhStarted).toBe(true);
  });
});
