import { Platform } from 'react-native';
import { requestWidgetUpdate } from 'react-native-android-widget';
import i18n from '@/i18n';
import { setTileState } from '@/modules/cf-quick-tile';
import * as shortcuts from '@/services/shortcuts';
import { zoneWidget, WidgetState, WidgetTexts } from './zone-widget';

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
  };
}

/** Push one state to the Quick Settings tile and every placed widget. */
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

/**
 * Read the shortcut zone, optionally run an action on it, and update the tile
 * and the widgets. Never throws: callers fire and forget.
 */
export async function refreshShortcuts(action?: 'TOGGLE_UAM' | 'TOGGLE_DEV'): Promise<WidgetState> {
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
          const status = action === 'TOGGLE_UAM'
            ? await shortcuts.toggleUnderAttack(zone)
            : action === 'TOGGLE_DEV'
              ? await shortcuts.toggleDevMode(zone)
              : await shortcuts.getStatus(zone);
          state = { kind: 'status', status };
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
