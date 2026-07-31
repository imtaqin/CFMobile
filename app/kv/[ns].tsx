import { useEffect, useState, useCallback } from 'react';
import {
  StyleSheet, View, Text, FlatList, TouchableOpacity, TextInput, Modal,
  ActivityIndicator, RefreshControl, Alert, ScrollView,
} from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Icon } from '@/components/ui/icon';
import { useTheme } from '@/hooks/use-theme';
import { Card } from '@/components/ui/card';
import { Loading } from '@/components/ui/loading';
import { EmptyState } from '@/components/ui/empty-state';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/auth';
import { Spacing, FontSize, Radius, CF } from '@/constants/theme';
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

  if (loading) return <Loading />;

  const filtered = search
    ? keys.filter((k) => k.name.toLowerCase().includes(search.toLowerCase()))
    : keys;

  return (
    <>
      <Stack.Screen options={{ title: name || t('kv.title') }} />
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={[styles.searchBar, { backgroundColor: colors.surface, borderColor: colors.borderLight }]}>
          <Icon name="search" size={17} color={colors.textTertiary} />
          <TextInput
            style={[styles.searchInput, { color: colors.text }]}
            placeholder={t('kv.search')}
            placeholderTextColor={colors.textTertiary}
            value={search}
            onChangeText={setSearch}
            autoCapitalize="none"
            autoCorrect={false}
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={() => setSearch('')} hitSlop={8}>
              <Icon name="close" size={16} color={colors.textTertiary} />
            </TouchableOpacity>
          )}
        </View>

        {error && (
          <View style={[styles.errorBar, { backgroundColor: colors.error + '15' }]}>
            <Icon name="error-circle" size={15} color={colors.error} />
            <Text style={[styles.errorText, { color: colors.error }]} numberOfLines={2}>{error}</Text>
          </View>
        )}

        {keys.length > 0 && (
          <Text style={[styles.count, { color: colors.textSecondary }]}>
            {t('kv.key_count', { count: filtered.length })}
          </Text>
        )}

        <FlatList
          data={filtered}
          keyExtractor={(item) => item.name}
          contentContainerStyle={styles.list}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); load(); }} tintColor={colors.primary} />
          }
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => openKey(item.name)} activeOpacity={0.7}>
              <Card style={styles.keyCard}>
                <View style={[styles.keyIcon, { backgroundColor: colors.warning + '15' }]}>
                  <Icon name="key" size={16} color={colors.warning} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.keyName, { color: colors.text }]} numberOfLines={1}>{item.name}</Text>
                  {item.expiration && (
                    <Text style={[styles.keyMeta, { color: colors.textTertiary }]}>
                      {t('kv.expires', { date: new Date(item.expiration * 1000).toLocaleDateString() })}
                    </Text>
                  )}
                </View>
                <TouchableOpacity onPress={() => remove(item.name)} hitSlop={8} style={{ padding: 4 }}>
                  <Icon name="trash" size={16} color={colors.error} />
                </TouchableOpacity>
              </Card>
            </TouchableOpacity>
          )}
          ListEmptyComponent={<EmptyState icon="key" title={t('kv.no_keys')} message={t('kv.no_keys_message')} />}
        />

        <TouchableOpacity
          style={[styles.fab, { backgroundColor: CF.orange }]}
          onPress={() => setEditing({ key: '', value: '', isNew: true })}
          activeOpacity={0.85}
        >
          <Icon name="plus" size={24} color="#FFF" />
        </TouchableOpacity>
      </View>

      {/* Value editor */}
      <Modal visible={!!editing} animationType="slide" transparent onRequestClose={() => setEditing(null)}>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalCard, { backgroundColor: colors.surface }]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: colors.text }]}>
                {editing?.isNew ? t('kv.new_key') : t('kv.edit_key')}
              </Text>
              <TouchableOpacity onPress={() => setEditing(null)} hitSlop={8}>
                <Icon name="close" size={22} color={colors.textSecondary} />
              </TouchableOpacity>
            </View>

            <Text style={[styles.label, { color: colors.textSecondary }]}>{t('kv.key')}</Text>
            <TextInput
              style={[styles.keyInput, { color: colors.text, backgroundColor: colors.surfaceSecondary, borderColor: colors.border }]}
              value={editing?.key ?? ''}
              onChangeText={(v) => setEditing((e) => (e ? { ...e, key: v } : e))}
              editable={editing?.isNew}
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="my:key"
              placeholderTextColor={colors.textTertiary}
            />

            <Text style={[styles.label, { color: colors.textSecondary }]}>{t('kv.value')}</Text>
            {valueLoading ? (
              <ActivityIndicator style={{ paddingVertical: Spacing.xxl }} color={colors.primary} />
            ) : (
              <ScrollView style={[styles.valueBox, { backgroundColor: colors.surfaceSecondary, borderColor: colors.border }]}>
                <TextInput
                  style={[styles.valueInput, { color: colors.text }]}
                  value={editing?.value ?? ''}
                  onChangeText={(v) => setEditing((e) => (e ? { ...e, value: v } : e))}
                  multiline
                  autoCapitalize="none"
                  autoCorrect={false}
                  placeholder='{"hello":"world"}'
                  placeholderTextColor={colors.textTertiary}
                />
              </ScrollView>
            )}

            <Button title={t('common.save')} onPress={save} loading={saving} style={{ marginTop: Spacing.md }} />
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    margin: Spacing.lg,
    marginBottom: Spacing.sm,
    paddingHorizontal: Spacing.md,
    height: 44,
    borderRadius: Radius.md,
    borderWidth: 1,
  },
  searchInput: { flex: 1, fontSize: FontSize.sm },
  errorBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginHorizontal: Spacing.lg,
    padding: Spacing.sm,
    borderRadius: Radius.sm,
  },
  errorText: { fontSize: FontSize.xs, flex: 1, lineHeight: 16 },
  count: { fontSize: FontSize.xs, paddingHorizontal: Spacing.lg, paddingBottom: Spacing.xs },
  list: { paddingHorizontal: Spacing.lg, paddingBottom: 100 },
  keyCard: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md, marginBottom: Spacing.sm },
  keyIcon: {
    width: 34, height: 34, borderRadius: Radius.sm,
    alignItems: 'center', justifyContent: 'center',
  },
  keyName: { fontSize: FontSize.xs, fontWeight: '700', fontFamily: 'monospace' },
  keyMeta: { fontSize: 10, marginTop: 2 },
  fab: {
    position: 'absolute',
    right: Spacing.lg,
    bottom: Spacing.xl,
    width: 56, height: 56, borderRadius: 28,
    alignItems: 'center', justifyContent: 'center',
    elevation: 6,
    shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 8, shadowOffset: { width: 0, height: 4 },
  },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modalCard: {
    borderTopLeftRadius: Radius.xl,
    borderTopRightRadius: Radius.xl,
    padding: Spacing.lg,
    paddingBottom: Spacing.xxxl,
    maxHeight: '85%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  modalTitle: { fontSize: FontSize.lg, fontWeight: '800' },
  label: {
    fontSize: 10,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginTop: Spacing.md,
    marginBottom: Spacing.xs,
  },
  keyInput: {
    borderWidth: 1,
    borderRadius: Radius.sm,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    fontSize: FontSize.sm,
    fontFamily: 'monospace',
  },
  valueBox: {
    borderWidth: 1,
    borderRadius: Radius.sm,
    maxHeight: 260,
    padding: Spacing.sm,
  },
  valueInput: {
    fontSize: FontSize.xs,
    fontFamily: 'monospace',
    minHeight: 140,
    textAlignVertical: 'top',
  },
});
