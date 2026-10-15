import type { WidgetTaskHandlerProps } from 'react-native-android-widget';
import { loadLanguage } from '@/i18n';
import * as shortcuts from '@/services/shortcuts';
import { zoneWidget } from './zone-widget';
import { refreshShortcuts, widgetTexts } from './sync';

/**
 * Runs headless whenever the widget is added, updated, resized or tapped, and
 * when the Quick Settings tile is tapped (it queues this task as "QuickTile").
 */
export async function widgetTaskHandler(props: WidgetTaskHandlerProps) {
  const { widgetName } = props.widgetInfo;
  if (widgetName !== 'ZoneStatus' && widgetName !== 'QuickTile') return;
  if (props.widgetAction === 'WIDGET_DELETED') return;
  await loadLanguage().catch(() => {});

  const click = props.widgetAction === 'WIDGET_CLICK' ? props.clickAction : undefined;
  const action = click === 'TOGGLE_UAM' || click === 'TOGGLE_DEV' ? click : undefined;

  if (action && widgetName === 'ZoneStatus') {
    // Show that the tap registered while Cloudflare answers.
    const zone = await shortcuts.getShortcutZone();
    props.renderWidget(zoneWidget({ kind: 'message', text: widgetTexts().working, zoneName: zone?.name }, widgetTexts()));
  }

  // Updates the tile and every placed widget, including this one.
  const state = await refreshShortcuts(action);
  if (widgetName === 'ZoneStatus') props.renderWidget(zoneWidget(state, widgetTexts()));
}
