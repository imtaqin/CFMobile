import { runChecks } from './monitoring';

export const MONITOR_TASK = 'cf-monitor-task';

/**
 * FOSS build: system notifications on Android go through Firebase Cloud
 * Messaging in the notification library the Play build uses, and that is not
 * free software. So this build has no background alerts. "Check now" on the
 * Monitoring screen still runs the checks and shows the result in the app.
 */
export async function requestNotificationPermission(): Promise<boolean> {
  return false;
}

export async function registerMonitoring(): Promise<void> {}

export async function unregisterMonitoring(): Promise<void> {}

export async function syncMonitoring(): Promise<void> {}

/** Manual "check now" from the UI. Returns how many problems were found. */
export async function runCheckNow(): Promise<number> {
  const alerts = await runChecks();
  return alerts.length;
}
