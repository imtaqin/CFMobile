import { useEffect, useState, useCallback } from 'react';
import { StyleSheet, View, Text, ScrollView, RefreshControl, TouchableOpacity, Alert } from 'react-native';
import { router, Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Icon } from '@/components/ui/icon';
import { useTheme } from '@/hooks/use-theme';
import { Loading } from '@/components/ui/loading';
import { EmptyState } from '@/components/ui/empty-state';
import { SectionHeader } from '@/components/ui/section-header';
import { Button } from '@/components/ui/button';
import { Sheet } from '@/components/ui/sheet';
import { Banner, Fab, Field, Group, ListRow } from '@/components/ui/kit';
import { useAuth } from '@/contexts/auth';
import { Spacing, FontSize } from '@/constants/theme';
import * as api from '@/services/cloudflare';
import { SecretsStore, SecretsStoreQuota } from '@/services/cloudflare';
import { useUnlocked } from '@/services/ad-reward';
import { PremiumPaywall } from '@/components/ui/premium-gate';

export default function SecretsStoreScreen() {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const { accountId } = useAuth();
  const premium = useUnlocked('secrets-store');

  const [stores, setStores] = useState<SecretsStore[]>([]);
  const [quota, setQuota] = useState<SecretsStoreQuota | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const [showAdd, setShowAdd] = useState(false);
  const [name, setName] = useState('');

  const errMsg = (e: any) => e?.response?.data?.errors?.[0]?.message ?? e?.message ?? 'Error';

  const fetchAll = useCallback(async () => {
    if (!accountId || !premium) { setLoading(false); return; }
    try {
      const [storesRes, quotaRes] = await Promise.allSettled([
        api.getSecretsStores(accountId),
        api.getSecretsStoreQuota(accountId),
      ]);
      if (storesRes.status === 'fulfilled') setStores(storesRes.value.result ?? []);
      if (quotaRes.status === 'fulfilled') setQuota(quotaRes.value.result ?? null);
      setError(null);
    } catch (e: any) {
      setError(errMsg(e));
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [accountId, premium]);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  const openAdd = () => {
    setName('');
    setShowAdd(true);
  };

  const submitAdd = async () => {
    if (!accountId) return;
    const n = name.trim();
    if (!n) return;
    setSaving(true);
    try {
      const res = await api.createSecretsStore(accountId, n);
      if (res.result) setStores((prev) => [...prev, res.result]);
      setShowAdd(false);
    } catch (e: any) {
      Alert.alert(t('common.error'), errMsg(e));
    } finally {
      setSaving(false);
    }
  };

  const deleteStore = (store: SecretsStore) => {
    if (!accountId) return;
    Alert.alert(t('secrets_store.delete_title'), t('secrets_store.delete_confirm', { name: store.name }), [
      { text: t('common.cancel'), style: 'cancel' },
      {
        text: t('common.delete'),
        style: 'destructive',
        onPress: async () => {
          try {
            await api.deleteSecretsStore(accountId, store.id);
            setStores((prev) => prev.filter((s) => s.id !== store.id));
          } catch (e: any) {
            Alert.alert(t('common.error'), errMsg(e));
          }
        },
      },
    ]);
  };

  if (!premium) {
    return (
      <>
        <Stack.Screen options={{ title: t('secrets_store.title') }} />
        <PremiumPaywall feature="secrets-store" />
      </>
    );
  }

  if (loading) return <Loading />;

  return (
    <>
      <Stack.Screen options={{ title: t('secrets_store.title') }} />
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <ScrollView
          contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 96 }]}
          showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); fetchAll(); }} tintColor={colors.primary} />}
        >
          {error && <Banner message={error} />}

          {quota && (
            <Text style={[styles.quota, { color: colors.textSecondary }, !!error && { marginTop: Spacing.md }]}>
              {t('secrets_store.quota_usage', { usage: quota.secrets.usage, quota: quota.secrets.quota })}
            </Text>
          )}

          <SectionHeader title={t('secrets_store.stores')} />
          {stores.length === 0 ? (
            <EmptyState icon="lock" title={t('secrets_store.no_stores')} message={t('secrets_store.no_stores_message')} />
          ) : (
            stores.map((store) => (
              <Group key={store.id} style={styles.item}>
                <ListRow
                  icon="lock"
                  title={store.name}
                  onPress={() => router.push({ pathname: '/secrets-store/[store]' as any, params: { store: store.id, name: store.name } })}
                  chevron
                  trailing={
                    <TouchableOpacity
                      onPress={() => deleteStore(store)}
                      hitSlop={10}
                      accessibilityRole="button"
                      accessibilityLabel={t('common.delete')}
                    >
                      <Icon name="trash" size={16} color={colors.textTertiary} />
                    </TouchableOpacity>
                  }
                />
              </Group>
            ))
          )}
        </ScrollView>

        <Fab label={t('secrets_store.add_store')} onPress={openAdd} />
      </View>

      <Sheet
        visible={showAdd}
        onClose={() => setShowAdd(false)}
        title={t('secrets_store.add_store')}
        footer={
          <Button
            title={t('common.save')}
            onPress={submitAdd}
            loading={saving}
            disabled={!name.trim()}
          />
        }
      >
        <Field
          label={t('secrets_store.name')}
          placeholder="production"
          value={name}
          onChangeText={setName}
          autoCapitalize="none"
          autoCorrect={false}
        />
      </Sheet>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: Spacing.lg },
  quota: { fontSize: FontSize.sm, paddingHorizontal: Spacing.xs },
  item: { marginBottom: Spacing.sm },
});
