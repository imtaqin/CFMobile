import { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Vibration } from 'react-native';
import { Icon, IconName } from '@/components/ui/icon';
import { useTheme } from '@/hooks/use-theme';
import { FontSize, Radius, Spacing } from '@/constants/theme';
import { PIN_MAX } from '@/services/app-lock';

interface PinPadProps {
  title: string;
  /** Shown under the title in the error colour, e.g. a wrong PIN. */
  error?: string | null;
  /** Bump to signal another failed attempt even when the message is unchanged. */
  errorNonce?: number;
  /**
   * Submit on the last digit when the length is known (unlocking). Without it
   * the pad shows a confirm key instead (choosing a new PIN).
   */
  length?: number;
  minLength?: number;
  disabled?: boolean;
  onSubmit: (pin: string) => void;
  /** Optional key in the bottom-left corner, e.g. fingerprint unlock. */
  extraKey?: { icon: IconName; label: string; onPress: () => void };
}

const KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

/** Numeric keypad with dots for the digits typed so far. */
export function PinPad({ title, error, errorNonce, length, minLength = 4, disabled, onSubmit, extraKey }: PinPadProps) {
  const { colors } = useTheme();
  const [pin, setPin] = useState('');
  const dots = length ?? Math.max(minLength, pin.length);

  // A wrong PIN clears the dots so the next try starts fresh.
  useEffect(() => {
    if (error) {
      setPin('');
      Vibration.vibrate(80);
    }
  }, [error, errorNonce]);

  const press = (digit: string) => {
    if (disabled || pin.length >= (length ?? PIN_MAX)) return;
    const next = pin + digit;
    setPin(next);
    if (length && next.length === length) {
      onSubmit(next);
      setPin('');
    }
  };

  const confirm = () => {
    if (pin.length < minLength) return;
    onSubmit(pin);
    setPin('');
  };

  const key = (content: React.ReactNode, onPress: () => void, label: string, faded = false) => (
    <TouchableOpacity
      key={label}
      style={[styles.key, { backgroundColor: faded ? 'transparent' : colors.surface }]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.6}
      accessibilityRole="button"
      accessibilityLabel={label}
    >
      {content}
    </TouchableOpacity>
  );

  return (
    <View style={styles.wrap}>
      <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
      <Text style={[styles.error, { color: colors.error }]}>{error ?? ' '}</Text>
      <View style={styles.dots}>
        {Array.from({ length: dots }, (_, i) => (
          <View
            key={i}
            style={[
              styles.dot,
              { borderColor: colors.textSecondary },
              i < pin.length && { backgroundColor: colors.primary, borderColor: colors.primary },
            ]}
          />
        ))}
      </View>
      <View style={styles.grid}>
        {KEYS.map((d) => key(<Text style={[styles.digit, { color: colors.text }]}>{d}</Text>, () => press(d), d))}
        {extraKey
          ? key(<Icon name={extraKey.icon} size={26} color={colors.primary} />, extraKey.onPress, extraKey.label, true)
          : <View style={styles.key} />}
        {key(<Text style={[styles.digit, { color: colors.text }]}>0</Text>, () => press('0'), '0')}
        {length
          ? key(<Icon name="arrow-left" size={22} color={colors.textSecondary} />, () => setPin(pin.slice(0, -1)), 'Delete', true)
          : pin.length >= minLength
            ? key(<Icon name="check-circle" size={26} color={colors.primary} />, confirm, 'OK', true)
            : key(<Icon name="arrow-left" size={22} color={colors.textSecondary} />, () => setPin(pin.slice(0, -1)), 'Delete', true)}
      </View>
    </View>
  );
}

const KEY_SIZE = 72;

const styles = StyleSheet.create({
  wrap: { alignItems: 'center', gap: Spacing.sm },
  title: { fontSize: FontSize.lg, fontWeight: '600', textAlign: 'center' },
  error: { fontSize: FontSize.sm, minHeight: 18, textAlign: 'center' },
  dots: { flexDirection: 'row', gap: Spacing.md, marginVertical: Spacing.md },
  dot: { width: 14, height: 14, borderRadius: 7, borderWidth: 1.5 },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: KEY_SIZE * 3 + Spacing.lg * 2,
    gap: Spacing.lg,
    justifyContent: 'center',
  },
  key: {
    width: KEY_SIZE,
    height: KEY_SIZE,
    borderRadius: Radius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  digit: { fontSize: 28, fontWeight: '400' },
});
