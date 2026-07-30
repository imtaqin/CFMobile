import { useEffect, useState, useCallback } from 'react';
import {
  StyleSheet, View, Text, ScrollView, Switch, TouchableOpacity, Alert, ActivityIndicator,
} from 'react-native';
import { Stack, router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Icon } from '@/components/ui/icon';
import { useTheme } from '@/hooks/use-theme';
import { Card } from '@/components/ui/card';
import { Loading } from '@/components/ui/loading';
import { EmptyState } from '@/components/ui/empty-state';
import { SectionHeader } from '@/components/ui/section-header';
import { usePremium } from '@/services/premium';
import * as monitoring from '@/services/monitoring';
import { MonitorConfig, MonitorAlert } from '@/services/monitoring';
import { requestNotificationPermission, syncMonitoring, runCheckNow } from '@/services/monitor-task';
import { Spacing, FontSize, Radius, CF } from '@/constants/theme';
import * as api from '@/services/cloudflare';
import { Zone } from '@/services/types';

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

  const alertIcon = (kind: MonitorAlert['kind']) =>
    kind === 'down' ? 'error-circle' : kind === 'ssl' ? 'lock' : kind === 'threats' ? 'shield' : 'chart-line';
  const alertColor = (kind: MonitorAlert['kind']) =>
    kind === 'down' ? colors.error : kind === 'ssl' ? colors.warning : kind === 'threats' ? colors.error : colors.info;

  return (
    <>
      <Stack.Screen options={{ title: t('monitor.title') }} />
      <ScrollView
        style={[styles.container, { backgroundColor: colors.background }]}
        contentContainerStyle={styles.content}
      >
        {/* Hero */}
        <View style={[styles.hero, { backgroundColor: config.enabled ? colors.success + '12' : colors.surface, borderColor: config.enabled ? colors.success + '40' : colors.borderLight }]}>
          <View style={[styles.heroIcon, { backgroundColor: (config.enabled ? colors.success : colors.textTertiary) + '20' }]}>
            <Icon name="activity" size={26} color={config.enabled ? colors.success : colors.textTertiary} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={[styles.heroTitle, { color: colors.text }]}>{t('monitor.hero_title')}</Text>
            <Text style={[styles.heroSub, { color: colors.textSecondary }]}>
              {config.enabled ? t('monitor.hero_on') : t('monitor.hero_off')}
            </Text>
          </View>
          <Switch
            value={config.enabled}
            onValueChange={toggleEnabled}
            trackColor={{ true: colors.success, false: colors.border }}
            thumbColor="#FFF"
          />
        </View>

        {!premium && (
          <TouchableOpacity
            style={[styles.upsell, { backgroundColor: CF.orange + '10', borderColor: CF.orange + '35' }]}
            onPress={() => router.push('/(tabs)/settings')}
            activeOpacity={0.8}
          >
            <Icon name="zap" size={18} color={CF.orange} />
            <Text style={[styles.upsellText, { color: colors.text }]}>{t('monitor.premium_upsell')}</Text>
            <Icon name="chevron-right" size={16} color={colors.textTertiary} />
          </TouchableOpacity>
        )}

        {/* What we watch */}
        <SectionHeader title={t('monitor.watching')} />
        <Card style={{ gap: Spacing.md }}>
          {[
            { icon: 'error-circle' as const, color: colors.error, title: t('monitor.check_down'), sub: t('monitor.check_down_sub', { pct: config.errorRatePct }) },
            { icon: 'chart-line' as const, color: colors.info, title: t('monitor.check_spike'), sub: t('monitor.check_spike_sub', { x: config.spikeMultiplier }) },
            { icon: 'shield' as const, color: '#8B5CF6', title: t('monitor.check_threats'), sub: t('monitor.check_threats_sub') },
            { icon: 'lock' as const, color: colors.warning, title: t('monitor.check_ssl'), sub: t('monitor.check_ssl_sub', { days: config.sslDaysBefore }) },
          ].map((row) => (
            <View key={row.title} style={styles.checkRow}>
              <View style={[styles.checkIcon, { backgroundColor: row.color + '15' }]}>
                <Icon name={row.icon} size={16} color={row.color} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[styles.checkTitle, { color: colors.text }]}>{row.title}</Text>
                <Text style={[styles.checkSub, { color: colors.textSecondary }]}>{row.sub}</Text>
              </View>
            </View>
          ))}
        </Card>

        {/* Zone picker */}
        <SectionHeader title={t('monitor.zones', { count: config.zoneIds.length })} />
        <Card style={{ padding: 0, overflow: 'hidden' as const }}>
          {zones.length === 0 ? (
            <View style={{ padding: Spacing.lg }}>
              <Text style={{ color: colors.textSecondary, fontSize: FontSize.sm }}>{t('monitor.no_zones')}</Text>
            </View>
          ) : (
            zones.map((z, idx) => {
              const on = config.zoneIds.includes(z.id);
              return (
                <View key={z.id}>
                  {idx > 0 && <View style={[styles.divider, { backgroundColor: colors.borderLight }]} />}
                  <TouchableOpacity style={styles.zoneRow} onPress={() => toggleZone(z.id)} activeOpacity={0.6}>
                    <Icon name={on ? 'check-circle' : 'globe'} size={20} color={on ? colors.success : colors.textTertiary} />
                    <Text style={[styles.zoneName, { color: colors.text }]} numberOfLines={1}>{z.name}</Text>
                  </TouchableOpacity>
                </View>
              );
            })
          )}
        </Card>

        {/* Check now */}
        <TouchableOpacity
          style={[styles.checkNow, { backgroundColor: colors.primary, opacity: checking ? 0.6 : 1 }]}
          onPress={checkNow}
          disabled={checking}
          activeOpacity={0.85}
        >
          {checking ? <ActivityIndicator size="small" color="#FFF" /> : <Icon name="refresh" size={18} color="#FFF" />}
          <Text style={styles.checkNowText}>{t('monitor.check_now')}</Text>
        </TouchableOpacity>

        {/* History */}
        <SectionHeader title={t('monitor.history')} />
        {history.length === 0 ? (
          <EmptyState icon="activity" title={t('monitor.no_alerts')} message={t('monitor.no_alerts_message')} />
        ) : (
          history.map((a) => (
            <Card key={a.id} style={styles.alertCard}>
              <View style={[styles.checkIcon, { backgroundColor: alertColor(a.kind) + '15' }]}>
                <Icon name={alertIcon(a.kind)} size={16} color={alertColor(a.kind)} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[styles.checkTitle, { color: colors.text }]}>{a.title}</Text>
                <Text style={[styles.checkSub, { color: colors.textSecondary }]}>{a.body}</Text>
                <Text style={[styles.alertTime, { color: colors.textTertiary }]}>
                  {new Date(a.at).toLocaleString()}
                </Text>
              </View>
            </Card>
          ))
        )}

        <Text style={[styles.footnote, { color: colors.textTertiary }]}>{t('monitor.footnote')}</Text>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: Spacing.lg, paddingBottom: Spacing.xxxl },
  hero: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    padding: Spacing.md,
    borderRadius: Radius.lg,
    borderWidth: 1,
    marginBottom: Spacing.sm,
  },
  heroIcon: {
    width: 48,
    height: 48,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroTitle: { fontSize: FontSize.md, fontWeight: '700' },
  heroSub: { fontSize: FontSize.xs, marginTop: 2, lineHeight: 16 },
  upsell: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    padding: Spacing.md,
    borderRadius: Radius.md,
    borderWidth: 1,
    marginBottom: Spacing.sm,
  },
  upsellText: { flex: 1, fontSize: FontSize.sm, fontWeight: '600' },
  checkRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md },
  checkIcon: {
    width: 34,
    height: 34,
    borderRadius: Radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkTitle: { fontSize: FontSize.sm, fontWeight: '700' },
  checkSub: { fontSize: FontSize.xs, marginTop: 2, lineHeight: 16 },
  divider: { height: 1, marginLeft: 56 },
  zoneRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
  },
  zoneName: { flex: 1, fontSize: FontSize.sm, fontWeight: '600' },
  checkNow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    height: 50,
    borderRadius: Radius.md,
    marginTop: Spacing.md,
  },
  checkNowText: { color: '#FFF', fontSize: FontSize.md, fontWeight: '700' },
  alertCard: { flexDirection: 'row', gap: Spacing.md, marginBottom: Spacing.sm },
  alertTime: { fontSize: 10, marginTop: 4 },
  footnote: {
    fontSize: FontSize.xs,
    lineHeight: 16,
    textAlign: 'center',
    marginTop: Spacing.lg,
  },
});
