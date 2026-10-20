import { Platform } from 'react-native';
import { requestWidgetUpdate } from 'react-native-android-widget';
import i18n from '@/i18n';
import { setTileState } from '@/modules/cf-quick-tile';
import * as shortcuts from '@/services/shortcuts';
import { zoneWidget, WidgetState, WidgetTexts } from './zone-widget';
import { trafficWidget, TrafficState } from './traffic-widget';

/** What a widget or tile tap can ask for. */
export type ShortcutAction = 'TOGGLE_UAM' | 'TOGGLE_DEV' | 'PURGE';

export function widgetTexts(): WidgetTexts {
  const t = i18n.t.bind(i18n);
  return {
    title: 'CloudFlare Mobile',
    underAttack: t('shortcuts.under_attack'),
    devMode: t('shortcuts.dev_mode'),
    on: t('shortcuts.on'),
    off: t('shortcuts.off'),
    updated: t('shortcuts.updated'),
    signIn: t('shortcuts.sign_in'),
    noZone: t('shortcuts.no_zone'),
    failed: t('shortcuts.failed'),
    working: t('shortcuts.working'),
    purge: t('shortcuts.purge'),
    purgeArm: t('shortcuts.purge_arm'),
    purged: t('shortcuts.purged'),
    requests: t('shortcuts.requests'),
    cached: t('shortcuts.cached'),
    threats: t('shortcuts.threats'),
  };
}

/** Push one state to the Quick Settings tile and every placed status widget. */
export async function publish(state: WidgetState): Promise<void> {
  if (Platform.OS !== 'android') return;
  const tx = widgetTexts();
  if (state.kind === 'status') {
    setTileState(tx.underAttack, state.status.zone.name, state.status.underAttack, true);
  } else {
    setTileState(tx.underAttack, state.text, false, !!state.zoneName);
  }
  await requestWidgetUpdate({ widgetName: 'ZoneStatus', renderWidget: () => zoneWidget(state, tx) }).catch(() => {});
}

/** Push one state to every placed traffic widget. It has no tile of its own. */
export async function publishTraffic(state: TrafficState): Promise<void> {
  if (Platform.OS !== 'android') return;
  const tx = widgetTexts();
  await requestWidgetUpdate({ widgetName: 'ZoneTraffic', renderWidget: () => trafficWidget(state, tx) }).catch(() => {});
}

/**
 * Read the shortcut zone's traffic and update the traffic widget. Kept apart
 * from `refreshShortcuts` because it costs an analytics query, and a tap on a
 * toggle does not change last week's numbers.
 */
export async function refreshTraffic(): Promise<TrafficState> {
  const tx = widgetTexts();
  let state: TrafficState;
  try {
    if (!(await shortcuts.ensureAuth())) {
      state = { kind: 'message', text: tx.signIn };
    } else {
      const zone = await shortcuts.resolveZone();
      if (!zone) {
        state = { kind: 'message', text: tx.noZone };
      } else {
        try {
          state = { kind: 'traffic', traffic: await shortcuts.getTraffic(zone) };
        } catch (e: any) {
          const message = e?.response?.data?.errors?.[0]?.message ?? e?.message;
          state = { kind: 'message', zoneName: zone.name, text: message ? `${tx.failed}: ${message}` : tx.failed };
        }
      }
    }
  } catch {
    state = { kind: 'message', text: tx.failed };
  }
  await publishTraffic(state).catch(() => {});
  return state;
}

/**
 * Read the shortcut zone, optionally run an action on it, and update the tile
 * and the widgets. Never throws: callers fire and forget.
 */
export async function refreshShortcuts(action?: ShortcutAction): Promise<WidgetState> {
  const tx = widgetTexts();
  let state: WidgetState;
  try {
    if (!(await shortcuts.ensureAuth())) {
      state = { kind: 'message', text: tx.signIn };
    } else {
      const zone = await shortcuts.resolveZone();
      if (!zone) {
        state = { kind: 'message', text: tx.noZone };
      } else {
        try {
          if (action === 'PURGE') {
            // First tap only arms it; the cache is emptied on the second.
            //
            // A widget cannot re-render on a timer, so if the second tap never
            // comes the "tap again" label stays on screen until the next
            // periodic update. Tapping it then has simply re-armed: the window
            // has closed, so that tap costs one extra press and never purges
            // by surprise. Erring that way round is the whole point.
            if (await shortcuts.isPurgeArmed()) {
              await shortcuts.purgeCache(zone);
              state = { kind: 'status', status: await shortcuts.getStatus(zone), note: tx.purged };
            } else {
              await shortcuts.armPurge();
              const status = await shortcuts.getStatus(zone);
              state = { kind: 'status', status: { ...status, purgeArmed: true } };
            }
          } else {
            const status = action === 'TOGGLE_UAM'
              ? await shortcuts.toggleUnderAttack(zone)
              : action === 'TOGGLE_DEV'
                ? await shortcuts.toggleDevMode(zone)
                : await shortcuts.getStatus(zone);
            // Any other interaction cancels a half-finished purge.
            if (!action) await shortcuts.disarmPurge();
            state = { kind: 'status', status };
          }
        } catch (e: any) {
          const message = e?.response?.data?.errors?.[0]?.message ?? e?.message;
          state = { kind: 'message', zoneName: zone.name, text: message ? `${tx.failed}: ${message}` : tx.failed };
        }
      }
    }
  } catch {
    state = { kind: 'message', text: tx.failed };
  }
  await publish(state).catch(() => {});
  return state;
}
