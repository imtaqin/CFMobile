/**
 * Keeps the app inside Cloudflare's API limit (1200 requests per five minutes
 * per account) instead of finding it the hard way.
 *
 * Two parts. A concurrency gate, so a screen that fires a dozen calls at once
 * sends them a few at a time. And a shared cooldown: when one request comes
 * back 429, every other request waits out the Retry-After window instead of
 * each discovering the limit for itself — which is what turns one rate limit
 * into a screenful of failures.
 */

/** In-flight requests allowed at once. Enough to keep a screen snappy. */
const MAX_IN_FLIGHT = 6;

/** Never hold requests back for longer than this, whatever Retry-After says. */
const MAX_COOLDOWN_SECONDS = 60;

let inFlight = 0;
const waiting: (() => void)[] = [];
/** Epoch ms until which every request holds back, set by the last 429. */
let cooldownUntil = 0;

const sleep = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

/** Wait for any cooldown to pass and for a free slot, then take the slot. */
export async function acquire(): Promise<void> {
  // Loop rather than wait once: another 429 can extend the window while we sleep.
  for (let wait = cooldownUntil - Date.now(); wait > 0; wait = cooldownUntil - Date.now()) {
    await sleep(wait);
  }
  if (inFlight < MAX_IN_FLIGHT) {
    inFlight++;
    return;
  }
  await new Promise<void>((resolve) => waiting.push(resolve));
}

/**
 * Give the slot back. A queued request takes it over directly, which is why
 * `inFlight` is left alone in that case.
 */
export function release(): void {
  const next = waiting.shift();
  if (next) {
    next();
    return;
  }
  inFlight = Math.max(0, inFlight - 1);
}

/** Hold every request back for `seconds`, after Cloudflare answered 429. */
export function noteRateLimit(seconds: number): void {
  const capped = Math.min(Math.max(seconds, 1), MAX_COOLDOWN_SECONDS);
  const until = Date.now() + capped * 1000;
  if (until > cooldownUntil) cooldownUntil = until;
}

/** Milliseconds left on the current cooldown, for screens that want to say so. */
export function cooldownRemaining(): number {
  return Math.max(0, cooldownUntil - Date.now());
}

/** Test seam: forget the queue and any cooldown. */
export function reset(): void {
  inFlight = 0;
  waiting.length = 0;
  cooldownUntil = 0;
}
