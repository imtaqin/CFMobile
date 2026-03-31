import { StyleSheet, View, Text } from 'react-native';
import { Radius, Spacing, FontSize } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

interface BadgeProps {
  label: string;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
}

export function Badge({ label, variant = 'default' }: BadgeProps) {
  const { colors } = useTheme();

  const bgMap: Record<string, string> = {
    default: colors.badge,
    success: colors.statusActive + '20',
    warning: colors.statusPending + '20',
    error: colors.statusError + '20',
    info: colors.info + '20',
  };

  const textMap: Record<string, string> = {
    default: colors.badgeText,
    success: colors.statusActive,
    warning: colors.statusPending,
    error: colors.statusError,
    info: colors.info,
  };

  return (
    <View style={[styles.badge, { backgroundColor: bgMap[variant] }]}>
      <Text style={[styles.text, { color: textMap[variant] }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: Radius.full,
    alignSelf: 'flex-start',
  },
  text: {
    fontSize: FontSize.xs,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
});
