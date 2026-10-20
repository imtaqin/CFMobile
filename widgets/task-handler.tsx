import type { WidgetTaskHandlerProps } from 'react-native-android-widget';
import { loadLanguage } from '@/i18n';
import * as shortcuts from '@/services/shortcuts';
import { zoneWidget } from './zone-widget';
import { trafficWidget } from './traffic-widget';
import { refreshShortcuts, refreshTraffic, widgetTexts, ShortcutAction } from './sync';

const HANDLED = ['ZoneStatus', 'ZoneTraffic', 'QuickTile'] as const;

/**
 * Runs headless whenever a widget is added, updated, resized or tapped, and
 * when the Quick Settings tile is tapped (it queues this task as "QuickTile").
 */
export async function widgetTaskHandler(props: WidgetTaskHandlerProps) {
  const { widgetName } = props.widgetInfo;
  if (!(HANDLED as readonly string[]).includes(widgetName)) return;
  if (props.widgetAction === 'WIDGET_DELETED') return;
  await loadLanguage().catch(() => {});

  // The traffic widget is read-only: any interaction is just a refresh.
  if (widgetName === 'ZoneTraffic') {
    props.renderWidget(trafficWidget(await refreshTraffic(), widgetTexts()));
    return;
  }

  const click = props.widgetAction === 'WIDGET_CLICK' ? props.clickAction : undefined;
  const action: ShortcutAction | undefined =
    click === 'TOGGLE_UAM' || click === 'TOGGLE_DEV' || click === 'PURGE' ? click : undefined;

  // Show that the tap registered while Cloudflare answers. Not for PURGE: its
  // first tap only arms the button, and the answer it needs to show is the
  // "tap again" prompt, not a spinner that hides the toggles.
  if (action && action !== 'PURGE' && widgetName === 'ZoneStatus') {
    const zone = await shortcuts.getShortcutZone();
    props.renderWidget(zoneWidget({ kind: 'message', text: widgetTexts().working, zoneName: zone?.name }, widgetTexts()));
  }

  // Updates the tile and every placed widget, including this one.
  const state = await refreshShortcuts(action);
  if (widgetName === 'ZoneStatus') props.renderWidget(zoneWidget(state, widgetTexts()));
}
