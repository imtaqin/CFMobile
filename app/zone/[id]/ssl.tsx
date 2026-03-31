import { useEffect, useState, useCallback } from 'react';
import {
  StyleSheet, View, Text, ScrollView, RefreshControl, Alert, Switch, TouchableOpacity,
} from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Icon, IconName } from '@/components/ui/icon';
import { useTheme } from '@/hooks/use-theme';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loading } from '@/components/ui/loading';
import { SectionHeader } from '@/components/ui/section-header';
import { Spacing, FontSize, Radius } from '@/constants/theme';
import * as api from '@/services/cloudflare';

const SSL_MODES = [
  { value: 'off', icon: 'lock-open', color: '#EF4444' },
  { value: 'flexible', icon: 'lock-outline', color: '#F59E0B' },
  { value: 'full', icon: 'lock', color: '#3B82F6' },
  { value: 'strict', icon: 'enhanced-encryption', color: '#10B981' },
] as const;

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
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); fetchSettings(); }} tintColor={colors.primary} />}
      >
        {/* SSL Mode */}
        <SectionHeader title={t('ssl.encryption_mode')} />
        <View style={styles.modeGrid}>
          {SSL_MODES.map((mode) => (
            <Card
              key={mode.value}
              onPress={() => updateSSL(mode.value)}
              style={[
                styles.modeCard,
                sslMode === mode.value && { borderWidth: 2, borderColor: mode.color },
              ]}
            >
              <Icon name={mode.icon as IconName} size={28} color={mode.color} />
              <Text style={[styles.modeTitle, { color: colors.text }]}>
                {t(`ssl.mode_${mode.value}`)}
              </Text>
              <Text style={[styles.modeDesc, { color: colors.textSecondary }]} numberOfLines={2}>
                {t(`ssl.mode_${mode.value}_desc`)}
              </Text>
              {sslMode === mode.value && (
                <Badge label={t('ssl.active')} variant="success" />
              )}
            </Card>
          ))}
        </View>

        {/* Always Use HTTPS */}
        <SectionHeader title={t('ssl.options')} />
        <Card>
          <View style={styles.toggleRow}>
            <Icon name="https" size={22} color={colors.success} />
            <View style={{ flex: 1 }}>
              <Text style={[styles.toggleTitle, { color: colors.text }]}>{t('ssl.always_https')}</Text>
              <Text style={[styles.toggleDesc, { color: colors.textSecondary }]}>{t('ssl.always_https_desc')}</Text>
            </View>
            <Switch
              value={alwaysHttps}
              onValueChange={updateHttps}
              trackColor={{ true: colors.primary }}
            />
          </View>
        </Card>

        {/* Min TLS Version */}
        <SectionHeader title={t('ssl.min_tls')} />
        <Card>
          <View style={styles.tlsGrid}>
            {TLS_VERSIONS.map((v) => (
              <TouchableOpacity
                key={v}
                onPress={() => updateTls(v)}
                style={[
                  styles.tlsChip,
                  {
                    backgroundColor: minTls === v ? colors.primary : colors.surfaceSecondary,
                    borderColor: minTls === v ? colors.primary : colors.border,
                  },
                ]}
              >
                <Text style={{
                  fontSize: FontSize.sm,
                  fontWeight: '600',
                  color: minTls === v ? '#FFF' : colors.text,
                }}>
                  TLS {v}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Card>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: Spacing.lg, paddingBottom: Spacing.xxxl },
  modeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },
  modeCard: {
    flexBasis: '47%',
    flexGrow: 1,
    alignItems: 'center' as const,
    gap: Spacing.xs,
    paddingVertical: Spacing.lg,
  },
  modeTitle: { fontSize: FontSize.md, fontWeight: '600', textTransform: 'capitalize' },
  modeDesc: { fontSize: FontSize.xs, textAlign: 'center', paddingHorizontal: Spacing.xs },
  toggleRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md },
  toggleTitle: { fontSize: FontSize.md, fontWeight: '500' },
  toggleDesc: { fontSize: FontSize.sm, marginTop: 2 },
  tlsGrid: { flexDirection: 'row', gap: Spacing.sm },
  tlsChip: {
    flex: 1,
    paddingVertical: Spacing.md,
    borderRadius: Radius.md,
    borderWidth: 1,
    alignItems: 'center',
  },
});
