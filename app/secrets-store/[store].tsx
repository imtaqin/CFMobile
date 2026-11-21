import { useEffect, useState, useCallback } from 'react';
import { StyleSheet, View, FlatList, RefreshControl, TouchableOpacity, Alert } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Icon } from '@/components/ui/icon';
import { useTheme } from '@/hooks/use-theme';
import { SkeletonRows, SkeletonHeading } from '@/components/ui/skeleton';
import { EmptyState } from '@/components/ui/empty-state';
import { SectionHeader } from '@/components/ui/section-header';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Sheet } from '@/components/ui/sheet';
import { Fab, Field, Group, ListRow } from '@/components/ui/kit';
import { useAuth } from '@/contexts/auth';
import { Spacing } from '@/constants/theme';
import * as api from '@/services/cloudflare';
import { SecretsStoreSecret } from '@/services/cloudflare';

export default function SecretsStoreDetailScreen() {
  const { store: storeId, name: storeName } = useLocalSearchParams<{ store: string; name: string }>();
  const { t } = useTranslation();
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const { accountId } = useAuth();

  const [secrets, setSecrets] = useState<SecretsStoreSecret[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const [showAdd, setShowAdd] = useState(false);
  const [name, setName] = useState('');
  const [value, setValue] = useState('');
  const [comment, setComment] = useState('');
  const [scopes, setScopes] = useState('workers');

  const errMsg = (e: any) => e?.response?.data?.errors?.[0]?.message ?? e?.message ?? 'Error';

  const fetchSecrets = useCallback(async () => {
    if (!accountId) { setLoading(false); return; }
    try {
      const res = await api.getSecretsStoreSecrets(accountId, storeId);
      setSecrets(res.result ?? []);
      setError(null);
    } catch (e: any) {
      setError(errMsg(e));
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [accountId, storeId]);

  useEffect(() => { fetchSecrets(); }, [fetchSecrets]);

  const openAdd = () => {
    setName('');
    setValue('');
    setComment('');
    setScopes('workers');
    setShowAdd(true);
  };

  const submitAdd = async () => {
    if (!accountId) return;
    const n = name.trim();
    const v = value.trim();
    const scopeList = scopes.split(',').map((s) => s.trim()).filter(Boolean);
    if (!n || !v || scopeList.length === 0) return;
    setSaving(true);
    try {
      const res = await api.createSecretsStoreSecret(accountId, storeId, [{ name: n, value: v, scopes: scopeList, comment: comment.trim() || undefined }]);
      if (res.result) setSecrets((prev) => [...prev, ...res.result]);
      setShowAdd(false);
    } catch (e: any) {
      Alert.alert(t('common.error'), errMsg(e));
    } finally {
      setSaving(false);
    }
  };

  const deleteSecret = (secret: SecretsStoreSecret) => {
    if (!accountId) return;
    Alert.alert(t('secrets_store.delete_secret_title'), t('secrets_store.delete_secret_confirm', { name: secret.name }), [
      { text: t('common.cancel'), style: 'cancel' },
      {
        text: t('common.delete'),
        style: 'destructive',
        onPress: async () => {
          try {
            await api.deleteSecretsStoreSecret(accountId, storeId, secret.id);
            setSecrets((prev) => prev.filter((s) => s.id !== secret.id));
          } catch (e: any) {
            Alert.alert(t('common.error'), errMsg(e));
          }
        },
      },
    ]);
  };

  const statusVariant = (status: SecretsStoreSecret['status']) => {
    if (status === 'active') return 'success' as const;
    if (status === 'deleted') return 'error' as const;
    return 'warning' as const;
  };

  const renderSecret = ({ item }: { item: SecretsStoreSecret }) => (
    <Group style={styles.item}>
      <ListRow
        icon="key"
        title={item.name}
        subtitle={item.comment || undefined}
        meta={item.scopes && item.scopes.length > 0 ? item.scopes.join(', ') : undefined}
        trailing={
          <View style={styles.trailing}>
            <Badge label={item.status} variant={statusVariant(item.status)} />
            <TouchableOpacity
              onPress={() => deleteSecret(item)}
              hitSlop={10}
              accessibilityRole="button"
              accessibilityLabel={t('common.delete')}
            >
              <Icon name="trash" size={16} color={colors.textTertiary} />
            </TouchableOpacity>
          </View>
        }
      />
    </Group>
  );

  if (loading) {
    return (
      <>
        <Stack.Screen options={{ title: storeName ?? t('secrets_store.secrets') }} />
        <View style={[styles.container, { backgroundColor: colors.background, padding: Spacing.lg }]} accessibilityLabel={t('common.loading')}>
          <SkeletonHeading />
          <SkeletonRows count={5} />
        </View>
      </>
    );
  }

  return (
    <>
      <Stack.Screen options={{ title: storeName ?? t('secrets_store.secrets') }} />
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <FlatList
          data={secrets}
          keyExtractor={(item) => item.id}
          renderItem={renderSecret}
          contentContainerStyle={[styles.list, { paddingBottom: insets.bottom + 96 }]}
          showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); fetchSecrets(); }} tintColor={colors.primary} />}
          ListHeaderComponent={<SectionHeader title={t('secrets_store.secrets')} />}
          ListEmptyComponent={<EmptyState icon="key" title={error ? t('common.error') : t('secrets_store.no_secrets')} message={error ?? t('secrets_store.no_secrets_message')} />}
        />

        <Fab label={t('secrets_store.add_secret')} onPress={openAdd} />
      </View>

      <Sheet
        visible={showAdd}
        onClose={() => setShowAdd(false)}
        title={t('secrets_store.add_secret')}
        footer={
          <Button
            title={t('common.save')}
            onPress={submitAdd}
            loading={saving}
            disabled={!name.trim() || !value.trim() || !scopes.trim()}
          />
        }
      >
        <Field
          label={t('secrets_store.secret_name')}
          placeholder="API_KEY"
          value={name}
          onChangeText={setName}
          autoCapitalize="none"
          autoCorrect={false}
          mono
        />
        <Field
          label={t('secrets_store.secret_value')}
          placeholder={t('secrets_store.secret_value_placeholder')}
          value={value}
          onChangeText={setValue}
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry
        />
        <Field
          label={t('secrets_store.scopes')}
          placeholder="workers"
          value={scopes}
          onChangeText={setScopes}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Field
          label={t('secrets_store.comment')}
          placeholder={t('secrets_store.comment_placeholder')}
          value={comment}
          onChangeText={setComment}
        />
      </Sheet>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  list: { paddingHorizontal: Spacing.lg },
  item: { marginBottom: Spacing.sm },
  trailing: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md },
});
