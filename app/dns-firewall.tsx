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
import { DNSFirewallCluster } from '@/services/cloudflare';
import { useUnlocked } from '@/services/ad-reward';
import { PremiumPaywall } from '@/components/ui/premium-gate';

export default function DNSFirewallScreen() {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const { accountId } = useAuth();
  const premium = useUnlocked('dns-firewall');
  const [items, setItems] = useState<DNSFirewallCluster[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetch = useCallback(async () => {
    if (!accountId || !premium) { setLoading(false); return; }
    try { const r = await api.getDNSFirewallClusters(accountId); setItems(r.result ?? []); } catch {}
    finally { setLoading(false); setRefreshing(false); }
  }, [accountId, premium]);

  useEffect(() => { fetch(); }, [fetch]);

  const handleDelete = (c: DNSFirewallCluster) => {
    if (!accountId) return;
    Alert.alert(t('dns_fw.delete_title'), t('dns_fw.delete_confirm', { name: c.name }), [
      { text: t('common.cancel'), style: 'cancel' },
      { text: t('common.delete'), style: 'destructive', onPress: async () => {
        try { await api.deleteDNSFirewallCluster(accountId, c.id); setItems((p) => p.filter((x) => x.id !== c.id)); }
        catch { Alert.alert(t('common.error'), t('dns_fw.delete_error')); }
      }},
    ]);
  };

  if (!premium) {
    return (
      <>
        <Stack.Screen options={{ title: t('dns_fw.title') }} />
        <PremiumPaywall feature="dns-firewall" />
      </>
    );
  }

  if (loading) return <Loading />;

  return (
    <>
      <Stack.Screen options={{ title: t('dns_fw.title') }} />
      <FlatList
        data={items}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => (
          <View style={[styles.item, { backgroundColor: colors.surface, borderColor: colors.borderLight }]}>
            <ListRow
              icon="shield"
              title={item.name}
              subtitle={`${item.dns_firewall_ips?.length ?? 0} ${t('dns_fw.ips')}`}
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
        ListEmptyComponent={<EmptyState icon="shield" title={t('dns_fw.no_items')} message={t('dns_fw.no_items_message')} />}
      />
    </>
  );
}

const styles = StyleSheet.create({
  list: { padding: Spacing.lg, paddingBottom: Spacing.xxxl },
  item: { borderRadius: Radius.lg, borderWidth: 1, marginBottom: Spacing.sm, overflow: 'hidden' },
});
