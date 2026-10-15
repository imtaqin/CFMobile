import { StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Icon } from '@/components/ui/icon';
import { useTheme } from '@/hooks/use-theme';
import { FontSize, Radius, Spacing } from '@/constants/theme';
import { FieldChange } from '@/services/change-history';

const LABEL_KEYS: Record<string, string> = {
  type: 'dns.type',
  name: 'dns.name',
  content: 'dns.content',
  ttl: 'dns.ttl',
  proxied: 'history.proxy',
  priority: 'dns.priority',
  comment: 'dns.comment',
};

/** Old value, arrow, new value for each changed field. Used before applying a change and in History. */
export function ChangeDiff({ changes }: { changes: FieldChange[] }) {
  const { t } = useTranslation();
  const { colors } = useTheme();

  const value = (v: string | null) => {
    if (v === null) return t('history.empty_value');
    if (v === 'on') return t('history.on');
    if (v === 'off') return t('history.off');
    if (v === 'auto') return t('history.auto');
    return v;
  };

  return (
    <View style={[styles.box, { backgroundColor: colors.surface, borderColor: colors.borderLight }]}>
      {changes.map((c, i) => (
        <View key={c.field} style={[styles.row, i > 0 && { borderTopWidth: 1, borderTopColor: colors.borderLight }]}>
          <Text style={[styles.label, { color: colors.textSecondary }]}>{t(c.label ?? LABEL_KEYS[c.field] ?? c.field)}</Text>
          <View style={styles.values}>
            {c.before !== null && (
              <Text style={[styles.before, { color: colors.textTertiary }]} selectable>{value(c.before)}</Text>
            )}
            {c.before !== null && c.after !== null && (
              <Icon name="chevron-down" size={14} color={colors.textTertiary} />
            )}
            {c.after !== null && (
              <Text style={[styles.after, { color: colors.text }]} selectable>{value(c.after)}</Text>
            )}
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  box: { borderWidth: 1, borderRadius: Radius.lg, overflow: 'hidden' },
  row: { paddingHorizontal: Spacing.lg, paddingVertical: Spacing.md, gap: Spacing.xs },
  label: { fontSize: FontSize.xs, fontWeight: '500' },
  values: { gap: 2 },
  before: { fontSize: FontSize.sm, textDecorationLine: 'line-through', fontFamily: 'monospace' },
  after: { fontSize: FontSize.md, fontFamily: 'monospace' },
});
