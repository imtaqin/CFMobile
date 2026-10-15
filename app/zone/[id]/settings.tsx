import { useEffect, useState, useCallback } from 'react';
import { StyleSheet, View, ScrollView, RefreshControl, Alert } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { IconName } from '@/components/ui/icon';
import { useTheme } from '@/hooks/use-theme';
import { Loading } from '@/components/ui/loading';
import { SectionHeader } from '@/components/ui/section-header';
import { Banner, ChipRow, Group, ListRow, ToggleRow } from '@/components/ui/kit';
import { Spacing } from '@/constants/theme';
import * as api from '@/services/cloudflare';
import { logSetting } from '@/services/change-history';

interface SettingItem {
  id: string;
  icon: IconName;
  value: string;
  editable: boolean;
}

const BROWSER_CACHE_TTL_OPTIONS = [30, 60, 300, 1200, 1800, 3600, 7200, 10800, 14400, 28800, 57600, 86400, 604800, 2592000];

const SETTING_IDS = ['brotli', 'http2', 'http3', '0rtt', 'websockets', 'ipv6', 'early_hints', 'rocket_loader', 'browser_check'];

const ICON_MAP: Record<string, IconName> = {
  brotli: 'zap',
  http2: 'route',
  http3: 'route',
  '0rtt': 'clock',
  websockets: 'network',
  ipv6: 'globe',
  early_hints: 'download',
  rocket_loader: 'zap',
  browser_check: 'shield-check',
};

const PERFORMANCE_IDS = ['brotli', 'http2', 'http3', '0rtt', 'early_hints', 'rocket_loader'];
const NETWORK_IDS = ['websockets', 'ipv6'];

function formatTtl(seconds: number): string {
  if (seconds < 60) return `${seconds}s`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)}d`;
  return `${Math.floor(seconds / 604800)}w`;
}

const TTL_CHIPS = BROWSER_CACHE_TTL_OPTIONS.map((ttl) => ({ value: String(ttl), label: formatTtl(ttl) }));

export default function ZoneSettingsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { t } = useTranslation();
  const { colors } = useTheme();

  const [settings, setSettings] = useState<SettingItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [browserCacheTtl, setBrowserCacheTtl] = useState(14400);
  const [hstsEnabled, setHstsEnabled] = useState(false);
  const [hstsValue, setHstsValue] = useState<any>(null);

  const fetchSettings = useCallback(async () => {
    try {
      const res = await api.getZoneSettings(id);
      const allSettings = res.result ?? [];

      const mapped: SettingItem[] = [];
      for (const s of allSettings) {
        if (SETTING_IDS.includes(s.id)) {
          mapped.push({
            id: s.id,
            icon: ICON_MAP[s.id] ?? 'settings',
            value: String(s.value ?? 'off'),
            editable: s.editable !== false,
          });
        }
        if (s.id === 'browser_cache_ttl') {
          setBrowserCacheTtl(Number(s.value) || 14400);
        }
        if (s.id === 'security_header') {
          const v = s.value;
          if (v?.strict_transport_security) {
            setHstsEnabled(v.strict_transport_security.enabled === true);
            setHstsValue(v);
          }
        }
      }
      setSettings(mapped);
    } catch { /* silent */ }
    setLoading(false);
    setRefreshing(false);
  }, [id]);

  useEffect(() => { fetchSettings(); }, [fetchSettings]);

  const toggleSetting = async (settingId: string, current: string) => {
    const newValue = current === 'on' ? 'off' : 'on';
    setSettings((prev) =>
      prev.map((s) => (s.id === settingId ? { ...s, value: newValue } : s))
    );
    try {
      await api.updateZoneSetting(id, settingId, newValue);
      logSetting(id, settingId, current, newValue);
    } catch {
      setSettings((prev) =>
        prev.map((s) => (s.id === settingId ? { ...s, value: current } : s))
      );
      Alert.alert(t('common.error'), t('zone_settings.update_error'));
    }
  };

  const updateBrowserCacheTtl = async (ttl: number) => {
    const prev = browserCacheTtl;
    setBrowserCacheTtl(ttl);
    try {
      await api.updateZoneSetting(id, 'browser_cache_ttl', ttl);
      logSetting(id, 'browser_cache_ttl', prev, ttl);
    } catch {
      setBrowserCacheTtl(prev);
      Alert.alert(t('common.error'), t('zone_settings.update_error'));
    }
  };

  const toggleHsts = async (value: boolean) => {
    if (!hstsValue) return;
    const prev = hstsEnabled;
    setHstsEnabled(value);
    try {
      await api.updateZoneSetting(id, 'security_header', {
        strict_transport_security: {
          ...hstsValue.strict_transport_security,
          enabled: value,
        },
      });
    } catch {
      setHstsEnabled(prev);
      Alert.alert(t('common.error'), t('zone_settings.update_error'));
    }
  };

  if (loading) return <Loading />;

  const settingRow = (s: SettingItem) => (
    <ToggleRow
      key={s.id}
      icon={s.icon}
      title={t(`zone_settings.${s.id}`)}
      subtitle={t(`zone_settings.${s.id}_desc`)}
      value={s.value === 'on'}
      onValueChange={() => toggleSetting(s.id, s.value)}
      disabled={!s.editable}
    />
  );

  const performance = settings.filter((s) => PERFORMANCE_IDS.includes(s.id));
  const network = settings.filter((s) => NETWORK_IDS.includes(s.id));
  const security = settings.filter((s) => s.id === 'browser_check');

  return (
    <>
      <Stack.Screen options={{ title: t('zone_settings.title') }} />
      <ScrollView
        style={[styles.container, { backgroundColor: colors.background }]}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); fetchSettings(); }} tintColor={colors.primary} />}
      >
        {/* Performance */}
        {performance.length > 0 && (
          <>
            <SectionHeader title={t('zone_settings.performance')} />
            <Group>{performance.map(settingRow)}</Group>
          </>
        )}

        {/* Network */}
        {network.length > 0 && (
          <>
            <SectionHeader title={t('zone_settings.network')} />
            <Group>{network.map(settingRow)}</Group>
          </>
        )}

        {/* Security */}
        {(security.length > 0 || !!hstsValue) && (
          <>
            <SectionHeader title={t('zone_settings.security')} />
            <Group>
              {security.map(settingRow)}
              {!!hstsValue && (
                <ToggleRow
                  icon="enhanced-encryption"
                  title={t('zone_settings.hsts')}
                  subtitle={t('zone_settings.hsts_desc')}
                  value={hstsEnabled}
                  onValueChange={toggleHsts}
                />
              )}
            </Group>
          </>
        )}

        {/* Browser Cache TTL */}
        <SectionHeader title={t('zone_settings.caching')} />
        <Group>
          <ListRow
            icon="clock"
            title={t('zone_settings.browser_cache_ttl')}
            subtitle={t('zone_settings.browser_cache_ttl_desc')}
          />
          <View style={styles.ttlWrap}>
            <ChipRow
              wrap
              options={TTL_CHIPS}
              value={String(browserCacheTtl)}
              onChange={(v) => updateBrowserCacheTtl(Number(v))}
            />
          </View>
        </Group>

        {/* Info */}
        <View style={styles.info}>
          <Banner tone="info" message={t('zone_settings.info')} />
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: Spacing.lg, paddingBottom: Spacing.xxxl },
  ttlWrap: { paddingHorizontal: Spacing.lg, paddingVertical: Spacing.md },
  info: { marginTop: Spacing.lg },
});
