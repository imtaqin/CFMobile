import { useEffect, useState, useCallback } from 'react';
import {
  StyleSheet, View, Text, FlatList, TouchableOpacity,
  ActivityIndicator, RefreshControl, Alert,
} from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Icon } from '@/components/ui/icon';
import { useTheme } from '@/hooks/use-theme';
import { Skeleton, SkeletonRows } from '@/components/ui/skeleton';
import { EmptyState } from '@/components/ui/empty-state';
import { Button } from '@/components/ui/button';
import { Sheet } from '@/components/ui/sheet';
import { Banner, Fab, Field, FieldLabel, IconCircle, SearchBar } from '@/components/ui/kit';
import { useAuth } from '@/contexts/auth';
import { Spacing, FontSize, Radius } from '@/constants/theme';
import * as api from '@/services/cloudflare';
import { track } from '@/services/analytics';

interface KVKey {
  name: string;
  expiration?: number;
}

export default function KVBrowserScreen() {
  const { ns, name } = useLocalSearchParams<{ ns: string; name?: string }>();
  const { t } = useTranslation();
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const { accountId } = useAuth();

  const [keys, setKeys] = useState<KVKey[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // value editor
  const [editing, setEditing] = useState<{ key: string; value: string; isNew: boolean } | null>(null);
  const [valueLoading, setValueLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const errMsg = (e: any) => e?.response?.data?.errors?.[0]?.message ?? e?.message ?? 'Error';

  const load = useCallback(async () => {
    if (!accountId) { setLoading(false); return; }
    try {
      const res = await api.getKVKeys(accountId, ns, 1);
      setKeys(res.result ?? []);
      setError(null);
    } catch (e: any) {
      setError(errMsg(e));
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [accountId, ns]);

  useEffect(() => { track('kv_opened', { once: true }); }, []);

  useEffect(() => { load(); }, [load]);

  const openKey = async (key: string) => {
    if (!accountId) return;
    setEditing({ key, value: '', isNew: false });
    setValueLoading(true);
    try {
      const raw = await api.getKVValue(accountId, ns, key);
      // pretty-print JSON values so they're readable on a phone
      let pretty = raw;
      try {
        pretty = JSON.stringify(JSON.parse(raw), null, 2);
      } catch {
        // plain string value
      }
      setEditing({ key, value: pretty, isNew: false });
    } catch (e: any) {
      Alert.alert(t('common.error'), errMsg(e));
      setEditing(null);
    } finally {
      setValueLoading(false);
    }
  };

  const save = async () => {
    if (!accountId || !editing) return;
    if (!editing.key.trim()) {
      Alert.alert(t('common.error'), t('kv.key_required'));
      return;
    }
    setSaving(true);
    try {
      // send compact JSON when the value parses, otherwise the raw text
      let payload = editing.value;
      try {
        payload = JSON.stringify(JSON.parse(editing.value));
      } catch {
        // keep as-is
      }
      await api.putKVValue(accountId, ns, editing.key.trim(), payload);
      setEditing(null);
      load();
    } catch (e: any) {
      Alert.alert(t('common.error'), errMsg(e));
    } finally {
      setSaving(false);
    }
  };

  const remove = (key: string) => {
    Alert.alert(t('kv.delete_title'), t('kv.delete_confirm', { key }), [
      { text: t('common.cancel'), style: 'cancel' },
      {
        text: t('common.delete'),
        style: 'destructive',
        onPress: async () => {
          if (!accountId) return;
          try {
            await api.deleteKVValue(accountId, ns, key);
            setKeys((prev) => prev.filter((k) => k.name !== key));
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
        <Stack.Screen options={{ title: name || t('kv.title') }} />
        <View style={[styles.container, { backgroundColor: colors.background, padding: Spacing.lg }]} accessibilityLabel={t('common.loading')}>
          <Skeleton width="100%" height={40} style={{ marginBottom: Spacing.md }} />
          <SkeletonRows count={6} />
        </View>
      </>
    );
  }

  const filtered = search
    ? keys.filter((k) => k.name.toLowerCase().includes(search.toLowerCase()))
    : keys;

  return (
    <>
      <Stack.Screen options={{ title: name || t('kv.title') }} />
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <SearchBar
          value={search}
          onChangeText={setSearch}
          placeholder={t('kv.search')}
          style={styles.search}
        />

        {error && (
          <View style={styles.error}>
            <Banner message={error} />
          </View>
        )}

        {keys.length > 0 && (
          <Text style={[styles.count, { color: colors.textTertiary }]}>
            {t('kv.key_count', { count: filtered.length })}
          </Text>
        )}

        <FlatList
          data={filtered}
          keyExtractor={(item) => item.name}
          contentContainerStyle={[styles.list, { paddingBottom: insets.bottom + 96 }]}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); load(); }} tintColor={colors.primary} />
          }
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => openKey(item.name)}
              activeOpacity={0.7}
              style={[styles.keyRow, { backgroundColor: colors.surface, borderColor: colors.borderLight }]}
            >
              <IconCircle name="key" />
              <View style={styles.keyBody}>
                <Text style={[styles.keyName, { color: colors.text }]} numberOfLines={1}>{item.name}</Text>
                {item.expiration && (
                  <Text style={[styles.keyMeta, { color: colors.textTertiary }]}>
                    {t('kv.expires', { date: new Date(item.expiration * 1000).toLocaleDateString() })}
                  </Text>
                )}
              </View>
              <TouchableOpacity
                onPress={() => remove(item.name)}
                hitSlop={10}
                accessibilityRole="button"
                accessibilityLabel={t('common.delete')}
              >
                <Icon name="trash" size={16} color={colors.textTertiary} />
              </TouchableOpacity>
            </TouchableOpacity>
          )}
          ListEmptyComponent={<EmptyState icon="key" title={t('kv.no_keys')} message={t('kv.no_keys_message')} />}
        />

        <Fab label={t('kv.new_key')} onPress={() => setEditing({ key: '', value: '', isNew: true })} />
      </View>

      {/* Value editor */}
      <Sheet
        visible={!!editing}
        onClose={() => setEditing(null)}
        title={editing?.isNew ? t('kv.new_key') : t('kv.edit_key')}
        footer={<Button title={t('common.save')} onPress={save} loading={saving} />}
      >
        <Field
          label={t('kv.key')}
          value={editing?.key ?? ''}
          onChangeText={(v) => setEditing((e) => (e ? { ...e, key: v } : e))}
          editable={editing?.isNew}
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="my:key"
          mono
          style={styles.keyInput}
        />

        {valueLoading ? (
          <>
            <FieldLabel>{t('kv.value')}</FieldLabel>
            <ActivityIndicator style={styles.spinner} color={colors.primary} />
          </>
        ) : (
          <Field
            label={t('kv.value')}
            value={editing?.value ?? ''}
            onChangeText={(v) => setEditing((e) => (e ? { ...e, value: v } : e))}
            multiline
            autoCapitalize="none"
            autoCorrect={false}
            placeholder='{"hello":"world"}'
            mono
            style={styles.valueInput}
          />
        )}
      </Sheet>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  search: { marginHorizontal: Spacing.lg, marginTop: Spacing.sm, marginBottom: Spacing.md },
  error: { marginHorizontal: Spacing.lg, marginBottom: Spacing.sm },
  count: { fontSize: FontSize.xs, paddingHorizontal: Spacing.lg + Spacing.xs, paddingBottom: Spacing.sm },
  list: { paddingHorizontal: Spacing.lg },
  keyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    paddingHorizontal: Spacing.lg,
    paddingVertical: 13,
    borderRadius: Radius.lg,
    borderWidth: 1,
    marginBottom: Spacing.sm,
  },
  keyBody: { flex: 1, gap: 2 },
  keyName: { fontSize: FontSize.sm, fontFamily: 'monospace' },
  keyMeta: { fontSize: FontSize.xs },
  keyInput: { fontSize: FontSize.sm },
  valueInput: { fontSize: FontSize.sm, minHeight: 140, maxHeight: 260 },
  spinner: { paddingVertical: Spacing.xxl },
});
