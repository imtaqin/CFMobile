import { useEffect, useState, useCallback } from 'react';
import { StyleSheet, View, FlatList, RefreshControl, TouchableOpacity, Alert } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Icon } from '@/components/ui/icon';
import { useTheme } from '@/hooks/use-theme';
import { Loading } from '@/components/ui/loading';
import { EmptyState } from '@/components/ui/empty-state';
import { Badge } from '@/components/ui/badge';
import { ListRow } from '@/components/ui/kit';
import { Spacing, Radius } from '@/constants/theme';
import * as api from '@/services/cloudflare';
import { Web3Hostname } from '@/services/cloudflare';
import { useUnlocked } from '@/services/ad-reward';
import { PremiumPaywall } from '@/components/ui/premium-gate';

export default function Web3Screen() {
  const { id: zoneId } = useLocalSearchParams<{ id: string }>();
  const { t } = useTranslation();
  const { colors } = useTheme();
  const premium = useUnlocked('web3');
  const [items, setItems] = useState<Web3Hostname[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetch = useCallback(async () => {
    if (!premium) { setLoading(false); return; }
    try { const r = await api.getWeb3Hostnames(zoneId); setItems(r.result ?? []); } catch {}
    finally { setLoading(false); setRefreshing(false); }
  }, [zoneId, premium]);

  useEffect(() => { fetch(); }, [fetch]);

  const handleDelete = (h: Web3Hostname) => {
    Alert.alert(t('web3.delete_title'), t('web3.delete_confirm', { name: h.name }), [
      { text: t('common.cancel'), style: 'cancel' },
      { text: t('common.delete'), style: 'destructive', onPress: async () => {
        try { await api.deleteWeb3Hostname(zoneId, h.id); setItems((p) => p.filter((x) => x.id !== h.id)); }
        catch { Alert.alert(t('common.error'), t('web3.delete_error')); }
      }},
    ]);
  };

  if (!premium) {
    return (
      <>
        <Stack.Screen options={{ title: t('web3.title') }} />
        <PremiumPaywall feature="web3" />
      </>
    );
  }

  if (loading) return <Loading />;

  return (
    <>
      <Stack.Screen options={{ title: t('web3.title') }} />
      <FlatList
        data={items}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => (
          <View style={[styles.item, { backgroundColor: colors.surface, borderColor: colors.borderLight }]}>
            <ListRow
              icon="globe"
              title={item.name}
              subtitle={`${item.target} · ${item.status}`}
              mono
              trailing={
                <>
                  <View>
                    <Badge label={item.status} variant={item.status === 'active' ? 'success' : 'default'} />
                  </View>
                  <TouchableOpacity
                    onPress={() => handleDelete(item)}
                    hitSlop={10}
                    accessibilityRole="button"
                    accessibilityLabel={t('common.delete')}
                  >
                    <Icon name="trash" size={16} color={colors.textTertiary} />
                  </TouchableOpacity>
                </>
              }
            />
          </View>
        )}
        contentContainerStyle={styles.list}
        style={{ backgroundColor: colors.background }}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); fetch(); }} tintColor={colors.primary} />}
        ListEmptyComponent={<EmptyState icon="globe" title={t('web3.no_items')} message={t('web3.no_items_message')} />}
      />
    </>
  );
}

const styles = StyleSheet.create({
  list: { padding: Spacing.lg, paddingBottom: Spacing.xxxl },
  item: { borderRadius: Radius.lg, borderWidth: 1, marginBottom: Spacing.sm, overflow: 'hidden' },
});
