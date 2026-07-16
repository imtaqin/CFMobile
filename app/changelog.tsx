import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Icon } from '@/components/ui/icon';
import { useTheme } from '@/hooks/use-theme';
import { Spacing, FontSize, Radius } from '@/constants/theme';
import { CHANGELOG } from '@/services/changelog';
import { CURRENT_VERSION as APP_VERSION } from '@/services/version-check';

export default function ChangelogScreen() {
  const { t } = useTranslation();
  const { colors } = useTheme();

  return (
    <>
      <Stack.Screen options={{ title: t('changelog.title'), headerShown: true }} />
      <ScrollView
        style={[styles.container, { backgroundColor: colors.background }]}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>{t('changelog.whats_new')}</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            {t('changelog.subtitle', { version: APP_VERSION })}
          </Text>
        </View>

        {CHANGELOG.map((entry, idx) => (
          <View key={entry.version} style={styles.entry}>
            <View style={styles.entryHeader}>
              <View style={[styles.versionBadge, {
                backgroundColor: idx === 0 ? colors.primary : colors.surfaceSecondary,
              }]}>
                <Text style={[styles.versionText, {
                  color: idx === 0 ? '#FFF' : colors.text,
                }]}>
                  v{entry.version}
                </Text>
              </View>
              {idx === 0 && (
                <View style={[styles.latestPill, { backgroundColor: colors.success + '20' }]}>
                  <Text style={[styles.latestText, { color: colors.success }]}>{t('changelog.latest')}</Text>
                </View>
              )}
              <Text style={[styles.date, { color: colors.textTertiary }]}>{entry.date}</Text>
            </View>

            <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.borderLight }]}>
              {entry.highlights.length > 0 && (
                <>
                  <Text style={[styles.sectionLabel, { color: colors.textSecondary }]}>
                    {t('changelog.whats_new_section')}
                  </Text>
                  {entry.highlights.map((h, i) => (
                    <View key={i} style={styles.bulletRow}>
                      <View style={[styles.bullet, { backgroundColor: colors.primary }]} />
                      <Text style={[styles.bulletText, { color: colors.text }]}>{h}</Text>
                    </View>
                  ))}
                </>
              )}

              {entry.fixes && entry.fixes.length > 0 && (
                <>
                  <View style={[styles.divider, { backgroundColor: colors.borderLight }]} />
                  <Text style={[styles.sectionLabel, { color: colors.textSecondary }]}>
                    {t('changelog.fixes')}
                  </Text>
                  {entry.fixes.map((f, i) => (
                    <View key={i} style={styles.bulletRow}>
                      <Icon name="check-circle" size={14} color={colors.success} />
                      <Text style={[styles.bulletText, { color: colors.text }]}>{f}</Text>
                    </View>
                  ))}
                </>
              )}
            </View>
          </View>
        ))}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: Spacing.lg, paddingBottom: Spacing.xxxl, gap: Spacing.lg },
  header: {
    marginBottom: Spacing.sm,
  },
  title: {
    fontSize: FontSize.xxl,
    fontWeight: '800',
    letterSpacing: -0.3,
  },
  subtitle: {
    fontSize: FontSize.sm,
    marginTop: 4,
  },
  entry: {
    gap: Spacing.sm,
  },
  entryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  versionBadge: {
    paddingHorizontal: Spacing.md,
    paddingVertical: 4,
    borderRadius: Radius.full,
  },
  versionText: {
    fontSize: FontSize.sm,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
  latestPill: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: Radius.full,
  },
  latestText: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  date: {
    flex: 1,
    textAlign: 'right',
    fontSize: FontSize.xs,
    fontWeight: '500',
  },
  card: {
    padding: Spacing.lg,
    borderRadius: Radius.lg,
    borderWidth: 1,
    gap: Spacing.sm,
  },
  sectionLabel: {
    fontSize: FontSize.xs,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.sm,
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginTop: 8,
  },
  bulletText: {
    flex: 1,
    fontSize: FontSize.sm,
    lineHeight: 20,
  },
  divider: {
    height: 1,
    marginVertical: 4,
  },
});
