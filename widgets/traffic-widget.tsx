import { FlexWidget, TextWidget } from 'react-native-android-widget';
import type { ColorProp } from 'react-native-android-widget';
import type { ZoneTraffic } from '@/services/shortcuts';
import type { WidgetTexts } from './zone-widget';

/**
 * Seven days of requests for one zone, as bars on the home screen.
 *
 * Read-only on purpose: the status widget is where the switches live, and a
 * chart nobody can mis-tap can sit on a home screen for weeks.
 */

type Palette = { bg: ColorProp; card: ColorProp; text: ColorProp; muted: ColorProp; border: ColorProp };

const LIGHT: Palette = { bg: '#FFFFFF', card: '#F4F4F5', text: '#18181B', muted: '#71717A', border: '#E4E4E7' };
const DARK: Palette = { bg: '#18181B', card: '#27272A', text: '#FAFAFA', muted: '#A1A1AA', border: '#3F3F46' };
const ORANGE: ColorProp = '#F38020';

export type TrafficState =
  | { kind: 'traffic'; traffic: ZoneTraffic }
  | { kind: 'message'; text: string; zoneName?: string };

/** Tallest bar, in dp. */
const CHART_HEIGHT = 30;

/**
 * 1234567 reads as "1.2M" — a widget has no room for digits nobody counts.
 *
 * Each tier is entered at the point where rounding would otherwise spill into
 * it: without that, 999999 renders as "1000k" instead of "1.0M", and 9999 as
 * "10.0k" instead of "10k". Exported for the test that pins those edges.
 */
export function short(n: number): string {
  const scaled = (value: number, suffix: string) =>
    `${value >= 9.95 ? Math.round(value) : value.toFixed(1)}${suffix}`;
  if (n >= 999_500_000) return scaled(n / 1_000_000_000, 'B');
  if (n >= 999_500) return scaled(n / 1_000_000, 'M');
  if (n >= 999.5) return scaled(n / 1_000, 'k');
  return String(Math.round(n));
}

function Bars({ daily, p }: { daily: number[]; p: Palette }) {
  const peak = Math.max(...daily, 1);
  return (
    <FlexWidget
      style={{
        flexDirection: 'row',
        alignItems: 'flex-end',
        width: 'match_parent',
        height: CHART_HEIGHT,
        flexGap: 4,
        marginTop: 8,
      }}
    >
      {daily.map((value, i) => (
        <FlexWidget
          key={i}
          style={{
            flex: 1,
            // A quiet day still gets a visible stub, so gaps read as low, not missing.
            height: Math.max(3, Math.round((value / peak) * CHART_HEIGHT)),
            borderRadius: 3,
            // The last bar is today, and today is the one being watched.
            backgroundColor: i === daily.length - 1 ? ORANGE : p.border,
          }}
        />
      ))}
    </FlexWidget>
  );
}

function Body({ state, texts, p }: { state: TrafficState; texts: WidgetTexts; p: Palette }) {
  const zoneName = state.kind === 'traffic' ? state.traffic.zone.name : state.zoneName ?? texts.title;
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

      {state.kind === 'traffic' ? (
        <FlexWidget style={{ flexDirection: 'column', width: 'match_parent' }}>
          <FlexWidget style={{ flexDirection: 'row', alignItems: 'center', width: 'match_parent', marginTop: 6 }}>
            <TextWidget
              text={short(state.traffic.requests)}
              style={{ fontSize: 24, color: p.text }}
            />
            <TextWidget
              text={texts.requests}
              maxLines={1}
              truncate="END"
              style={{ fontSize: 11, color: p.muted, paddingLeft: 6 }}
            />
          </FlexWidget>

          {state.traffic.daily.length > 0 && <Bars daily={state.traffic.daily} p={p} />}

          <TextWidget
            text={`${state.traffic.cachedPct}% ${texts.cached} · ${short(state.traffic.threats)} ${texts.threats}`}
            maxLines={1}
            truncate="END"
            style={{ fontSize: 11, color: p.muted, marginTop: 8 }}
          />
        </FlexWidget>
      ) : (
        <TextWidget text={state.text} maxLines={3} style={{ fontSize: 13, color: p.muted, marginTop: 12 }} />
      )}
    </FlexWidget>
  );
}

/** The traffic widget in both themes; the launcher picks the matching one. */
export function trafficWidget(state: TrafficState, texts: WidgetTexts) {
  return {
    light: <Body state={state} texts={texts} p={LIGHT} />,
    dark: <Body state={state} texts={texts} p={DARK} />,
  };
}
