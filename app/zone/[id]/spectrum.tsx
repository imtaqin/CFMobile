import { useEffect, useState, useCallback } from 'react';
import { StyleSheet, FlatList, RefreshControl, TouchableOpacity, Alert } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Icon } from '@/components/ui/icon';
import { useTheme } from '@/hooks/use-theme';
import { Loading } from '@/components/ui/loading';
import { EmptyState } from '@/components/ui/empty-state';
import { Group, ListRow } from '@/components/ui/kit';
import { useAuth } from '@/contexts/auth';
import { Spacing } from '@/constants/theme';
import * as api from '@/services/cloudflare';
import { SpectrumApp } from '@/services/cloudflare';
import { useUnlocked } from '@/services/ad-reward';
import { PremiumPaywall } from '@/components/ui/premium-gate';

export default function SpectrumScreen() {
  const { id: zoneId } = useLocalSearchParams<{ id: string }>();
  const { t } = useTranslation();
  const { colors } = useTheme();
  const { accountId } = useAuth();
  const premium = useUnlocked('spectrum');

  const [apps, setApps] = useState<SpectrumApp[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchApps = useCallback(async () => {
    if (!premium) { setLoading(false); return; }
    try {
      const res = await api.getSpectrumApps(zoneId);
      setApps(res.result ?? []);
    } catch { /* silent */ }
    finally { setLoading(false); setRefreshing(false); }
  }, [zoneId, premium]);

  useEffect(() => { fetchApps(); }, [fetchApps]);

  const handleDelete = (app: SpectrumApp) => {
    Alert.alert(t('spectrum.delete_title'), t('spectrum.delete_confirm', { name: app.dns?.name ?? app.id }), [
      { text: t('common.cancel'), style: 'cancel' },
      { text: t('common.delete'), style: 'destructive', onPress: async () => {
        // The app id is the third argument; the account id is not part of the request path.
        try { await api.deleteSpectrumApp(zoneId, accountId ?? '', app.id); setApps((p) => p.filter((a) => a.id !== app.id)); }
        catch { Alert.alert(t('common.error'), t('spectrum.delete_error')); }
      }},
    ]);
  };

  const renderApp = ({ item }: { item: SpectrumApp }) => (
    <Group style={styles.item}>
      <ListRow
        icon="network"
        title={item.dns?.name ?? item.id}
        subtitle={`${item.protocol} · ${item.traffic_type} · TLS: ${item.tls}`}
        mono
        meta={item.argo_smart_routing ? t('spectrum.argo') : undefined}
        trailing={
          <TouchableOpacity
            onPress={() => handleDelete(item)}
            hitSlop={10}
            style={styles.iconButton}
            accessibilityRole="button"
            accessibilityLabel={t('common.delete')}
          >
            <Icon name="trash" size={16} color={colors.textTertiary} />
          </TouchableOpacity>
        }
      />
    </Group>
  );

  if (!premium) {
    return (
      <>
        <Stack.Screen options={{ title: t('spectrum.title') }} />
        <PremiumPaywall feature="spectrum" />
      </>
    );
  }

  if (loading) return <Loading />;

  return (
    <>
      <Stack.Screen options={{ title: t('spectrum.title') }} />
      <FlatList
        data={apps}
        keyExtractor={(item) => item.id}
        renderItem={renderApp}
        contentContainerStyle={styles.list}
        style={{ backgroundColor: colors.background }}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); fetchApps(); }} tintColor={colors.primary} />}
        ListEmptyComponent={<EmptyState icon="network" title={t('spectrum.no_apps')} message={t('spectrum.no_apps_message')} />}
      />
    </>
  );
}

const styles = StyleSheet.create({
  list: { padding: Spacing.lg, paddingBottom: Spacing.xxxl },
  item: { marginBottom: Spacing.sm },
  iconButton: { padding: 4 },
});
