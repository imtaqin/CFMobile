import { useEffect, useState, useCallback } from 'react';
import {
  StyleSheet, View, Text, ScrollView, RefreshControl, TouchableOpacity,
} from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Icon } from '@/components/ui/icon';
import { useTheme } from '@/hooks/use-theme';
import { Card } from '@/components/ui/card';
import { Loading } from '@/components/ui/loading';
import { EmptyState } from '@/components/ui/empty-state';
import { SectionHeader } from '@/components/ui/section-header';
import { Spacing, FontSize, Radius } from '@/constants/theme';
import * as api from '@/services/cloudflare';
import { GraphQLAnalytics } from '@/services/cloudflare';

type Range = '1d' | '7d' | '30d';

function formatNumber(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return String(n);
}

function formatBytes(bytes: number): string {
  if (bytes >= 1_073_741_824) return `${(bytes / 1_073_741_824).toFixed(1)} GB`;
  if (bytes >= 1_048_576) return `${(bytes / 1_048_576).toFixed(1)} MB`;
  if (bytes >= 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${bytes} B`;
}

function getDateRange(range: Range): { start: string; end: string } {
  const now = new Date();
  const end = now.toISOString().split('T')[0]; // today YYYY-MM-DD
  const start = new Date(now);
  if (range === '1d') start.setDate(start.getDate() - 1);
  else if (range === '7d') start.setDate(start.getDate() - 7);
  else start.setDate(start.getDate() - 30);
  return { start: start.toISOString().split('T')[0], end };
}

export default function AnalyticsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { t } = useTranslation();
  const { colors } = useTheme();

  const [data, setData] = useState<GraphQLAnalytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [range, setRange] = useState<Range>('7d');
  const [error, setError] = useState<string | null>(null);

  const fetchAnalytics = useCallback(async () => {
    setError(null);
    try {
      const { start, end } = getDateRange(range);
      const result = await api.getZoneAnalytics(id, start, end);
      setData(result);
    } catch (e: any) {
      const gqlErrors = e?.response?.data?.errors;
      const msg = gqlErrors?.[0]?.message
        ?? e?.response?.data?.errors?.[0]?.message
        ?? e?.message
        ?? 'Failed to load analytics';
      console.log('[CF] Analytics error:', e?.response?.data ?? e?.message);
      setError(msg);
    }
    setLoading(false);
    setRefreshing(false);
  }, [id, range]);

  useEffect(() => { setLoading(true); fetchAnalytics(); }, [fetchAnalytics]);

  if (loading) return <Loading />;

  const totals = data?.totals;
  const hasData = totals && totals.requests.all > 0;
  const cacheHitRate = totals?.requests.all
    ? Math.round((totals.requests.cached / totals.requests.all) * 100)
    : 0;
  const bandwidthSaved = totals?.bandwidth.all
    ? Math.round((totals.bandwidth.cached / totals.bandwidth.all) * 100)
    : 0;

  return (
    <>
      <Stack.Screen options={{ title: t('analytics.title') }} />
      <ScrollView
        style={[styles.container, { backgroundColor: colors.background }]}
        contentContainerStyle={styles.content}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); fetchAnalytics(); }} tintColor={colors.primary} />}
      >
        {/* Time Range Selector */}
        <View style={styles.rangeRow}>
          {(['1d', '7d', '30d'] as Range[]).map((r) => (
            <TouchableOpacity
              key={r}
              onPress={() => setRange(r)}
              style={[
                styles.rangeChip,
                {
                  backgroundColor: range === r ? colors.primary : colors.surface,
                  borderColor: range === r ? colors.primary : colors.border,
                },
              ]}
            >
              <Text style={{
                fontSize: FontSize.sm,
                fontWeight: '600',
                color: range === r ? '#FFF' : colors.text,
              }}>
                {r}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Error Banner */}
        {error && (
          <Card style={[styles.errorCard, { borderColor: colors.error }]}>
            <Icon name="error-circle" size={20} color={colors.error} />
            <Text style={[styles.errorText, { color: colors.error }]}>{error}</Text>
          </Card>
        )}

        {/* No data state */}
        {!error && !hasData && (
          <EmptyState
            icon="chart-line"
            title={t('analytics.no_data')}
            message={t('analytics.no_data_message')}
          />
        )}

        {/* Requests */}
        {(hasData || (totals && !error)) && (
          <>
            <SectionHeader title={t('analytics.requests')} />
            <View style={styles.statsGrid}>
              <Card style={styles.statCard}>
                <Icon name="globe" size={24} color={colors.info} />
                <Text style={[styles.statNumber, { color: colors.text }]}>{formatNumber(totals?.requests.all ?? 0)}</Text>
                <Text style={[styles.statLabel, { color: colors.textSecondary }]}>{t('analytics.total')}</Text>
              </Card>
              <Card style={styles.statCard}>
                <Icon name="check-circle" size={24} color={colors.success} />
                <Text style={[styles.statNumber, { color: colors.text }]}>{formatNumber(totals?.requests.cached ?? 0)}</Text>
                <Text style={[styles.statLabel, { color: colors.textSecondary }]}>{t('analytics.cached')}</Text>
              </Card>
              <Card style={styles.statCard}>
                <Icon name="download" size={24} color={colors.warning} />
                <Text style={[styles.statNumber, { color: colors.text }]}>{formatNumber(totals?.requests.uncached ?? 0)}</Text>
                <Text style={[styles.statLabel, { color: colors.textSecondary }]}>{t('analytics.uncached')}</Text>
              </Card>
            </View>

            {/* Cache Hit Rate */}
            <Card style={styles.rateCard}>
              <Text style={[styles.rateTitle, { color: colors.text }]}>{t('analytics.cache_hit_rate')}</Text>
              <View style={[styles.rateBar, { backgroundColor: colors.surfaceSecondary }]}>
                <View style={[styles.rateBarFill, { width: `${cacheHitRate}%`, backgroundColor: colors.success }]} />
              </View>
              <Text style={[styles.rateValue, { color: colors.success }]}>{cacheHitRate}%</Text>
            </Card>

            {/* Bandwidth */}
            <SectionHeader title={t('analytics.bandwidth')} />
            <View style={styles.statsGrid}>
              <Card style={styles.statCard}>
                <Text style={[styles.statNumber, { color: colors.text }]}>{formatBytes(totals?.bandwidth.all ?? 0)}</Text>
                <Text style={[styles.statLabel, { color: colors.textSecondary }]}>{t('analytics.total')}</Text>
              </Card>
              <Card style={styles.statCard}>
                <Text style={[styles.statNumber, { color: colors.text }]}>{formatBytes(totals?.bandwidth.cached ?? 0)}</Text>
                <Text style={[styles.statLabel, { color: colors.textSecondary }]}>{t('analytics.cached')}</Text>
              </Card>
            </View>

            {/* Bandwidth Saved */}
            <Card style={styles.rateCard}>
              <Text style={[styles.rateTitle, { color: colors.text }]}>{t('analytics.bandwidth_saved')}</Text>
              <View style={[styles.rateBar, { backgroundColor: colors.surfaceSecondary }]}>
                <View style={[styles.rateBarFill, { width: `${bandwidthSaved}%`, backgroundColor: colors.info }]} />
              </View>
              <Text style={[styles.rateValue, { color: colors.info }]}>{bandwidthSaved}%</Text>
            </Card>

            {/* Security */}
            <SectionHeader title={t('analytics.security')} />
            <View style={styles.statsGrid}>
              <Card style={styles.statCard}>
                <Icon name="shield" size={24} color={colors.error} />
                <Text style={[styles.statNumber, { color: colors.text }]}>{formatNumber(totals?.threats.all ?? 0)}</Text>
                <Text style={[styles.statLabel, { color: colors.textSecondary }]}>{t('analytics.threats')}</Text>
              </Card>
              <Card style={styles.statCard}>
                <Icon name="pageview" size={24} color={colors.info} />
                <Text style={[styles.statNumber, { color: colors.text }]}>{formatNumber(totals?.pageviews.all ?? 0)}</Text>
                <Text style={[styles.statLabel, { color: colors.textSecondary }]}>{t('analytics.pageviews')}</Text>
              </Card>
              <Card style={styles.statCard}>
                <Icon name="users" size={24} color="#9333EA" />
                <Text style={[styles.statNumber, { color: colors.text }]}>{formatNumber(totals?.uniques.all ?? 0)}</Text>
                <Text style={[styles.statLabel, { color: colors.textSecondary }]}>{t('analytics.unique_visitors')}</Text>
              </Card>
            </View>
          </>
        )}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: Spacing.lg, paddingBottom: Spacing.xxxl },
  rangeRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginBottom: Spacing.lg,
  },
  rangeChip: {
    flex: 1,
    paddingVertical: Spacing.sm,
    borderRadius: Radius.md,
    borderWidth: 1,
    alignItems: 'center',
  },
  errorCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    borderWidth: 1,
    marginBottom: Spacing.md,
  },
  errorText: { flex: 1, fontSize: FontSize.sm },
  statsGrid: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },
  statCard: {
    flex: 1,
    alignItems: 'center' as const,
    gap: Spacing.xs,
    paddingVertical: Spacing.md,
  },
  statNumber: { fontSize: FontSize.xl, fontWeight: '700' },
  statLabel: { fontSize: FontSize.xs },
  rateCard: {
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },
  rateTitle: { fontSize: FontSize.md, fontWeight: '500' },
  rateBar: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  rateBarFill: {
    height: '100%',
    borderRadius: 4,
  },
  rateValue: { fontSize: FontSize.xxl, fontWeight: '700' },
});
