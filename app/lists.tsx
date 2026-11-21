import { useEffect, useState, useCallback } from 'react';
import { StyleSheet, View, ScrollView, RefreshControl, TouchableOpacity, Alert } from 'react-native';
import { router, Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Icon, IconName } from '@/components/ui/icon';
import { useTheme } from '@/hooks/use-theme';
import { SkeletonRows, SkeletonHeading } from '@/components/ui/skeleton';
import { EmptyState } from '@/components/ui/empty-state';
import { SectionHeader } from '@/components/ui/section-header';
import { Button } from '@/components/ui/button';
import { Sheet } from '@/components/ui/sheet';
import { Banner, ChipRow, Fab, Field, FieldLabel, Group, ListRow } from '@/components/ui/kit';
import { useAuth } from '@/contexts/auth';
import { Spacing } from '@/constants/theme';
import * as api from '@/services/cloudflare';
import { CFList, ListKind } from '@/services/cloudflare';

const KINDS: ListKind[] = ['ip', 'hostname', 'asn', 'redirect'];

const kindIcon = (k: ListKind): IconName =>
  k === 'ip' ? 'network' : k === 'hostname' ? 'globe' : k === 'asn' ? 'route' : 'link';

export default function ListsScreen() {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const { accountId } = useAuth();

  const [lists, setLists] = useState<CFList[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const [showAdd, setShowAdd] = useState(false);
  const [name, setName] = useState('');
  const [kind, setKind] = useState<ListKind>('ip');
  const [description, setDescription] = useState('');

  const errMsg = (e: any) => e?.response?.data?.errors?.[0]?.message ?? e?.message ?? 'Error';

  const fetchAll = useCallback(async () => {
    if (!accountId) { setLoading(false); return; }
    setError(null);
    try {
      const res = await api.getLists(accountId);
      setLists(res.result ?? []);
    } catch (e: any) {
      setError(errMsg(e));
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [accountId]);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  const openAdd = () => {
    setName('');
    setKind('ip');
    setDescription('');
    setShowAdd(true);
  };

  const submitAdd = async () => {
    if (!accountId) return;
    const n = name.trim();
    if (!n) return;
    setSaving(true);
    try {
      const res = await api.createList(accountId, { name: n, kind, description: description.trim() || undefined });
      if (res.result) setLists((prev) => [...prev, res.result]);
      setShowAdd(false);
    } catch (e: any) {
      Alert.alert(t('common.error'), errMsg(e));
    } finally {
      setSaving(false);
    }
  };

  const deleteList = (list: CFList) => {
    if (!accountId) return;
    Alert.alert(t('lists.delete_title'), t('lists.delete_confirm', { name: list.name }), [
      { text: t('common.cancel'), style: 'cancel' },
      {
        text: t('common.delete'),
        style: 'destructive',
        onPress: async () => {
          try {
            await api.deleteList(accountId, list.id);
            setLists((prev) => prev.filter((l) => l.id !== list.id));
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
        <Stack.Screen options={{ title: t('lists.title') }} />
        <View style={[styles.container, styles.content, { backgroundColor: colors.background }]} accessibilityLabel={t('common.loading')}>
          <SkeletonHeading />
          <SkeletonRows count={6} />
        </View>
      </>
    );
  }

  return (
    <>
      <Stack.Screen options={{ title: t('lists.title') }} />
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <ScrollView
          contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 96 }]}
          showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); fetchAll(); }} tintColor={colors.primary} />}
        >
          {error && <Banner message={error} />}

          <SectionHeader title={t('lists.your_lists')} />
          {lists.length === 0 ? (
            <EmptyState icon="layers" title={t('lists.no_lists')} message={t('lists.no_lists_message')} />
          ) : (
            lists.map((l) => (
              <Group key={l.id} style={styles.item}>
                <ListRow
                  icon={kindIcon(l.kind)}
                  title={l.name}
                  subtitle={`${t(`lists.kind_${l.kind}`)} · ${t('lists.item_count', { count: l.num_items })}`}
                  onPress={() => router.push({ pathname: '/lists/[list]' as any, params: { list: l.id, name: l.name, kind: l.kind } })}
                  chevron
                  trailing={
                    <TouchableOpacity
                      onPress={() => deleteList(l)}
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

        <Fab label={t('lists.add_list')} onPress={openAdd} />
      </View>

      <Sheet
        visible={showAdd}
        onClose={() => setShowAdd(false)}
        title={t('lists.add_list')}
        footer={<Button title={t('common.save')} onPress={submitAdd} loading={saving} disabled={!name.trim()} />}
      >
        <Field
          label={t('lists.name')}
          placeholder="blocked_countries"
          value={name}
          onChangeText={setName}
          autoCapitalize="none"
          autoCorrect={false}
        />

        <FieldLabel>{t('lists.kind')}</FieldLabel>
        <ChipRow
          wrap
          style={styles.chips}
          options={KINDS.map((k) => ({ value: k, label: t(`lists.kind_${k}`) }))}
          value={kind}
          onChange={setKind}
        />

        <Field
          label={t('lists.description')}
          placeholder={t('lists.description_placeholder')}
          value={description}
          onChangeText={setDescription}
        />
      </Sheet>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: Spacing.lg },
  item: { marginBottom: Spacing.sm },
  chips: { marginTop: 6 },
});
