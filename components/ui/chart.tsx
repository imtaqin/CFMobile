import { useState } from 'react';
import { View, Text, StyleSheet, LayoutChangeEvent } from 'react-native';
import Svg, { Path, Line, Rect, Circle } from 'react-native-svg';
import { useTheme } from '@/hooks/use-theme';
import { FontSize, Spacing } from '@/constants/theme';

export interface ChartSeries {
  label: string;
  color: string;
  data: number[];
}

interface LineChartProps {
  series: ChartSeries[];
  labels?: string[];
  height?: number;
  formatValue?: (n: number) => string;
}

function niceMax(max: number): number {
  if (max <= 0) return 1;
  const exp = Math.pow(10, Math.floor(Math.log10(max)));
  const f = max / exp;
  const nice = f <= 1 ? 1 : f <= 2 ? 2 : f <= 5 ? 5 : 10;
  return nice * exp;
}

function defaultFormat(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return String(Math.round(n));
}

export function LineChart({ series, labels, height = 180, formatValue = defaultFormat }: LineChartProps) {
  const { colors } = useTheme();
  const [width, setWidth] = useState(0);

  const onLayout = (e: LayoutChangeEvent) => setWidth(e.nativeEvent.layout.width);

  const pointCount = Math.max(...series.map((s) => s.data.length), 0);
  const maxVal = niceMax(Math.max(...series.flatMap((s) => s.data), 0));

  const padLeft = 8;
  const padRight = 8;
  const padTop = 8;
  const padBottom = 20;
  const chartW = Math.max(width - padLeft - padRight, 0);
  const chartH = height - padTop - padBottom;

  const x = (i: number) => padLeft + (pointCount <= 1 ? chartW / 2 : (i / (pointCount - 1)) * chartW);
  const y = (v: number) => padTop + chartH - (v / maxVal) * chartH;

  const linePath = (data: number[]) =>
    data.map((v, i) => `${i === 0 ? 'M' : 'L'}${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(' ');

  const areaPath = (data: number[]) =>
    `${linePath(data)} L${x(data.length - 1).toFixed(1)},${(padTop + chartH).toFixed(1)} L${x(0).toFixed(1)},${(padTop + chartH).toFixed(1)} Z`;

  const gridLines = [0.25, 0.5, 0.75, 1];

  // Pick a few x labels to avoid crowding
  const labelIdx: number[] = [];
  if (labels && labels.length > 0) {
    const maxLabels = 4;
    const step = Math.max(1, Math.ceil(labels.length / maxLabels));
    for (let i = 0; i < labels.length; i += step) labelIdx.push(i);
  }

  return (
    <View onLayout={onLayout}>
      {width > 0 && pointCount > 0 && (
        <>
          <View style={styles.legendRow}>
            {series.map((s) => (
              <View key={s.label} style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: s.color }]} />
                <Text style={[styles.legendText, { color: colors.textSecondary }]}>{s.label}</Text>
              </View>
            ))}
            <View style={{ flex: 1 }} />
            <Text style={[styles.legendText, { color: colors.textTertiary }]}>max {formatValue(maxVal)}</Text>
          </View>
          <Svg width={width} height={height}>
            {gridLines.map((g) => (
              <Line
                key={g}
                x1={padLeft}
                x2={padLeft + chartW}
                y1={padTop + chartH * (1 - g)}
                y2={padTop + chartH * (1 - g)}
                stroke={colors.borderLight}
                strokeWidth={1}
                strokeDasharray="3,4"
              />
            ))}
            {series.map((s) => (
              <Path key={`a-${s.label}`} d={areaPath(s.data)} fill={s.color} fillOpacity={0.12} />
            ))}
            {series.map((s) => (
              <Path key={`l-${s.label}`} d={linePath(s.data)} stroke={s.color} strokeWidth={2} fill="none" strokeLinejoin="round" strokeLinecap="round" />
            ))}
            {series.map((s) =>
              s.data.length <= 14
                ? s.data.map((v, i) => (
                    <Circle key={`p-${s.label}-${i}`} cx={x(i)} cy={y(v)} r={2.5} fill={s.color} />
                  ))
                : null
            )}
          </Svg>
          {labels && (
            <View style={styles.xLabels}>
              {labelIdx.map((i) => (
                <Text key={i} style={[styles.xLabelText, { color: colors.textTertiary }]}>
                  {labels[i]}
                </Text>
              ))}
            </View>
          )}
        </>
      )}
    </View>
  );
}

interface BarChartProps {
  data: number[];
  labels?: string[];
  color: string;
  height?: number;
  formatValue?: (n: number) => string;
}

export function BarChart({ data, labels, color, height = 140, formatValue = defaultFormat }: BarChartProps) {
  const { colors } = useTheme();
  const [width, setWidth] = useState(0);

  const onLayout = (e: LayoutChangeEvent) => setWidth(e.nativeEvent.layout.width);

  const maxVal = niceMax(Math.max(...data, 0));
  const padTop = 8;
  const padBottom = 4;
  const chartH = height - padTop - padBottom;
  const gap = 3;
  const barW = data.length > 0 ? Math.max((width - gap * (data.length - 1)) / data.length, 2) : 0;

  const labelIdx: number[] = [];
  if (labels && labels.length > 0) {
    const step = Math.max(1, Math.ceil(labels.length / 4));
    for (let i = 0; i < labels.length; i += step) labelIdx.push(i);
  }

  return (
    <View onLayout={onLayout}>
      {width > 0 && data.length > 0 && (
        <>
          <View style={styles.legendRow}>
            <View style={{ flex: 1 }} />
            <Text style={[styles.legendText, { color: colors.textTertiary }]}>max {formatValue(maxVal)}</Text>
          </View>
          <Svg width={width} height={height}>
            {data.map((v, i) => {
              const h = Math.max((v / maxVal) * chartH, v > 0 ? 2 : 0);
              return (
                <Rect
                  key={i}
                  x={i * (barW + gap)}
                  y={padTop + chartH - h}
                  width={barW}
                  height={h}
                  rx={Math.min(3, barW / 2)}
                  fill={color}
                  fillOpacity={0.85}
                />
              );
            })}
          </Svg>
          {labels && (
            <View style={styles.xLabels}>
              {labelIdx.map((i) => (
                <Text key={i} style={[styles.xLabelText, { color: colors.textTertiary }]}>
                  {labels[i]}
                </Text>
              ))}
            </View>
          )}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  legendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    marginBottom: Spacing.xs,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  legendText: {
    fontSize: FontSize.xs,
    fontWeight: '500',
  },
  xLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 2,
  },
  xLabelText: {
    fontSize: 10,
  },
});
