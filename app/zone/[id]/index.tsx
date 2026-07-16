import { useEffect, useState, useCallback } from 'react';
import {
  StyleSheet, View, Text, ScrollView, RefreshControl, Alert, Switch, TouchableOpacity,
} from 'react-native';
import { useLocalSearchParams, router, Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Icon, IconName } from '@/components/ui/icon';
import { useTheme } from '@/hooks/use-theme';
import { Loading } from '@/components/ui/loading';
import { useAuth } from '@/contexts/auth';
import { Spacing, FontSize, Radius } from '@/constants/theme';
import * as api from '@/services/cloudflare';
import { Zone } from '@/services/types';

const maskName = (name: string) => {
  if (!name.includes('@')) return name;
  const [local, domain] = name.split('@');
  return local.slice(0, 2) + '••••@' + domain;
};

export default function ZoneDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { t } = useTranslation();
  const { colors, isDark } = useTheme();
  const { permissions } = useAuth();
  const perms = permissions ?? { dns: true, ssl: true, firewall: true, cache: true, analytics: true, pageRules: true } as any;

  const [zone, setZone] = useState<Zone | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [devMode, setDevMode] = useState(false);
  const [underAttack, setUnderAttack] = useState(false);
  const [prevSecLevel, setPrevSecLevel] = useState('medium');

  const fetchZone = useCallback(async () => {
    try {
      const res = await api.getZone(id);
      setZone(res.result);
      setDevMode((res.result?.development_mode ?? 0) > 0);
      try {
        const sec = await api.getSecurityLevel(id);
        const level = String(sec.result?.value ?? 'medium');
        setUnderAttack(level === 'under_attack');
        if (level !== 'under_attack') setPrevSecLevel(level);
      } catch {
        // token may lack settings read — hide toggle failure silently
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
    } catch {
      setDevMode(!value);
      Alert.alert(t('common.error'), t('zone.dev_mode_error'));
    }
  };

  const toggleUnderAttack = async (value: boolean) => {
    setUnderAttack(value);
    try {
      await api.updateSecurityLevel(id, value ? 'under_attack' : prevSecLevel);
    } catch {
      setUnderAttack(!value);
      Alert.alert(t('common.error'), t('zone.under_attack_error'));
    }
  };

  if (loading || !zone) return <Loading />;

  const statusColor = zone.status === 'active' ? colors.success : zone.status === 'pending' ? colors.warning : colors.error;

  const tiles: { icon: IconName; color: string; title: string; sub: string; path: string }[] = [
    perms.dns && { icon: 'dns' as const, color: colors.info, title: t('zone.dns_records'), sub: t('zone.dns_records_desc'), path: 'dns' },
    perms.ssl && { icon: 'lock' as const, color: colors.success, title: t('zone.ssl_tls'), sub: t('zone.ssl_tls_desc'), path: 'ssl' },
    perms.firewall && { icon: 'shield' as const, color: colors.error, title: t('zone.firewall'), sub: t('zone.firewall_desc'), path: 'firewall' },
    perms.cache && { icon: 'cached' as const, color: colors.warning, title: t('zone.cache'), sub: t('zone.cache_desc'), path: 'cache' },
    perms.analytics && { icon: 'chart-line' as const, color: '#9333EA', title: t('zone.analytics'), sub: t('zone.analytics_desc'), path: 'analytics' },
    perms.pageRules && { icon: 'rule' as const, color: colors.primary, title: t('zone.page_rules'), sub: t('zone.page_rules_desc'), path: 'pagerules' },
    { icon: 'mail' as const, color: '#EC4899', title: t('zone.email_routing'), sub: t('zone.email_routing_desc'), path: 'email' },
  ].filter(Boolean) as any;

  return (
    <>
      <Stack.Screen options={{ title: zone.name }} />
      <ScrollView
        style={[styles.container, { backgroundColor: colors.background }]}
        contentContainerStyle={styles.content}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); fetchZone(); }} tintColor={colors.primary} />}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero card */}
        <View style={[styles.hero, { backgroundColor: colors.surface, borderColor: colors.borderLight }]}>
          <View style={styles.heroTop}>
            <View style={[styles.heroIcon, { backgroundColor: colors.primary + '15' }]}>
              <Icon name="globe" size={28} color={colors.primary} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[styles.zoneName, { color: colors.text }]} numberOfLines={1}>{zone.name}</Text>
              <View style={styles.statusRow}>
                <View style={[styles.statusDot, { backgroundColor: statusColor }]} />
                <Text style={[styles.statusText, { color: statusColor }]}>{zone.status.toUpperCase()}</Text>
                <Text style={[styles.dotSep, { color: colors.textTertiary }]}>•</Text>
                <Text style={[styles.planText, { color: colors.textSecondary }]}>{zone.plan.name}</Text>
              </View>
            </View>
          </View>

          {/* Stats strip */}
          <View style={[styles.statsStrip, { backgroundColor: colors.surfaceSecondary }]}>
            <View style={styles.statCol}>
              <Text style={[styles.statNum, { color: colors.text }]}>{zone.name_servers?.length ?? 0}</Text>
              <Text style={[styles.statLabel, { color: colors.textTertiary }]}>NS</Text>
            </View>
            <View style={[styles.statSep, { backgroundColor: colors.border }]} />
            <View style={styles.statCol}>
              <Text style={[styles.statNum, { color: colors.text }]} numberOfLines={1}>{zone.type}</Text>
              <Text style={[styles.statLabel, { color: colors.textTertiary }]}>Type</Text>
            </View>
            <View style={[styles.statSep, { backgroundColor: colors.border }]} />
            <View style={styles.statCol}>
              <Text style={[styles.statNum, { color: colors.text }]}>{new Date(zone.created_on).getFullYear()}</Text>
              <Text style={[styles.statLabel, { color: colors.textTertiary }]}>Since</Text>
            </View>
          </View>

          <Text style={[styles.accountLine, { color: colors.textTertiary }]} numberOfLines={1}>
            {maskName(zone.account.name)}
          </Text>
        </View>

        {/* Dev mode toggle */}
        <TouchableOpacity
          style={[styles.devCard, { backgroundColor: colors.surface, borderColor: devMode ? colors.warning : colors.borderLight }]}
          onPress={() => toggleDevMode(!devMode)}
          activeOpacity={0.8}
        >
          <View style={[styles.devIconWrap, { backgroundColor: colors.warning + '15' }]}>
            <Icon name="developer-mode" size={20} color={colors.warning} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={[styles.devTitle, { color: colors.text }]}>{t('zone.dev_mode')}</Text>
            <Text style={[styles.devDesc, { color: colors.textSecondary }]}>
              {devMode ? 'Active for 3 hours' : t('zone.dev_mode_desc')}
            </Text>
          </View>
          <Switch
            value={devMode}
            onValueChange={toggleDevMode}
            trackColor={{ true: colors.warning, false: colors.border }}
            thumbColor="#FFF"
          />
        </TouchableOpacity>

        {/* Under Attack Mode toggle */}
        <TouchableOpacity
          style={[styles.devCard, { backgroundColor: underAttack ? colors.error + '10' : colors.surface, borderColor: underAttack ? colors.error : colors.borderLight }]}
          onPress={() => toggleUnderAttack(!underAttack)}
          activeOpacity={0.8}
        >
          <View style={[styles.devIconWrap, { backgroundColor: colors.error + '15' }]}>
            <Icon name="shield" size={20} color={colors.error} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={[styles.devTitle, { color: underAttack ? colors.error : colors.text }]}>{t('zone.under_attack')}</Text>
            <Text style={[styles.devDesc, { color: colors.textSecondary }]}>
              {underAttack ? t('zone.under_attack_active') : t('zone.under_attack_desc')}
            </Text>
          </View>
          <Switch
            value={underAttack}
            onValueChange={toggleUnderAttack}
            trackColor={{ true: colors.error, false: colors.border }}
            thumbColor="#FFF"
          />
        </TouchableOpacity>

        {/* Management tile grid */}
        <Text style={[styles.sectionLabel, { color: colors.textSecondary }]}>{t('zone.management')}</Text>
        <View style={styles.tileGrid}>
          {tiles.map((tile) => (
            <TouchableOpacity
              key={tile.path}
              style={[styles.tile, { backgroundColor: colors.surface, borderColor: colors.borderLight }]}
              onPress={() => router.push(`/zone/${id}/${tile.path}`)}
              activeOpacity={0.7}
            >
              <View style={[styles.tileIcon, { backgroundColor: tile.color + (isDark ? '20' : '12') }]}>
                <Icon name={tile.icon} size={22} color={tile.color} />
              </View>
              <Text style={[styles.tileTitle, { color: colors.text }]}>{tile.title}</Text>
              <Text style={[styles.tileSub, { color: colors.textTertiary }]} numberOfLines={2}>
                {tile.sub}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Nameservers */}
        <Text style={[styles.sectionLabel, { color: colors.textSecondary }]}>{t('zone.nameservers')}</Text>
        <View style={[styles.nsCard, { backgroundColor: colors.surface, borderColor: colors.borderLight }]}>
          {zone.name_servers?.map((ns, i) => (
            <View key={ns} style={[styles.nsRow, i > 0 && { borderTopWidth: 1, borderTopColor: colors.borderLight }]}>
              <View style={[styles.nsDot, { backgroundColor: colors.info + '20' }]}>
                <Icon name="dns" size={14} color={colors.info} />
              </View>
              <Text style={[styles.nsText, { color: colors.text }]}>{ns}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: Spacing.lg, paddingBottom: Spacing.xxxl, gap: Spacing.md },

  // Hero
  hero: {
    borderRadius: Radius.xl,
    borderWidth: 1,
    padding: Spacing.lg,
  },
  heroTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    marginBottom: Spacing.md,
  },
  heroIcon: {
    width: 56,
    height: 56,
    borderRadius: Radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  zoneName: { fontSize: FontSize.xl, fontWeight: '800', letterSpacing: -0.3 },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 4,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  statusText: { fontSize: 11, fontWeight: '700', letterSpacing: 0.5 },
  dotSep: { fontSize: FontSize.xs },
  planText: { fontSize: FontSize.xs, fontWeight: '500' },

  statsStrip: {
    flexDirection: 'row',
    paddingVertical: Spacing.sm,
    borderRadius: Radius.md,
  },
  statCol: { flex: 1, alignItems: 'center', gap: 2 },
  statNum: { fontSize: FontSize.md, fontWeight: '700' },
  statLabel: { fontSize: 10, fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.5 },
  statSep: { width: 1, alignSelf: 'stretch', marginVertical: 4 },
  accountLine: {
    fontSize: FontSize.xs,
    marginTop: Spacing.sm,
    textAlign: 'center',
  },

  // Dev mode
  devCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    padding: Spacing.md,
    borderRadius: Radius.lg,
    borderWidth: 1,
  },
  devIconWrap: {
    width: 40,
    height: 40,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  devTitle: { fontSize: FontSize.md, fontWeight: '600' },
  devDesc: { fontSize: FontSize.xs, marginTop: 2 },

  // Section
  sectionLabel: {
    fontSize: FontSize.xs,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginTop: Spacing.sm,
    marginBottom: -Spacing.xs,
  },

  // Tile grid
  tileGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  tile: {
    width: '48.5%' as any,
    flexGrow: 1,
    flexBasis: '46%',
    padding: Spacing.md,
    borderRadius: Radius.lg,
    borderWidth: 1,
    gap: Spacing.xs,
    minHeight: 120,
  },
  tileIcon: {
    width: 44,
    height: 44,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  tileTitle: { fontSize: FontSize.md, fontWeight: '700' },
  tileSub: { fontSize: 11, lineHeight: 14 },

  // Nameservers
  nsCard: {
    borderRadius: Radius.lg,
    borderWidth: 1,
    overflow: 'hidden',
  },
  nsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    padding: Spacing.md,
  },
  nsDot: {
    width: 28,
    height: 28,
    borderRadius: Radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nsText: { fontSize: FontSize.sm, fontFamily: 'monospace', flex: 1 },
});
