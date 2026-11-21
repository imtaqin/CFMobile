import { useEffect, useState, useCallback } from 'react';
import { StyleSheet, View, Text, ScrollView, RefreshControl } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/hooks/use-theme';
import { Card } from '@/components/ui/card';
import { EmptyState } from '@/components/ui/empty-state';
import { Skeleton, SkeletonStats, SkeletonHeading } from '@/components/ui/skeleton';
import { SectionHeader } from '@/components/ui/section-header';
import { Banner, ChipRow, StatCard } from '@/components/ui/kit';
import { LineChart, BarChart } from '@/components/ui/chart';
import { Spacing, FontSize } from '@/constants/theme';
import * as api from '@/services/cloudflare';
import { GraphQLAnalytics } from '@/services/cloudflare';

type Range = '1d' | '7d' | '30d';

const RANGES: Range[] = ['1d', '7d', '30d'];

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

  if (loading) {
    return (
      <>
        <Stack.Screen options={{ title: t('analytics.title') }} />
        <ScrollView
          style={[styles.container, { backgroundColor: colors.background }]}
          contentContainerStyle={styles.content}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
          accessibilityLabel={t('common.loading')}
        >
          <Skeleton width={160} height={32} radius={16} />
          <SkeletonHeading />
          <SkeletonStats count={3} />
          <Skeleton height={180} style={{ marginTop: Spacing.sm, borderRadius: 16 }} />
          <SkeletonHeading />
          <SkeletonStats count={2} />
          <Skeleton height={180} style={{ marginTop: Spacing.sm, borderRadius: 16 }} />
          <SkeletonHeading />
          <SkeletonStats count={3} />
        </ScrollView>
      </>
    );
  }

  const totals = data?.totals;
  const hasData = totals && totals.requests.all > 0;
  const cacheHitRate = totals?.requests.all
    ? Math.round((totals.requests.cached / totals.requests.all) * 100)
    : 0;
  const bandwidthSaved = totals?.bandwidth.all
    ? Math.round((totals.bandwidth.cached / totals.bandwidth.all) * 100)
    : 0;

  const ts = data?.timeseries ?? [];
  const chartLabels = ts.map((p) => p.date.slice(5)); // MM-DD

  // A share of the total: title, large number, thin bar.
  const rate = (title: string, percent: number, barColor: string) => (
    <Card style={styles.block}>
      <Text style={[styles.cardTitle, { color: colors.text }]}>{title}</Text>
      <Text style={[styles.rateValue, { color: colors.text }]}>{percent}%</Text>
      <View style={[styles.rateBar, { backgroundColor: colors.surfaceSecondary }]}>
        <View style={[styles.rateBarFill, { width: `${percent}%`, backgroundColor: barColor }]} />
      </View>
    </Card>
  );

  return (
    <>
      <Stack.Screen options={{ title: t('analytics.title') }} />
      <ScrollView
        style={[styles.container, { backgroundColor: colors.background }]}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); fetchAnalytics(); }} tintColor={colors.primary} />}
      >
        {/* Time range */}
        <ChipRow
          options={RANGES.map((r) => ({ value: r, label: r }))}
          value={range}
          onChange={setRange}
        />

        {error && (
          <View style={styles.errorWrap}>
            <Banner message={error} />
          </View>
        )}

        {/* No data state */}
        {!error && !hasData && (
          <EmptyState
            icon="chart-line"
            title={t('analytics.no_data')}
            message={t('analytics.no_data_message')}
          />
        )}

        {(hasData || (totals && !error)) && (
          <>
            {/* Requests */}
            <SectionHeader title={t('analytics.requests')} />
            <View style={styles.statsRow}>
              <StatCard label={t('analytics.total')} value={formatNumber(totals?.requests.all ?? 0)} />
              <StatCard label={t('analytics.cached')} value={formatNumber(totals?.requests.cached ?? 0)} />
              <StatCard label={t('analytics.uncached')} value={formatNumber(totals?.requests.uncached ?? 0)} />
            </View>

            {ts.length > 1 && (
              <Card style={styles.block}>
                <Text style={[styles.cardTitle, { color: colors.text }]}>{t('analytics.requests_over_time')}</Text>
                <LineChart
                  labels={chartLabels}
                  series={[
                    { label: t('analytics.total'), color: colors.info, data: ts.map((p) => p.requests) },
                    { label: t('analytics.cached'), color: colors.success, data: ts.map((p) => p.cachedRequests) },
                  ]}
                />
              </Card>
            )}

            {rate(t('analytics.cache_hit_rate'), cacheHitRate, colors.success)}

            {/* Bandwidth */}
            <SectionHeader title={t('analytics.bandwidth')} />
            <View style={styles.statsRow}>
              <StatCard label={t('analytics.total')} value={formatBytes(totals?.bandwidth.all ?? 0)} />
              <StatCard label={t('analytics.cached')} value={formatBytes(totals?.bandwidth.cached ?? 0)} />
            </View>

            {ts.length > 1 && (
              <Card style={styles.block}>
                <Text style={[styles.cardTitle, { color: colors.text }]}>{t('analytics.bandwidth_over_time')}</Text>
                <LineChart
                  labels={chartLabels}
                  formatValue={formatBytes}
                  series={[
                    { label: t('analytics.total'), color: colors.info, data: ts.map((p) => p.bytes) },
                    { label: t('analytics.cached'), color: colors.success, data: ts.map((p) => p.cachedBytes) },
                  ]}
                />
              </Card>
            )}

            {rate(t('analytics.bandwidth_saved'), bandwidthSaved, colors.success)}

            {/* Security and visitors */}
            <SectionHeader title={t('analytics.security')} />
            <View style={styles.statsRow}>
              <StatCard label={t('analytics.threats')} value={formatNumber(totals?.threats.all ?? 0)} />
              <StatCard label={t('analytics.pageviews')} value={formatNumber(totals?.pageviews.all ?? 0)} />
              <StatCard label={t('analytics.unique_visitors')} value={formatNumber(totals?.uniques.all ?? 0)} />
            </View>

            {ts.length > 1 && (
              <Card style={styles.block}>
                <Text style={[styles.cardTitle, { color: colors.text }]}>{t('analytics.threats_over_time')}</Text>
                <BarChart
                  labels={chartLabels}
                  color={colors.error}
                  data={ts.map((p) => p.threats)}
                />
              </Card>
            )}

            {ts.length > 1 && (
              <Card style={styles.block}>
                <Text style={[styles.cardTitle, { color: colors.text }]}>{t('analytics.visitors_over_time')}</Text>
                <BarChart
                  labels={chartLabels}
                  color={colors.info}
                  data={ts.map((p) => p.uniques)}
                />
              </Card>
            )}
          </>
        )}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: Spacing.lg, paddingBottom: Spacing.xxxl },
  errorWrap: { marginTop: Spacing.lg },
  statsRow: { flexDirection: 'row', gap: Spacing.sm },
  block: { gap: Spacing.sm, marginTop: Spacing.sm },
  cardTitle: { fontSize: FontSize.md, fontWeight: '500' },
  rateValue: { fontSize: 26, fontWeight: '400', letterSpacing: -0.5 },
  rateBar: { height: 6, borderRadius: 3, overflow: 'hidden' },
  rateBarFill: { height: '100%', borderRadius: 3 },
});
