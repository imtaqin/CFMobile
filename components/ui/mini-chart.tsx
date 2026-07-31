import { useState } from 'react';
import { View, Text, StyleSheet, LayoutChangeEvent } from 'react-native';
import Svg, { Path, Circle, Rect } from 'react-native-svg';
import { useTheme } from '@/hooks/use-theme';
import { FontSize, Spacing } from '@/constants/theme';

/** Compact sparkline for dashboards and list rows. */
export function Sparkline({
  data,
  color,
  height = 44,
  fill = true,
}: {
  data: number[];
  color: string;
  height?: number;
  fill?: boolean;
}) {
  const [width, setWidth] = useState(0);
  const onLayout = (e: LayoutChangeEvent) => setWidth(e.nativeEvent.layout.width);

  const max = Math.max(...data, 1);
  const x = (i: number) => (data.length <= 1 ? width / 2 : (i / (data.length - 1)) * width);
  const y = (v: number) => height - 3 - (v / max) * (height - 8);

  const line = data.map((v, i) => `${i === 0 ? 'M' : 'L'}${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(' ');
  const area = data.length
    ? `${line} L${x(data.length - 1).toFixed(1)},${height} L${x(0).toFixed(1)},${height} Z`
    : '';

  return (
    <View onLayout={onLayout} style={{ height }}>
      {width > 0 && data.length > 0 && (
        <Svg width={width} height={height}>
          {fill && <Path d={area} fill={color} fillOpacity={0.14} />}
          <Path d={line} stroke={color} strokeWidth={2} fill="none" strokeLinejoin="round" strokeLinecap="round" />
          <Circle cx={x(data.length - 1)} cy={y(data[data.length - 1])} r={3} fill={color} />
        </Svg>
      )}
    </View>
  );
}

/** Horizontal proportion bar — one row per slice. */
export function ProportionBar({
  slices,
  height = 10,
}: {
  slices: { value: number; color: string }[];
  height?: number;
}) {
  const total = slices.reduce((s, x) => s + x.value, 0) || 1;
  return (
    <View style={{ flexDirection: 'row', height, borderRadius: height / 2, overflow: 'hidden' }}>
      {slices.map((s, i) => (
        <View key={i} style={{ flex: s.value / total, backgroundColor: s.color }} />
      ))}
    </View>
  );
}

/** Small vertical bars, e.g. per-day counts inside a card. */
export function MiniBars({
  data,
  color,
  height = 40,
}: {
  data: number[];
  color: string;
  height?: number;
}) {
  const [width, setWidth] = useState(0);
  const max = Math.max(...data, 1);
  const gap = 2;
  const bw = data.length ? Math.max((width - gap * (data.length - 1)) / data.length, 1) : 0;

  return (
    <View onLayout={(e) => setWidth(e.nativeEvent.layout.width)} style={{ height }}>
      {width > 0 && (
        <Svg width={width} height={height}>
          {data.map((v, i) => {
            const h = Math.max((v / max) * height, v > 0 ? 2 : 0);
            return (
              <Rect
                key={i}
                x={i * (bw + gap)}
                y={height - h}
                width={bw}
                height={h}
                rx={Math.min(2, bw / 2)}
                fill={color}
                fillOpacity={0.85}
              />
            );
          })}
        </Svg>
      )}
    </View>
  );
}

/** Stat tile used across service cards. */
export function StatTile({
  label,
  value,
  color,
  sub,
}: {
  label: string;
  value: string | number;
  color: string;
  sub?: string;
}) {
  const { colors } = useTheme();
  return (
    <View style={[styles.tile, { backgroundColor: colors.surface, borderColor: colors.borderLight }]}>
      <Text style={[styles.tileLabel, { color: colors.textTertiary }]} numberOfLines={1}>{label}</Text>
      <Text style={[styles.tileValue, { color }]}>{value}</Text>
      {!!sub && <Text style={[styles.tileSub, { color: colors.textSecondary }]} numberOfLines={1}>{sub}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  tile: {
    flex: 1,
    minWidth: 90,
    padding: Spacing.md,
    borderRadius: 14,
    borderWidth: 1,
    gap: 2,
  },
  tileLabel: { fontSize: 10, fontWeight: '800', textTransform: 'uppercase', letterSpacing: 0.5 },
  tileValue: { fontSize: 24, fontWeight: '800', letterSpacing: -0.8 },
  tileSub: { fontSize: 11 },
});
