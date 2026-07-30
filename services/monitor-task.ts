import { Platform } from 'react-native';
import * as Notifications from 'expo-notifications';
import * as TaskManager from 'expo-task-manager';
import * as BackgroundTask from 'expo-background-task';
import { runChecks, getConfig } from './monitoring';
import { loadAuth } from './cloudflare';
import { isPremium } from './premium';

export const MONITOR_TASK = 'cf-monitor-task';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

TaskManager.defineTask(MONITOR_TASK, async () => {
  try {
    // Background process starts cold — auth must be rehydrated first.
    const auth = await loadAuth();
    if (!auth) return BackgroundTask.BackgroundTaskResult.Success;

    const alerts = await runChecks();
    for (const alert of alerts) {
      await Notifications.scheduleNotificationAsync({
        content: { title: alert.title, body: alert.body, data: { kind: alert.kind } },
        trigger: null,
      });
    }
    return BackgroundTask.BackgroundTaskResult.Success;
  } catch {
    return BackgroundTask.BackgroundTaskResult.Failed;
  }
});

export async function requestNotificationPermission(): Promise<boolean> {
  if (Platform.OS === 'web') return false;
  const { status } = await Notifications.getPermissionsAsync();
  if (status === 'granted') return true;
  const req = await Notifications.requestPermissionsAsync();
  return req.status === 'granted';
}

export async function registerMonitoring(): Promise<void> {
  if (Platform.OS === 'web') return;
  const registered = await TaskManager.isTaskRegisteredAsync(MONITOR_TASK);
  if (registered) return;
  await BackgroundTask.registerTaskAsync(MONITOR_TASK, { minimumInterval: 15 });
}

export async function unregisterMonitoring(): Promise<void> {
  if (Platform.OS === 'web') return;
  const registered = await TaskManager.isTaskRegisteredAsync(MONITOR_TASK);
  if (registered) await BackgroundTask.unregisterTaskAsync(MONITOR_TASK);
}

/** Called on app start: keep the OS task in sync with config + entitlement. */
export async function syncMonitoring(): Promise<void> {
  if (Platform.OS === 'web') return;
  try {
    const config = await getConfig();
    if (config.enabled && config.zoneIds.length && isPremium()) {
      await registerMonitoring();
    } else {
      await unregisterMonitoring();
    }
  } catch {
    // ignore
  }
}

/** Manual "check now" from the UI — shows notifications immediately. */
export async function runCheckNow(): Promise<number> {
  const alerts = await runChecks();
  for (const alert of alerts) {
    await Notifications.scheduleNotificationAsync({
      content: { title: alert.title, body: alert.body, data: { kind: alert.kind } },
      trigger: null,
    });
  }
  return alerts.length;
}
