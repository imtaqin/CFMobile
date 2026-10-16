import { useEffect, useState, useCallback } from 'react';
import { StyleSheet, View, FlatList, RefreshControl, TouchableOpacity, Alert } from 'react-native';
import { Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Icon } from '@/components/ui/icon';
import { useTheme } from '@/hooks/use-theme';
import { Loading } from '@/components/ui/loading';
import { EmptyState } from '@/components/ui/empty-state';
import { ListRow } from '@/components/ui/kit';
import { useAuth } from '@/contexts/auth';
import { Spacing, Radius } from '@/constants/theme';
import * as api from '@/services/cloudflare';
import { AddressMap } from '@/services/cloudflare';
import { useUnlocked } from '@/services/ad-reward';
import { PremiumPaywall } from '@/components/ui/premium-gate';

export default function AddressMapsScreen() {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const { accountId } = useAuth();
  const premium = useUnlocked('address-maps');
  const [items, setItems] = useState<AddressMap[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetch = useCallback(async () => {
    if (!accountId || !premium) { setLoading(false); return; }
    try { const r = await api.getAddressMaps(accountId); setItems(r.result ?? []); } catch {}
    finally { setLoading(false); setRefreshing(false); }
  }, [accountId, premium]);

  useEffect(() => { fetch(); }, [fetch]);

  const handleDelete = (m: AddressMap) => {
    if (!accountId) return;
    Alert.alert(t('addr.delete_title'), t('addr.delete_confirm'), [
      { text: t('common.cancel'), style: 'cancel' },
      { text: t('common.delete'), style: 'destructive', onPress: async () => {
        try { await api.deleteAddressMap(accountId, m.id); setItems((p) => p.filter((x) => x.id !== m.id)); }
        catch { Alert.alert(t('common.error'), t('addr.delete_error')); }
      }},
    ]);
  };

  if (!premium) {
    return (
      <>
        <Stack.Screen options={{ title: t('addr.title') }} />
        <PremiumPaywall feature="address-maps" />
      </>
    );
  }

  if (loading) return <Loading />;

  return (
    <>
      <Stack.Screen options={{ title: t('addr.title') }} />
      <FlatList
        data={items}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => (
          <View style={[styles.item, { backgroundColor: colors.surface, borderColor: colors.borderLight }]}>
            <ListRow
              icon="network"
              title={item.description || item.id}
              subtitle={`${item.ips?.length ?? 0} ${t('addr.ips')} · ${item.memberships?.length ?? 0} ${t('addr.memberships')}`}
              trailing={
                <TouchableOpacity
                  onPress={() => handleDelete(item)}
                  hitSlop={10}
                  accessibilityRole="button"
                  accessibilityLabel={t('common.delete')}
                >
                  <Icon name="trash" size={16} color={colors.textTertiary} />
                </TouchableOpacity>
              }
            />
          </View>
        )}
        contentContainerStyle={styles.list}
        style={{ backgroundColor: colors.background }}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); fetch(); }} tintColor={colors.primary} />}
        ListEmptyComponent={<EmptyState icon="network" title={t('addr.no_items')} message={t('addr.no_items_message')} />}
      />
    </>
  );
}

const styles = StyleSheet.create({
  list: { padding: Spacing.lg, paddingBottom: Spacing.xxxl },
  item: { borderRadius: Radius.lg, borderWidth: 1, marginBottom: Spacing.sm, overflow: 'hidden' },
});
