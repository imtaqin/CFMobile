import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, Linking, RefreshControl, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';
import { useTranslation } from 'react-i18next';

import { Icon } from '@/components/ui/icon';
import { useTheme, ThemeColors } from '@/hooks/use-theme';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Loading } from '@/components/ui/loading';
import { EmptyState } from '@/components/ui/empty-state';
import { Sheet } from '@/components/ui/sheet';
import { LineChart } from '@/components/ui/chart';
import { Banner, ChipRow, Fab, Field, FieldLabel } from '@/components/ui/kit';
import { FontSize, Radius, Spacing } from '@/constants/theme';
import * as api from '@/services/cloudflare';
import type {
  ObservatoryDevice, ObservatoryFrequency, ObservatoryPage, ObservatoryRegion, ObservatoryReport, ObservatoryTest,
} from '@/services/cloudflare';

const errMsg = (e: any) => e?.response?.data?.errors?.[0]?.message ?? e?.message;

// The score ring reports state: good / needs work / poor.
function scoreColor(score: number | undefined, colors: ThemeColors): string {
  if (score === undefined || score === null) return colors.textTertiary;
  if (score >= 90) return colors.success;
  if (score >= 50) return colors.warning;
  return colors.error;
}

function formatMs(ms: number | undefined): string {
  if (ms === undefined || ms === null) return '—';
  if (ms >= 1000) return `${(ms / 1000).toFixed(1)}s`;
  return `${Math.round(ms)}ms`;
}

const report = (test: ObservatoryTest | undefined, device: ObservatoryDevice): ObservatoryReport | undefined =>
  device === 'MOBILE' ? test?.mobileReport : test?.desktopReport;

function Score({ value, size = 46 }: { value: number | undefined; size?: number }) {
  const { colors } = useTheme();
  const tint = scoreColor(value, colors);
  return (
    <View style={[styles.score, { width: size, height: size, borderRadius: size / 2, borderColor: tint }]}>
      <Text style={[styles.scoreText, { color: tint }]}>{value ?? '—'}</Text>
    </View>
  );
}

function Metrics({ r }: { r: ObservatoryReport }) {
  const { colors } = useTheme();
  const items: [string, string][] = [
    ['FCP', formatMs(r.fcp)], ['LCP', formatMs(r.lcp)], ['CLS', r.cls === undefined ? '—' : r.cls.toFixed(2)],
    ['TBT', formatMs(r.tbt)], ['SI', formatMs(r.si)], ['TTFB', formatMs(r.ttfb)],
  ];
  return (
    <View style={[styles.metricsRow, { borderTopColor: colors.borderLight }]}>
      {items.map(([label, value]) => (
        <View key={label} style={styles.metric}>
          <Text style={[styles.metricValue, { color: colors.text }]} numberOfLines={1}>{value}</Text>
          <Text style={[styles.metricLabel, { color: colors.textTertiary }]}>{label}</Text>
        </View>
      ))}
    </View>
  );
}

export default function ObservatoryScreen() {
  const { id: zoneId } = useLocalSearchParams<{ id: string }>();
  const { t } = useTranslation();
  const { colors } = useTheme();

  const [pages, setPages] = useState<ObservatoryPage[]>([]);
  const [regions, setRegions] = useState<ObservatoryRegion[]>([]);
  const [quota, setQuota] = useState<{ remainingTests?: number; remainingSchedules?: number } | null>(null);
  const [zoneName, setZoneName] = useState('');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // New test sheet
  const [adding, setAdding] = useState(false);
  const [newUrl, setNewUrl] = useState('');
  const [newRegion, setNewRegion] = useState('');
  const [running, setRunning] = useState(false);

  // Page detail sheet
  const [open, setOpen] = useState<ObservatoryPage | null>(null);
  const [device, setDevice] = useState<ObservatoryDevice>('MOBILE');
  const [history, setHistory] = useState<ObservatoryTest[] | null>(null);
  const [trend, setTrend] = useState<number[] | null>(null);
  const [busy, setBusy] = useState(false);

  const fetchAll = useCallback(async () => {
    try {
      const [pagesRes, availRes, zoneRes] = await Promise.allSettled([
        api.getObservatoryPages(zoneId),
        api.getObservatoryAvailabilities(zoneId),
        api.getZone(zoneId),
      ]);
      if (pagesRes.status === 'fulfilled') {
        setPages(pagesRes.value.result ?? []);
        setError(null);
      } else {
        setError(errMsg(pagesRes.reason));
      }
      if (availRes.status === 'fulfilled') {
        const a = availRes.value.result;
        setRegions(a?.regions ?? []);
        setQuota(a?.quota ?? null);
      }
      if (zoneRes.status === 'fulfilled') setZoneName(zoneRes.value.result?.name ?? '');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [zoneId]);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  // While any test is still running, look again every 15 seconds.
  const anyRunning = pages.some((p) => [p.tests?.[0]?.mobileReport, p.tests?.[0]?.desktopReport].some((r) => r?.state === 'RUNNING'));
  useEffect(() => {
    if (!anyRunning) return;
    const timer = setInterval(fetchAll, 15000);
    return () => clearInterval(timer);
  }, [anyRunning, fetchAll]);

  const openAdd = () => {
    setNewUrl(zoneName ? `${zoneName}/` : '');
    setNewRegion(regions[0]?.value ?? '');
    setAdding(true);
  };

  const runTest = async (url: string, region?: string) => {
    const clean = url.trim().replace(/^https?:\/\//, '');
    if (!clean) return;
    setRunning(true);
    try {
      await api.runObservatoryTest(zoneId, clean, region || undefined);
      setAdding(false);
      await fetchAll();
    } catch (e: any) {
      Alert.alert(t('common.error'), errMsg(e) ?? t('obs.run_error'));
    } finally {
      setRunning(false);
    }
  };

  const loadDetail = useCallback(async (page: ObservatoryPage, dev: ObservatoryDevice) => {
    setHistory(null);
    setTrend(null);
    const start = new Date(Date.now() - 30 * 86400_000).toISOString();
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';
    const [hist, tr] = await Promise.allSettled([
      api.getObservatoryTests(zoneId, page.url, { region: page.region?.value, per_page: 10 }),
      api.getObservatoryTrend(zoneId, page.url, {
        region: page.region?.value, deviceType: dev, start, tz, metrics: 'performanceScore',
      }),
    ]);
    setHistory(hist.status === 'fulfilled' ? hist.value.result ?? [] : []);
    setTrend(tr.status === 'fulfilled' ? (tr.value.result?.performanceScore ?? []).filter((n) => typeof n === 'number') : []);
  }, [zoneId]);

  const openPage = (page: ObservatoryPage) => {
    setOpen(page);
    loadDetail(page, device);
  };

  const switchDevice = (dev: ObservatoryDevice) => {
    setDevice(dev);
    if (open) loadDetail(open, dev);
  };

  const setSchedule = async (frequency: ObservatoryFrequency | 'OFF') => {
    if (!open) return;
    setBusy(true);
    try {
      if (frequency === 'OFF') await api.deleteObservatorySchedule(zoneId, open.url, open.region?.value);
      else await api.createObservatorySchedule(zoneId, open.url, open.region?.value, frequency);
      const next = { ...open, scheduleFrequency: frequency === 'OFF' ? undefined : frequency };
      setOpen(next);
      setPages((prev) => prev.map((p) => (p.url === open.url && p.region?.value === open.region?.value ? next : p)));
    } catch (e: any) {
      Alert.alert(t('common.error'), errMsg(e));
    } finally {
      setBusy(false);
    }
  };

  const confirmDelete = () => {
    if (!open) return;
    Alert.alert(t('obs.delete_title'), t('obs.delete_confirm', { url: open.url }), [
      { text: t('common.cancel'), style: 'cancel' },
      {
        text: t('common.delete'),
        style: 'destructive',
        onPress: async () => {
          try {
            await api.deleteObservatoryTests(zoneId, open.url, open.region?.value);
            await api.deleteObservatorySchedule(zoneId, open.url, open.region?.value).catch(() => {});
            setOpen(null);
            await fetchAll();
          } catch (e: any) {
            Alert.alert(t('common.error'), errMsg(e) ?? t('obs.delete_error'));
          }
        },
      },
    ]);
  };

  const renderPage = ({ item }: { item: ObservatoryPage }) => {
    const latest = item.tests?.[0];
    const r = report(latest, device) ?? latest?.mobileReport ?? latest?.desktopReport;
    return (
      <TouchableOpacity activeOpacity={0.8} onPress={() => openPage(item)}>
        <Card style={styles.pageCard}>
          <View style={styles.pageHeader}>
            {r?.state === 'RUNNING'
              ? <View style={styles.spinner}><ActivityIndicator color={colors.primary} /></View>
              : <Score value={r?.performanceScore} />}
            <View style={styles.pageBody}>
              <Text style={[styles.pageUrl, { color: colors.text }]} numberOfLines={1}>{item.url}</Text>
              <Text style={[styles.pageMeta, { color: colors.textSecondary }]} numberOfLines={1}>
                {item.region?.label ?? '—'}
                {item.scheduleFrequency ? ` · ${t(item.scheduleFrequency === 'DAILY' ? 'obs.daily' : 'obs.weekly')}` : ''}
                {latest?.date ? ` · ${new Date(latest.date).toLocaleDateString()}` : ''}
              </Text>
            </View>
            <Icon name="chevron-right" size={16} color={colors.textTertiary} />
          </View>
          {r?.state === 'COMPLETE' && <Metrics r={r} />}
          {r?.state === 'FAILED' && (
            <Text style={[styles.failed, { color: colors.error }]}>{r.error?.detail ?? r.error?.code ?? t('obs.failed')}</Text>
          )}
        </Card>
      </TouchableOpacity>
    );
  };

  if (loading) return <Loading />;

  const latest = open?.tests?.[0];
  const openReport = report(latest, device);

  return (
    <>
      <Stack.Screen options={{ title: t('obs.title') }} />
      <FlatList
        data={pages}
        keyExtractor={(item) => `${item.url}|${item.region?.value}`}
        renderItem={renderPage}
        contentContainerStyle={styles.list}
        style={{ backgroundColor: colors.background }}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); fetchAll(); }} tintColor={colors.primary} />}
        ListHeaderComponent={
          <View style={styles.header}>
            {!!error && <Banner message={error} />}
            <ChipRow
              options={[{ value: 'MOBILE', label: t('obs.mobile') }, { value: 'DESKTOP', label: t('obs.desktop') }]}
              value={device}
              onChange={(v) => setDevice(v as ObservatoryDevice)}
            />
            {quota?.remainingTests !== undefined && (
              <Text style={[styles.quota, { color: colors.textSecondary }]}>
                {t('obs.quota', { tests: quota.remainingTests, schedules: quota.remainingSchedules ?? 0 })}
              </Text>
            )}
          </View>
        }
        ListEmptyComponent={<EmptyState icon="chart-line" title={t('obs.no_pages')} message={t('obs.no_pages_message')} />}
      />
      <Fab label={t('obs.test_page')} icon="plus" onPress={openAdd} />

      {/* New test */}
      <Sheet
        visible={adding}
        onClose={() => setAdding(false)}
        title={t('obs.test_page')}
        footer={<Button title={t('obs.run')} onPress={() => runTest(newUrl, newRegion)} loading={running} size="lg" />}
      >
        <Field
          label={t('obs.url')}
          value={newUrl}
          onChangeText={setNewUrl}
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="url"
          placeholder="example.com/"
          hint={t('obs.url_hint')}
        />
        {regions.length > 0 && (
          <>
            <FieldLabel>{t('obs.region')}</FieldLabel>
            <ChipRow wrap options={regions.map((r) => ({ value: r.value, label: r.label }))} value={newRegion} onChange={setNewRegion} />
          </>
        )}
        <Text style={[styles.note, { color: colors.textSecondary }]}>{t('obs.run_note')}</Text>
      </Sheet>

      {/* Page detail */}
      <Sheet visible={!!open} onClose={() => setOpen(null)} title={open?.url}>
        {open && (
          <View style={styles.detail}>
            <ChipRow
              options={[{ value: 'MOBILE', label: t('obs.mobile') }, { value: 'DESKTOP', label: t('obs.desktop') }]}
              value={device}
              onChange={(v) => switchDevice(v as ObservatoryDevice)}
            />
            <View style={styles.detailTop}>
              <Score value={openReport?.performanceScore} size={64} />
              <View style={styles.pageBody}>
                <Text style={[styles.pageMeta, { color: colors.textSecondary }]}>{open.region?.label}</Text>
                <Text style={[styles.pageMeta, { color: colors.textSecondary }]}>
                  {latest?.date ? new Date(latest.date).toLocaleString() : t('obs.no_tests')}
                </Text>
              </View>
            </View>
            {openReport?.state === 'COMPLETE' && <Metrics r={openReport} />}
            {!!openReport?.jsonReportUrl && (
              <TouchableOpacity onPress={() => Linking.openURL(openReport.jsonReportUrl!)}>
                <Text style={[styles.link, { color: colors.primary }]}>{t('obs.full_report')}</Text>
              </TouchableOpacity>
            )}

            <FieldLabel>{t('obs.trend')}</FieldLabel>
            {trend === null ? <ActivityIndicator color={colors.primary} /> : trend.length > 1 ? (
              <LineChart series={[{ label: t('obs.score'), color: colors.primary, data: trend }]} height={150} formatValue={(n) => String(Math.round(n))} />
            ) : (
              <Text style={[styles.note, { color: colors.textSecondary }]}>{t('obs.trend_empty')}</Text>
            )}

            <FieldLabel>{t('obs.schedule')}</FieldLabel>
            <ChipRow
              wrap
              options={[
                { value: 'OFF', label: t('obs.schedule_off') },
                { value: 'DAILY', label: t('obs.daily') },
                { value: 'WEEKLY', label: t('obs.weekly') },
              ]}
              value={open.scheduleFrequency ?? 'OFF'}
              onChange={(v) => !busy && setSchedule(v as ObservatoryFrequency | 'OFF')}
            />

            <FieldLabel>{t('obs.history')}</FieldLabel>
            {history === null ? <ActivityIndicator color={colors.primary} /> : history.length === 0 ? (
              <Text style={[styles.note, { color: colors.textSecondary }]}>{t('obs.no_tests')}</Text>
            ) : (
              history.map((h) => {
                const r = report(h, device);
                return (
                  <View key={h.id} style={[styles.historyRow, { borderBottomColor: colors.borderLight }]}>
                    <Text style={[styles.historyDate, { color: colors.text }]}>{new Date(h.date).toLocaleString()}</Text>
                    <Text style={[styles.historyScore, { color: scoreColor(r?.performanceScore, colors) }]}>
                      {r?.state === 'RUNNING' ? '…' : r?.performanceScore ?? '—'}
                    </Text>
                  </View>
                );
              })
            )}

            <View style={styles.actions}>
              <Button title={t('obs.run_again')} variant="secondary" loading={running} onPress={async () => { await runTest(open.url, open.region?.value); setOpen(null); }} />
              <Button title={t('obs.delete_title')} variant="secondary" onPress={confirmDelete} />
            </View>
          </View>
        )}
      </Sheet>
    </>
  );
}

const styles = StyleSheet.create({
  list: { padding: Spacing.lg, paddingBottom: 120 },
  header: { gap: Spacing.sm, marginBottom: Spacing.md },
  quota: { fontSize: FontSize.sm },
  pageCard: { marginBottom: Spacing.sm },
  pageHeader: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md },
  pageBody: { flex: 1, gap: 2 },
  score: { borderWidth: 2, alignItems: 'center', justifyContent: 'center' },
  scoreText: { fontSize: FontSize.md, fontWeight: '600' },
  spinner: { width: 46, height: 46, alignItems: 'center', justifyContent: 'center' },
  pageUrl: { fontSize: FontSize.md, fontWeight: '500' },
  pageMeta: { fontSize: FontSize.sm },
  failed: { fontSize: FontSize.sm, marginTop: Spacing.sm },
  metricsRow: { flexDirection: 'row', marginTop: Spacing.md, paddingTop: Spacing.md, borderTopWidth: 1, gap: Spacing.xs },
  metric: { flex: 1, alignItems: 'center', gap: 2 },
  metricValue: { fontSize: FontSize.sm, fontWeight: '500' },
  metricLabel: { fontSize: FontSize.xs },
  note: { fontSize: FontSize.sm, lineHeight: 19, marginTop: Spacing.sm },
  detail: { gap: Spacing.md },
  detailTop: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md },
  link: { fontSize: FontSize.sm, fontWeight: '500' },
  historyRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: Spacing.sm, borderBottomWidth: 1, borderRadius: Radius.sm },
  historyDate: { fontSize: FontSize.sm },
  historyScore: { fontSize: FontSize.sm, fontWeight: '600' },
  actions: { flexDirection: 'row', gap: Spacing.sm, flexWrap: 'wrap', marginTop: Spacing.sm },
});
