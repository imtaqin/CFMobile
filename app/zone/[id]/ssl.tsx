import { useEffect, useState, useCallback } from 'react';
import { StyleSheet, ScrollView, RefreshControl, Alert } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { IconName } from '@/components/ui/icon';
import { useTheme } from '@/hooks/use-theme';
import { Badge } from '@/components/ui/badge';
import { Loading } from '@/components/ui/loading';
import { SectionHeader } from '@/components/ui/section-header';
import { ChipRow, Group, ListRow, ToggleRow } from '@/components/ui/kit';
import { Spacing } from '@/constants/theme';
import * as api from '@/services/cloudflare';
import { logSetting } from '@/services/change-history';

const SSL_MODES: { value: string; icon: IconName }[] = [
  { value: 'off', icon: 'lock-open' },
  { value: 'flexible', icon: 'lock-outline' },
  { value: 'full', icon: 'lock' },
  { value: 'strict', icon: 'enhanced-encryption' },
];

const TLS_VERSIONS = ['1.0', '1.1', '1.2', '1.3'];

export default function SSLScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { t } = useTranslation();
  const { colors } = useTheme();

  const [sslMode, setSslMode] = useState('off');
  const [alwaysHttps, setAlwaysHttps] = useState(false);
  const [minTls, setMinTls] = useState('1.0');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchSettings = useCallback(async () => {
    try {
      const [sslRes, httpsRes, tlsRes] = await Promise.allSettled([
        api.getSSLSetting(id),
        api.getAlwaysUseHTTPS(id),
        api.getMinTLSVersion(id),
      ]);
      if (sslRes.status === 'fulfilled') setSslMode(sslRes.value.result.value);
      if (httpsRes.status === 'fulfilled') setAlwaysHttps(httpsRes.value.result.value === 'on');
      if (tlsRes.status === 'fulfilled') setMinTls(tlsRes.value.result.value);
    } catch { /* silent */ }
    setLoading(false);
    setRefreshing(false);
  }, [id]);

  useEffect(() => { fetchSettings(); }, [fetchSettings]);

  const updateSSL = async (value: string) => {
    const prev = sslMode;
    setSslMode(value);
    try {
      await api.updateSSLSetting(id, value);
      logSetting(id, 'ssl', prev, value);
    } catch {
      setSslMode(prev);
      Alert.alert(t('common.error'), t('ssl.update_error'));
    }
  };

  const updateHttps = async (value: boolean) => {
    const prev = alwaysHttps;
    setAlwaysHttps(value);
    try {
      await api.updateAlwaysUseHTTPS(id, value ? 'on' : 'off');
      logSetting(id, 'always_use_https', prev ? 'on' : 'off', value ? 'on' : 'off');
    } catch {
      setAlwaysHttps(prev);
      Alert.alert(t('common.error'), t('ssl.update_error'));
    }
  };

  const updateTls = async (value: string) => {
    const prev = minTls;
    setMinTls(value);
    try {
      await api.updateMinTLSVersion(id, value);
      logSetting(id, 'min_tls_version', prev, value);
    } catch {
      setMinTls(prev);
      Alert.alert(t('common.error'), t('ssl.update_error'));
    }
  };

  if (loading) return <Loading />;

  return (
    <>
      <Stack.Screen options={{ title: t('ssl.title') }} />
      <ScrollView
        style={[styles.container, { backgroundColor: colors.background }]}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); fetchSettings(); }} tintColor={colors.primary} />}
      >
        {/* Encryption mode: pick one */}
        <SectionHeader title={t('ssl.encryption_mode')} />
        <Group>
          {SSL_MODES.map((mode) => {
            const active = sslMode === mode.value;
            return (
              <ListRow
                key={mode.value}
                icon={mode.icon}
                iconTone={active ? 'success' : 'neutral'}
                title={t(`ssl.mode_${mode.value}`)}
                subtitle={t(`ssl.mode_${mode.value}_desc`)}
                onPress={() => updateSSL(mode.value)}
                chevron={false}
                trailing={active ? <Badge label={t('ssl.active')} variant="success" /> : undefined}
              />
            );
          })}
        </Group>

        {/* Always Use HTTPS */}
        <SectionHeader title={t('ssl.options')} />
        <Group>
          <ToggleRow
            icon="https"
            title={t('ssl.always_https')}
            subtitle={t('ssl.always_https_desc')}
            value={alwaysHttps}
            onValueChange={updateHttps}
          />
        </Group>

        {/* Minimum TLS version */}
        <SectionHeader title={t('ssl.min_tls')} />
        <ChipRow
          options={TLS_VERSIONS.map((v) => ({ value: v, label: `TLS ${v}` }))}
          value={minTls}
          onChange={updateTls}
        />
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: Spacing.lg, paddingBottom: Spacing.xxxl },
});
