import { useEffect, useState, useCallback } from 'react';
import { StyleSheet, View, Text, ScrollView, Alert } from 'react-native';
import { Stack, router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Icon, IconName } from '@/components/ui/icon';
import { useTheme } from '@/hooks/use-theme';
import { Button } from '@/components/ui/button';
import { Loading } from '@/components/ui/loading';
import { EmptyState } from '@/components/ui/empty-state';
import { SectionHeader } from '@/components/ui/section-header';
import { Group, IconCircle, ListRow, ToggleRow } from '@/components/ui/kit';
import { usePremium } from '@/services/premium';
import * as monitoring from '@/services/monitoring';
import { MonitorConfig, MonitorAlert } from '@/services/monitoring';
import { requestNotificationPermission, syncMonitoring, runCheckNow } from '@/services/monitor-task';
import { track } from '@/services/analytics';
import { Spacing, FontSize } from '@/constants/theme';
import * as api from '@/services/cloudflare';
import { Zone } from '@/services/types';

type Tone = 'neutral' | 'warning' | 'error';

export default function MonitoringScreen() {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const premium = usePremium();

  const [config, setConfigState] = useState<MonitorConfig | null>(null);
  const [zones, setZones] = useState<Zone[]>([]);
  const [history, setHistory] = useState<MonitorAlert[]>([]);
  const [loading, setLoading] = useState(true);
  const [checking, setChecking] = useState(false);

  const load = useCallback(async () => {
    try {
      const [cfg, zonesRes, hist] = await Promise.all([
        monitoring.getConfig(),
        api.getZones(1).catch(() => ({ result: [] as Zone[] })),
        monitoring.getHistory(),
      ]);
      setConfigState(cfg);
      setZones(zonesRes.result ?? []);
      setHistory(hist);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const save = async (next: MonitorConfig) => {
    setConfigState(next);
    await monitoring.setConfig(next);
    await syncMonitoring();
  };

  const toggleEnabled = async (value: boolean) => {
    if (!config) return;
    if (value) {
      if (!premium) {
        Alert.alert(t('monitor.premium_title'), t('monitor.premium_body'), [
          { text: t('common.cancel'), style: 'cancel' },
          { text: t('premium.buy'), onPress: () => router.push('/(tabs)/settings') },
        ]);
        return;
      }
      const granted = await requestNotificationPermission();
      if (!granted) {
        Alert.alert(t('monitor.perm_title'), t('monitor.perm_body'));
        return;
      }
    }
    track(value ? 'monitor_enabled' : 'monitor_disabled');
    await save({ ...config, enabled: value });
  };

  const toggleZone = async (zoneId: string) => {
    if (!config) return;
    const has = config.zoneIds.includes(zoneId);
    const zoneIds = has ? config.zoneIds.filter((z) => z !== zoneId) : [...config.zoneIds, zoneId];
    await save({ ...config, zoneIds });
  };

  const checkNow = async () => {
    setChecking(true);
    try {
      const count = await runCheckNow();
      setHistory(await monitoring.getHistory());
      Alert.alert(
        count > 0 ? t('monitor.alerts_found_title') : t('monitor.all_good_title'),
        count > 0 ? t('monitor.alerts_found_body', { count }) : t('monitor.all_good_body')
      );
    } catch (e: any) {
      Alert.alert(t('common.error'), e?.message ?? 'Check failed');
    } finally {
      setChecking(false);
    }
  };

  if (loading || !config) return <Loading />;

  const alertIcon = (kind: MonitorAlert['kind']): IconName =>
    kind === 'down' ? 'error-circle' : kind === 'ssl' ? 'lock' : kind === 'threats' ? 'shield'
      : kind === 'dns' ? 'dns' : 'chart-line';
  const alertTone = (kind: MonitorAlert['kind']): Tone =>
    kind === 'down' ? 'error' : kind === 'ssl' ? 'warning' : kind === 'threats' ? 'error'
      : kind === 'dns' ? 'warning' : 'neutral';

  // Text here can run long, so these rows do not clip lines the way ListRow does.
  const infoRow = (key: string, icon: IconName, tone: Tone, title: string, sub: string, meta?: string) => (
    <View key={key} style={styles.infoRow}>
      <IconCircle name={icon} tone={tone} />
      <View style={styles.infoBody}>
        <Text style={[styles.infoTitle, { color: colors.text }]}>{title}</Text>
        <Text style={[styles.infoSub, { color: colors.textSecondary }]}>{sub}</Text>
        {!!meta && <Text style={[styles.infoMeta, { color: colors.textTertiary }]}>{meta}</Text>}
      </View>
    </View>
  );

  const checks: { icon: IconName; title: string; sub: string }[] = [
    { icon: 'error-circle', title: t('monitor.check_down'), sub: t('monitor.check_down_sub', { pct: config.errorRatePct }) },
    { icon: 'chart-line', title: t('monitor.check_spike'), sub: t('monitor.check_spike_sub', { x: config.spikeMultiplier }) },
    { icon: 'shield', title: t('monitor.check_threats'), sub: t('monitor.check_threats_sub') },
    { icon: 'lock', title: t('monitor.check_ssl'), sub: t('monitor.check_ssl_sub', { days: config.sslDaysBefore }) },
  ];

  const toggleDnsDrift = (value: boolean) => config && save({ ...config, dnsDrift: value });

  return (
    <>
      <Stack.Screen options={{ title: t('monitor.title') }} />
      <ScrollView
        style={[styles.container, { backgroundColor: colors.background }]}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Master switch */}
        <Group>
          <ToggleRow
            icon="activity"
            iconTone={config.enabled ? 'success' : 'neutral'}
            title={t('monitor.hero_title')}
            subtitle={config.enabled ? t('monitor.hero_on') : t('monitor.hero_off')}
            value={config.enabled}
            onValueChange={toggleEnabled}
          />
          {!premium && (
            <ListRow
              icon="zap"
              title={t('monitor.premium_upsell')}
              onPress={() => router.push('/(tabs)/settings')}
            />
          )}
        </Group>

        {/* What we watch */}
        <SectionHeader title={t('monitor.watching')} />
        <Group>
          {checks.map((row) => infoRow(row.title, row.icon, 'neutral', row.title, row.sub))}
        </Group>

        {/* The one check that works without analytics access, so it gets its own switch. */}
        <Group style={{ marginTop: Spacing.sm }}>
          <ToggleRow
            icon="dns"
            title={t('monitor.check_dns')}
            subtitle={t('monitor.check_dns_sub')}
            value={config.dnsDrift}
            onValueChange={toggleDnsDrift}
          />
        </Group>

        {/* Zone picker */}
        <SectionHeader title={t('monitor.zones', { count: config.zoneIds.length })} />
        <Group>
          {zones.length === 0 ? (
            <View style={styles.emptyZones}>
              <Text style={[styles.infoSub, { color: colors.textSecondary }]}>{t('monitor.no_zones')}</Text>
            </View>
          ) : (
            zones.map((z) => (
              <ToggleRow
                key={z.id}
                icon="globe"
                title={z.name}
                value={config.zoneIds.includes(z.id)}
                onValueChange={() => toggleZone(z.id)}
              />
            ))
          )}
        </Group>

        {/* Check now */}
        <Button
          title={t('monitor.check_now')}
          onPress={checkNow}
          loading={checking}
          icon={<Icon name="refresh" size={18} color="#FFF" />}
          style={styles.checkNow}
        />

        {/* History */}
        <SectionHeader title={t('monitor.history')} />
        {history.length === 0 ? (
          <EmptyState icon="activity" title={t('monitor.no_alerts')} message={t('monitor.no_alerts_message')} />
        ) : (
          <Group>
            {history.map((a) =>
              infoRow(a.id, alertIcon(a.kind), alertTone(a.kind), a.title, a.body, new Date(a.at).toLocaleString())
            )}
          </Group>
        )}

        <Text style={[styles.footnote, { color: colors.textTertiary }]}>{t('monitor.footnote')}</Text>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: Spacing.lg, paddingBottom: Spacing.xxxl },

  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    paddingHorizontal: Spacing.lg,
    paddingVertical: 13,
  },
  infoBody: { flex: 1, gap: 2 },
  infoTitle: { fontSize: FontSize.md, fontWeight: '500' },
  infoSub: { fontSize: FontSize.sm, lineHeight: 18 },
  infoMeta: { fontSize: FontSize.xs, marginTop: 2 },

  emptyZones: { padding: Spacing.lg },
  checkNow: { marginTop: Spacing.lg },
  footnote: {
    fontSize: FontSize.xs,
    lineHeight: 16,
    textAlign: 'center',
    marginTop: Spacing.lg,
    paddingHorizontal: Spacing.lg,
  },
});
