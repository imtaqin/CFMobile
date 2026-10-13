import { StyleSheet, View, Pressable } from 'react-native';
import Svg, { Defs, LinearGradient, Stop, Circle } from 'react-native-svg';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@/hooks/use-theme';
import { CF, Radius } from '@/constants/theme';
import { AI_ENABLED } from '@/constants/features';

/** The tab that gets the raised gradient button in the middle of the bar. */
const FEATURED_ROUTE = 'ai-chat';
const FEATURED_SIZE = 56;
const AI_PURPLE = '#8B5CF6';

/**
 * Floating pill tab bar: icon-only tabs, the active one filled with the accent.
 * The AI tab sits in the middle as a raised gradient circle. Labels are kept as
 * accessibility labels so screen readers still announce them.
 */
export function FloatingTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const { colors, isDark } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.wrap, { backgroundColor: colors.background, paddingBottom: Math.max(insets.bottom, 12) }]}>
      <View
        style={[
          styles.bar,
          {
            backgroundColor: colors.surface,
            borderColor: colors.borderLight,
            shadowColor: isDark ? '#000' : '#1A1A1E',
          },
        ]}
      >
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const focused = state.index === index;
          const featured = route.name === FEATURED_ROUTE;
          if (featured && !AI_ENABLED) return null;

          const onPress = () => {
            const event = navigation.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });
            if (!focused && !event.defaultPrevented) navigation.navigate(route.name, route.params);
          };

          const common = {
            accessibilityRole: 'button' as const,
            accessibilityState: focused ? { selected: true } : {},
            accessibilityLabel: typeof options.title === 'string' ? options.title : route.name,
            onPress,
            onLongPress: () => navigation.emit({ type: 'tabLongPress', target: route.key }),
            hitSlop: 6,
          };

          if (featured) {
            return (
              <Pressable
                key={route.key}
                {...common}
                style={({ pressed }) => [
                  styles.featured,
                  {
                    // Ring in the bar's own colour so the circle reads as cut into the pill.
                    borderColor: focused ? AI_PURPLE + '55' : colors.surface,
                    shadowColor: AI_PURPLE,
                    transform: [{ scale: pressed ? 0.94 : 1 }],
                  },
                ]}
              >
                <Svg width={FEATURED_SIZE - 6} height={FEATURED_SIZE - 6} style={StyleSheet.absoluteFill}>
                  <Defs>
                    <LinearGradient id="aiTab" x1="0" y1="0" x2="1" y2="1">
                      <Stop offset="0" stopColor={CF.orange} />
                      <Stop offset="1" stopColor={AI_PURPLE} />
                    </LinearGradient>
                  </Defs>
                  <Circle
                    cx={(FEATURED_SIZE - 6) / 2}
                    cy={(FEATURED_SIZE - 6) / 2}
                    r={(FEATURED_SIZE - 6) / 2}
                    fill="url(#aiTab)"
                  />
                </Svg>
                {options.tabBarIcon?.({ focused, color: '#FFFFFF', size: 24 })}
              </Pressable>
            );
          }

          return (
            <Pressable
              key={route.key}
              {...common}
              style={[styles.item, focused && { backgroundColor: colors.primary }]}
            >
              {options.tabBarIcon?.({
                focused,
                color: focused ? '#FFFFFF' : colors.textSecondary,
                size: 20,
              })}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: 'center',
    // Room for the featured button, which rises above the pill.
    paddingTop: 18,
  },
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    padding: 6,
    borderRadius: Radius.full,
    borderWidth: 1,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 4,
  },
  item: {
    width: 52,
    height: 40,
    borderRadius: Radius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  featured: {
    width: FEATURED_SIZE,
    height: FEATURED_SIZE,
    borderRadius: FEATURED_SIZE / 2,
    borderWidth: 3,
    marginHorizontal: 2,
    marginTop: -22,
    marginBottom: -6,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 8,
  },
});
