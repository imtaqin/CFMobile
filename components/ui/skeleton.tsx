import { useEffect, useRef } from 'react';
import { Animated, Easing, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { useTheme } from '@/hooks/use-theme';
import { Radius, Spacing } from '@/constants/theme';

/**
 * Placeholder shapes for a screen that is still loading.
 *
 * A spinner on an empty canvas says "wait"; a skeleton says "this is what is
 * coming", and the screen does not jump when the data lands. Built on the
 * React Native `Animated` API rather than Reanimated: one looping opacity on
 * a handful of blocks needs nothing more, and it keeps these parts free of
 * worklets.
 */

/** One pulsing block. Everything else here is made of these. */
export function Skeleton({ width, height = 14, radius = Radius.sm, style }: {
  width?: number | `${number}%`;
  height?: number;
  radius?: number;
  style?: StyleProp<ViewStyle>;
}) {
  const { colors } = useTheme();
  const pulse = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 1, duration: 650, easing: Easing.inOut(Easing.quad), useNativeDriver: true }),
        Animated.timing(pulse, { toValue: 0, duration: 650, easing: Easing.inOut(Easing.quad), useNativeDriver: true }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [pulse]);

  return (
    <Animated.View
      // Decorative: a screen reader should announce the loading state once,
      // from the screen, not once per block.
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
      style={[
        {
          width,
          height,
          borderRadius: radius,
          backgroundColor: colors.surfaceSecondary,
          opacity: pulse.interpolate({ inputRange: [0, 1], outputRange: [0.45, 1] }),
        },
        style,
      ]}
    />
  );
}

/** The card the real rows will sit in, with a circle and two lines each. */
export function SkeletonRows({ count = 4, avatar = true }: { count?: number; avatar?: boolean }) {
  const { colors } = useTheme();
  return (
    <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.borderLight }]}>
      {Array.from({ length: count }).map((_, i) => (
        <View
          key={i}
          style={[styles.row, i > 0 && { borderTopWidth: 1, borderTopColor: colors.borderLight }]}
        >
          {avatar && <Skeleton width={36} height={36} radius={18} />}
          <View style={styles.rowBody}>
            {/* Staggered widths read as text, not as a table. */}
            <Skeleton width={i % 3 === 0 ? '62%' : i % 3 === 1 ? '48%' : '55%'} height={13} />
            <Skeleton width={i % 2 === 0 ? '38%' : '44%'} height={11} />
          </View>
        </View>
      ))}
    </View>
  );
}

/** A row of number cards, the shape of `StatCard`. */
export function SkeletonStats({ count = 3 }: { count?: number }) {
  const { colors } = useTheme();
  return (
    <View style={styles.statsRow}>
      {Array.from({ length: count }).map((_, i) => (
        <View
          key={i}
          style={[styles.stat, { backgroundColor: colors.surface, borderColor: colors.borderLight }]}
        >
          <Skeleton width={34} height={22} />
          <Skeleton width="70%" height={10} />
        </View>
      ))}
    </View>
  );
}

/** The two-column tile grid used by the dashboard and the zone screen. */
export function SkeletonTiles({ count = 6 }: { count?: number }) {
  const { colors } = useTheme();
  return (
    <View style={styles.tileGrid}>
      {Array.from({ length: count }).map((_, i) => (
        <View
          key={i}
          style={[styles.tile, { backgroundColor: colors.surface, borderColor: colors.borderLight }]}
        >
          <Skeleton width={34} height={34} radius={17} />
          <Skeleton width="58%" height={12} />
        </View>
      ))}
    </View>
  );
}

/** Stands in for a `SectionHeader` so sections do not shift when they arrive. */
export function SkeletonHeading({ width = 110 }: { width?: number }) {
  return <Skeleton width={width} height={15} style={{ marginTop: Spacing.lg, marginBottom: Spacing.sm, marginLeft: Spacing.xs }} />;
}

const styles = StyleSheet.create({
  card: { borderWidth: 1, borderRadius: Radius.lg, overflow: 'hidden' },
  row: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md, padding: Spacing.md, minHeight: 60 },
  rowBody: { flex: 1, gap: 7 },

  statsRow: { flexDirection: 'row', gap: Spacing.sm },
  stat: {
    flex: 1,
    gap: 8,
    padding: Spacing.md,
    borderWidth: 1,
    borderRadius: Radius.lg,
    minHeight: 72,
    justifyContent: 'center',
  },

  tileGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm },
  tile: {
    flexBasis: '47%',
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    minHeight: 96,
    paddingVertical: Spacing.md,
    borderWidth: 1,
    borderRadius: Radius.lg,
  },
});
