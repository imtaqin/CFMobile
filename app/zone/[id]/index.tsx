import { useEffect, useState, useCallback } from 'react';
import {
  StyleSheet, View, Text, ScrollView, RefreshControl, Alert, TouchableOpacity, ActivityIndicator,
} from 'react-native';
import { useLocalSearchParams, router, Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Icon, IconName } from '@/components/ui/icon';
import { useTheme } from '@/hooks/use-theme';
import { Loading } from '@/components/ui/loading';
import { Badge } from '@/components/ui/badge';
import { SectionHeader } from '@/components/ui/section-header';
import { Group, IconCircle, ListRow, StatCard, ToggleRow } from '@/components/ui/kit';
import { useAuth } from '@/contexts/auth';
import { Spacing, FontSize, Radius } from '@/constants/theme';
import * as api from '@/services/cloudflare';
import { logSetting } from '@/services/change-history';
import { refreshShortcuts } from '@/widgets/sync';
import { Zone } from '@/services/types';

const maskName = (name: string) => {
  if (!name.includes('@')) return name;
  const [local, domain] = name.split('@');
  return local.slice(0, 2) + '••••@' + domain;
};

interface Tile {
  icon: IconName;
  title: string;
  path: string;
}

export default function ZoneDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { t } = useTranslation();
  const { colors } = useTheme();
  const { permissions } = useAuth();
  const perms = permissions ?? { dns: true, ssl: true, firewall: true, cache: true, analytics: true, pageRules: true } as any;

  const [zone, setZone] = useState<Zone | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [devMode, setDevMode] = useState(false);
  const [underAttack, setUnderAttack] = useState(false);
  const [prevSecLevel, setPrevSecLevel] = useState('medium');
  const [paused, setPaused] = useState(false);
  const [holdActive, setHoldActive] = useState(false);
  const [checkingActivation, setCheckingActivation] = useState(false);

  const fetchZone = useCallback(async () => {
    try {
      const res = await api.getZone(id);
      setZone(res.result);
      setDevMode((res.result?.development_mode ?? 0) > 0);
      setPaused(res.result?.paused ?? false);
      try {
        const sec = await api.getSecurityLevel(id);
        const level = String(sec.result?.value ?? 'medium');
        setUnderAttack(level === 'under_attack');
        if (level !== 'under_attack') setPrevSecLevel(level);
      } catch {
        // token may lack settings read — hide toggle failure silently
      }
      try {
        const holdRes = await api.getZoneHold(id);
        setHoldActive(holdRes.result?.hold ?? false);
      } catch {
        // may lack permission
      }
    } catch {
      Alert.alert(t('common.error'), t('zone.fetch_error'));
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [id, t]);

  useEffect(() => { fetchZone(); }, [fetchZone]);

  const toggleDevMode = async (value: boolean) => {
    setDevMode(value);
    try {
      await api.toggleDevMode(id, value ? 'on' : 'off');
      logSetting(id, 'development_mode', value ? 'off' : 'on', value ? 'on' : 'off', zone?.name);
      refreshShortcuts().catch(() => {});
    } catch {
      setDevMode(!value);
      Alert.alert(t('common.error'), t('zone.dev_mode_error'));
    }
  };

  const toggleUnderAttack = async (value: boolean) => {
    setUnderAttack(value);
    try {
      await api.updateSecurityLevel(id, value ? 'under_attack' : prevSecLevel);
      logSetting(id, 'security_level', value ? prevSecLevel : 'under_attack', value ? 'under_attack' : prevSecLevel, zone?.name);
      refreshShortcuts().catch(() => {});
    } catch {
      setUnderAttack(!value);
      Alert.alert(t('common.error'), t('zone.under_attack_error'));
    }
  };

  const togglePause = async () => {
    const value = !paused;
    setPaused(value);
    try {
      if (value) await api.pauseZone(id);
      else await api.unpauseZone(id);
    } catch {
      setPaused(!value);
      Alert.alert(t('common.error'), t('zone.pause_error'));
    }
  };

  const toggleHold = async () => {
    const value = !holdActive;
    setHoldActive(value);
    try {
      if (value) await api.createZoneHold(id);
      else await api.deleteZoneHold(id);
    } catch {
      setHoldActive(!value);
      Alert.alert(t('common.error'), t('zone.hold_error'));
    }
  };

  const handleActivationCheck = async () => {
    setCheckingActivation(true);
    try {
      await api.checkActivation(id);
      Alert.alert(t('common.success'), t('zone.activation_check_success'));
    } catch (e: any) {
      Alert.alert(t('common.error'), e?.response?.data?.errors?.[0]?.message ?? t('zone.activation_check_error'));
    } finally {
      setCheckingActivation(false);
    }
  };

  if (loading || !zone) return <Loading />;

  const statusVariant = zone.status === 'active' ? 'success' : zone.status === 'pending' ? 'warning' : 'error';

  const tile = (show: boolean, icon: IconName, title: string, path: string): Tile | null =>
    show ? { icon, title, path } : null;

  // Grouped by what you are trying to do, most used first.
  const groups: { title: string; tiles: Tile[] }[] = [
    {
      title: t('zone.group_core'),
      tiles: [
        tile(perms.dns, 'dns', t('zone.dns_records'), 'dns'),
        tile(perms.ssl, 'lock', t('zone.ssl_tls'), 'ssl'),
        tile(perms.firewall, 'shield', t('zone.firewall'), 'firewall'),
        tile(perms.cache, 'cached', t('zone.cache'), 'cache'),
        tile(perms.analytics, 'chart-line', t('zone.analytics'), 'analytics'),
        tile(true, 'mail', t('zone.email_routing'), 'email'),
      ],
    },
    {
      title: t('zone.group_ai'),
      tiles: [
        tile(true, 'shield-check', t('zone.ai_audit'), 'ai-audit'),
        tile(true, 'sparkles', t('zone.ai_chat'), '__ai-chat'),
      ],
    },
    {
      title: t('zone.group_traffic'),
      tiles: [
        tile(true, 'rule', t('zone.rules'), 'rules'),
        tile(perms.pageRules, 'rule', t('zone.page_rules'), 'pagerules'),
        tile(true, 'route', t('zone.worker_routes'), 'worker-routes'),
        tile(true, 'code', t('zone.snippets'), 'snippets'),
        tile(true, 'globe', t('zone.custom_hostnames'), 'custom-hostnames'),
        tile(true, 'clock', t('zone.waiting_room'), 'waiting-room'),
        tile(true, 'activity', t('zone.health_checks'), 'health-checks'),
        tile(true, 'widgets', t('zone.zaraz'), 'zaraz'),
      ],
    },
    {
      title: t('zone.group_security'),
      tiles: [
        tile(true, 'shield', t('zone.page_shield'), 'page-shield'),
        tile(true, 'key', t('zone.certificates'), 'certificates'),
      ],
    },
    {
      title: t('zone.group_insights'),
      tiles: [
        tile(true, 'chart-line', t('zone.observatory'), 'observatory'),
        tile(true, 'search', t('zone.log_explorer'), 'log-explorer'),
        tile(true, 'cloud-upload', t('zone.logpush'), 'logpush'),
      ],
    },
    {
      title: t('zone.group_zone'),
      tiles: [
        tile(true, 'settings', t('zone.zone_settings'), 'settings'),
        tile(true, 'refresh', t('zone.lifecycle'), 'lifecycle'),
      ],
    },
  ]
    .map((g) => ({ title: g.title, tiles: g.tiles.filter(Boolean) as Tile[] }))
    .filter((g) => g.tiles.length > 0);

  const open = (path: string) =>
    path === '__ai-chat'
      ? router.push({ pathname: '/ai-chat', params: { zoneId: id, zoneName: zone.name } } as any)
      : router.push(`/zone/${id}/${path}` as any);

  return (
    <>
      <Stack.Screen options={{ title: zone.name }} />
      <ScrollView
        style={[styles.container, { backgroundColor: colors.background }]}
        contentContainerStyle={styles.content}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); fetchZone(); }} tintColor={colors.primary} />}
        showsVerticalScrollIndicator={false}
      >
        {/* Zone summary */}
        <View style={[styles.hero, { backgroundColor: colors.surface, borderColor: colors.borderLight }]}>
          <IconCircle name="globe" size={44} />
          <View style={{ flex: 1, gap: 4 }}>
            <Text style={[styles.zoneName, { color: colors.text }]} numberOfLines={1}>{zone.name}</Text>
            <Text style={[styles.zoneMeta, { color: colors.textTertiary }]} numberOfLines={1}>
              {zone.plan.name} · {maskName(zone.account.name)}
            </Text>
          </View>
          <Badge label={zone.status} variant={statusVariant} />
        </View>

        <View style={styles.statsRow}>
          <StatCard label={t('zone.nameservers')} value={String(zone.name_servers?.length ?? 0)} />
          <StatCard label="Type" value={zone.type} />
          <StatCard label="Since" value={String(new Date(zone.created_on).getFullYear())} />
        </View>

        {/* Quick controls */}
        <SectionHeader title={t('zone.group_controls')} />
        <Group>
          <ToggleRow
            icon="shield"
            iconTone={underAttack ? 'error' : 'neutral'}
            title={t('zone.under_attack')}
            subtitle={underAttack ? t('zone.under_attack_active') : t('zone.under_attack_desc')}
            value={underAttack}
            onValueChange={toggleUnderAttack}
          />
          <ToggleRow
            icon="developer-mode"
            iconTone={devMode ? 'warning' : 'neutral'}
            title={t('zone.dev_mode')}
            subtitle={t('zone.dev_mode_desc')}
            value={devMode}
            onValueChange={toggleDevMode}
          />
          <ToggleRow
            icon="power"
            iconTone={paused ? 'warning' : 'neutral'}
            title={t('zone.pause_zone')}
            subtitle={paused ? t('zone.pause_zone_active') : t('zone.pause_zone_desc')}
            value={paused}
            onValueChange={togglePause}
          />
          <ToggleRow
            icon="lock"
            title={t('zone.hold')}
            subtitle={holdActive ? t('zone.hold_active') : t('zone.hold_desc')}
            value={holdActive}
            onValueChange={toggleHold}
          />
          <ListRow
            icon="refresh"
            title={t('zone.activation_check')}
            subtitle={t('zone.activation_check_desc')}
            onPress={checkingActivation ? undefined : handleActivationCheck}
            trailing={checkingActivation ? <ActivityIndicator size="small" color={colors.textSecondary} /> : undefined}
          />
        </Group>

        {/* Management */}
        {groups.map((g) => (
          <View key={g.title}>
            <SectionHeader title={g.title} />
            <View style={styles.tileGrid}>
              {g.tiles.map((item) => (
                <TouchableOpacity
                  key={item.path}
                  style={[styles.tile, { backgroundColor: colors.surface, borderColor: colors.borderLight }]}
                  onPress={() => open(item.path)}
                  activeOpacity={0.7}
                >
                  <IconCircle name={item.icon} size={34} />
                  <Text style={[styles.tileTitle, { color: colors.text }]} numberOfLines={2}>{item.title}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

        {/* Nameservers */}
        <SectionHeader title={t('zone.nameservers')} />
        <Group>
          {(zone.name_servers ?? []).map((ns) => (
            <View key={ns} style={styles.nsRow}>
              <Icon name="dns" size={14} color={colors.textTertiary} />
              <Text style={[styles.nsText, { color: colors.text }]} selectable>{ns}</Text>
            </View>
          ))}
        </Group>
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
    padding: Spacing.lg,
    borderRadius: Radius.lg,
    borderWidth: 1,
  },
  zoneName: { fontSize: FontSize.lg, fontWeight: '500', letterSpacing: -0.2 },
  zoneMeta: { fontSize: FontSize.xs },
  statsRow: { flexDirection: 'row', gap: Spacing.sm, marginTop: Spacing.sm },

  tileGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm },
  tile: {
    flexBasis: '47%',
    flexGrow: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    minHeight: 58,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: Radius.lg,
    borderWidth: 1,
  },
  tileTitle: { flex: 1, fontSize: FontSize.sm, fontWeight: '500', lineHeight: 17 },

  nsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    paddingHorizontal: Spacing.lg,
    paddingVertical: 13,
  },
  nsText: { fontSize: FontSize.sm, fontFamily: 'monospace', flex: 1 },
});
