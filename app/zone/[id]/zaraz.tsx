import { useEffect, useState, useCallback } from 'react';
import { StyleSheet, ScrollView, RefreshControl, Alert } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Icon } from '@/components/ui/icon';
import { useTheme } from '@/hooks/use-theme';
import { SkeletonHeading, SkeletonRows } from '@/components/ui/skeleton';
import { EmptyState } from '@/components/ui/empty-state';
import { SectionHeader } from '@/components/ui/section-header';
import { Banner, Group, ListRow, ToggleRow, ValueRow } from '@/components/ui/kit';
import { Spacing } from '@/constants/theme';
import * as api from '@/services/cloudflare';
import { ZarazConfig, ZarazHistoryEntry } from '@/services/cloudflare';

export default function ZarazScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { t } = useTranslation();
  const { colors } = useTheme();

  const [config, setConfig] = useState<ZarazConfig | null>(null);
  const [history, setHistory] = useState<ZarazHistoryEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const errMsg = (e: any) => e?.response?.data?.errors?.[0]?.message ?? e?.message ?? 'Error';

  const fetchAll = useCallback(async () => {
    setError(null);
    try {
      const res = await api.getZarazConfig(id);
      setConfig(res.result);
    } catch (e: any) {
      setError(errMsg(e));
    }
    try {
      const hRes = await api.getZarazHistory(id);
      setHistory(hRes.result ?? []);
    } catch {
      // history read may be unavailable on some plans — non-fatal
    }
    setLoading(false);
    setRefreshing(false);
  }, [id]);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  const updateFlag = async (mutate: (c: ZarazConfig) => ZarazConfig) => {
    if (!config) return;
    const prev = config;
    const next = mutate(config);
    setConfig(next);
    try {
      const res = await api.updateZarazConfig(id, next);
      if (res.result) setConfig(res.result);
    } catch (e: any) {
      setConfig(prev);
      Alert.alert(t('common.error'), errMsg(e));
    }
  };

  const restore = (entry: ZarazHistoryEntry) => {
    Alert.alert(t('zaraz.restore_title'), t('zaraz.restore_confirm', { description: entry.description || entry.id }), [
      { text: t('common.cancel'), style: 'cancel' },
      {
        text: t('zaraz.restore'),
        onPress: async () => {
          try {
            const res = await api.restoreZarazHistory(id, entry.id);
            if (res.result) setConfig(res.result);
            Alert.alert(t('common.success'), t('zaraz.restore_success'));
          } catch (e: any) {
            Alert.alert(t('common.error'), errMsg(e));
          }
        },
      },
    ]);
  };

  if (loading) {
    return (
      <>
        <Stack.Screen options={{ title: t('zaraz.title') }} />
        <ScrollView
          style={[styles.container, { backgroundColor: colors.background }]}
          contentContainerStyle={styles.content}
          scrollEnabled={false}
          accessibilityLabel={t('common.loading')}
        >
          <SkeletonHeading />
          <SkeletonRows count={3} avatar={false} />
          <SkeletonHeading />
          <SkeletonRows count={3} avatar={false} />
        </ScrollView>
      </>
    );
  }

  return (
    <>
      <Stack.Screen options={{ title: t('zaraz.title') }} />
      <ScrollView
        style={[styles.container, { backgroundColor: colors.background }]}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); fetchAll(); }} tintColor={colors.primary} />}
      >
        {error && <Banner message={error} />}

        {config && (
          <>
            <SectionHeader title={t('zaraz.overview')} />
            <Group>
              <ValueRow label={t('zaraz.tools_configured')} value={String(Object.keys(config.tools ?? {}).length)} />
              <ValueRow label={t('zaraz.triggers_configured')} value={String(Object.keys(config.triggers ?? {}).length)} />
              <ValueRow label={t('zaraz.variables_configured')} value={String(Object.keys(config.variables ?? {}).length)} />
            </Group>

            <SectionHeader title={t('zaraz.settings')} />
            <Group>
              <ToggleRow
                title={t('zaraz.consent_mode')}
                subtitle={t('zaraz.consent_mode_desc')}
                value={!!config.consent?.enabled}
                onValueChange={(v) => updateFlag((c) => ({ ...c, consent: { ...(c.consent ?? { enabled: v }), enabled: v } }))}
              />
              <ToggleRow
                title={t('zaraz.data_layer')}
                subtitle={t('zaraz.data_layer_desc')}
                value={config.dataLayer}
                onValueChange={(v) => updateFlag((c) => ({ ...c, dataLayer: v }))}
              />
              <ToggleRow
                title={t('zaraz.spa_support')}
                subtitle={t('zaraz.spa_support_desc')}
                value={!!config.historyChange}
                onValueChange={(v) => updateFlag((c) => ({ ...c, historyChange: v }))}
              />
            </Group>
          </>
        )}

        <SectionHeader title={t('zaraz.history')} />
        {history.length === 0 ? (
          <EmptyState icon="clock" title={t('zaraz.no_history')} message={t('zaraz.no_history_message')} />
        ) : (
          <Group>
            {history.map((h) => (
              <ListRow
                key={h.id}
                icon="clock"
                title={h.description || t('zaraz.untitled_config')}
                subtitle={new Date(h.updatedAt).toLocaleString()}
                onPress={() => restore(h)}
                trailing={<Icon name="refresh" size={16} color={colors.textTertiary} />}
              />
            ))}
          </Group>
        )}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: Spacing.lg, paddingBottom: Spacing.xxxl },
});
