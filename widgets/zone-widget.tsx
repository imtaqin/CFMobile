import { FlexWidget, TextWidget } from 'react-native-android-widget';
import type { ColorProp } from 'react-native-android-widget';
import type { ZoneStatus } from '@/services/shortcuts';

export type WidgetTexts = {
  title: string;
  underAttack: string;
  devMode: string;
  on: string;
  off: string;
  updated: string;
  signIn: string;
  noZone: string;
  failed: string;
  working: string;
};

type Palette = { bg: ColorProp; card: ColorProp; text: ColorProp; muted: ColorProp; border: ColorProp };

const LIGHT: Palette = { bg: '#FFFFFF', card: '#F4F4F5', text: '#18181B', muted: '#71717A', border: '#E4E4E7' };
const DARK: Palette = { bg: '#18181B', card: '#27272A', text: '#FAFAFA', muted: '#A1A1AA', border: '#3F3F46' };
const ORANGE: ColorProp = '#F38020';
const RED: ColorProp = '#EF4444';
const GREEN: ColorProp = '#10B981';

export type WidgetState =
  | { kind: 'status'; status: ZoneStatus }
  | { kind: 'message'; text: string; zoneName?: string };

function Toggle({ label, on, action, texts, p, alert }: {
  label: string; on: boolean; action: string; texts: WidgetTexts; p: Palette; alert?: boolean;
}) {
  const accent = on ? (alert ? RED : GREEN) : p.muted;
  return (
    <FlexWidget
      clickAction={action}
      accessibilityLabel={label}
      style={{
        flex: 1,
        flexDirection: 'column',
        backgroundColor: p.card,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: on ? accent : p.border,
        padding: 10,
      }}
    >
      <TextWidget text={label} maxLines={1} truncate="END" style={{ fontSize: 12, color: p.muted }} />
      <TextWidget text={on ? texts.on : texts.off} style={{ fontSize: 18, fontWeight: '600', color: on ? accent : p.text, marginTop: 2 }} />
    </FlexWidget>
  );
}

function Body({ state, texts, p }: { state: WidgetState; texts: WidgetTexts; p: Palette }) {
  const zoneName = state.kind === 'status' ? state.status.zone.name : state.zoneName ?? texts.title;
  return (
    <FlexWidget
      clickAction="OPEN_APP"
      style={{
        height: 'match_parent',
        width: 'match_parent',
        flexDirection: 'column',
        backgroundColor: p.bg,
        borderRadius: 22,
        padding: 14,
      }}
    >
      <FlexWidget style={{ flexDirection: 'row', alignItems: 'center', width: 'match_parent' }}>
        <FlexWidget style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: ORANGE, marginRight: 8 }} />
        <FlexWidget style={{ flex: 1 }}>
          <TextWidget text={zoneName} maxLines={1} truncate="END" style={{ fontSize: 15, fontWeight: '600', color: p.text }} />
        </FlexWidget>
        <TextWidget
          text="↻"
          clickAction="REFRESH"
          accessibilityLabel="Refresh"
          style={{ fontSize: 18, color: p.muted, paddingLeft: 10, paddingRight: 2 }}
        />
      </FlexWidget>

      {state.kind === 'status' ? (
        <FlexWidget style={{ flexDirection: 'row', width: 'match_parent', marginTop: 10, flexGap: 8 }}>
          <Toggle label={texts.underAttack} on={state.status.underAttack} action="TOGGLE_UAM" texts={texts} p={p} alert />
          <Toggle label={texts.devMode} on={state.status.devMode} action="TOGGLE_DEV" texts={texts} p={p} />
        </FlexWidget>
      ) : (
        <TextWidget text={state.text} maxLines={3} style={{ fontSize: 13, color: p.muted, marginTop: 12 }} />
      )}

      {state.kind === 'status' && (
        <TextWidget
          text={`${texts.updated} ${new Date(state.status.at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`}
          style={{ fontSize: 11, color: p.muted, marginTop: 8 }}
        />
      )}
    </FlexWidget>
  );
}

/** The zone status widget, in both themes; the launcher picks the matching one. */
export function zoneWidget(state: WidgetState, texts: WidgetTexts) {
  return {
    light: <Body state={state} texts={texts} p={LIGHT} />,
    dark: <Body state={state} texts={texts} p={DARK} />,
  };
}
