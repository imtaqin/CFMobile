import { useEffect, useState, useCallback, useRef } from 'react';
import { StyleSheet, View, Text, ScrollView, RefreshControl, TouchableOpacity, Alert } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Icon } from '@/components/ui/icon';
import { useTheme } from '@/hooks/use-theme';
import { SkeletonRows, SkeletonHeading } from '@/components/ui/skeleton';
import { EmptyState } from '@/components/ui/empty-state';
import { SectionHeader } from '@/components/ui/section-header';
import { Button } from '@/components/ui/button';
import { Sheet } from '@/components/ui/sheet';
import { Banner, Fab, Field, Group, ToggleRow } from '@/components/ui/kit';
import { useAuth } from '@/contexts/auth';
import { Spacing, FontSize, Radius } from '@/constants/theme';
import * as api from '@/services/cloudflare';
import { ListItem, ListItemInput, ListKind } from '@/services/cloudflare';

export default function ListItemsScreen() {
  const { list, name, kind } = useLocalSearchParams<{ list: string; name: string; kind: ListKind }>();
  const { t } = useTranslation();
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const { accountId } = useAuth();

  const [items, setItems] = useState<ListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [pending, setPending] = useState(false);

  const [showAdd, setShowAdd] = useState(false);
  const [value, setValue] = useState('');
  const [comment, setComment] = useState('');
  const [excludeExact, setExcludeExact] = useState(true);
  const [targetUrl, setTargetUrl] = useState('');

  const pollTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  const errMsg = (e: any) => e?.response?.data?.errors?.[0]?.message ?? e?.message ?? 'Error';

  const fetchItems = useCallback(async () => {
    if (!accountId) { setLoading(false); return; }
    setError(null);
    try {
      const res = await api.getListItems(accountId, list);
      setItems(res.result ?? []);
    } catch (e: any) {
      setError(errMsg(e));
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [accountId, list]);

  useEffect(() => { fetchItems(); }, [fetchItems]);

  useEffect(() => () => { if (pollTimer.current) clearInterval(pollTimer.current); }, []);

  /** Item writes are async on Cloudflare's side; poll the operation, then refetch. */
  const waitForOperation = (operationId: string) => {
    setPending(true);
    if (pollTimer.current) clearInterval(pollTimer.current);
    pollTimer.current = setInterval(async () => {
      if (!accountId) return;
      try {
        const res = await api.getListBulkOperation(accountId, operationId);
        const status = res.result?.status;
        if (status === 'completed' || status === 'failed') {
          if (pollTimer.current) clearInterval(pollTimer.current);
          setPending(false);
          if (status === 'failed') {
            Alert.alert(t('common.error'), res.result?.error ?? t('lists.operation_failed'));
          }
          fetchItems();
        }
      } catch {
        if (pollTimer.current) clearInterval(pollTimer.current);
        setPending(false);
      }
    }, 1500);
  };

  const openAdd = () => {
    setValue('');
    setComment('');
    setExcludeExact(true);
    setTargetUrl('');
    setShowAdd(true);
  };

  const submitAdd = async () => {
    if (!accountId) return;
    const v = value.trim();
    if (!v) return;

    let input: ListItemInput;
    if (kind === 'ip') input = { ip: v, comment: comment.trim() || undefined };
    else if (kind === 'asn') input = { asn: parseInt(v, 10), comment: comment.trim() || undefined };
    else if (kind === 'hostname') input = { hostname: { url_hostname: v, exclude_exact_hostname: excludeExact }, comment: comment.trim() || undefined };
    else input = { redirect: { source_url: v, target_url: targetUrl.trim() }, comment: comment.trim() || undefined };

    setSaving(true);
    try {
      const res = await api.createListItems(accountId, list, [input]);
      setShowAdd(false);
      if (res.result?.operation_id) waitForOperation(res.result.operation_id);
    } catch (e: any) {
      Alert.alert(t('common.error'), errMsg(e));
    } finally {
      setSaving(false);
    }
  };

  const deleteItem = (item: ListItem) => {
    if (!accountId) return;
    Alert.alert(t('lists.delete_item_title'), t('lists.delete_item_confirm'), [
      { text: t('common.cancel'), style: 'cancel' },
      {
        text: t('common.delete'),
        style: 'destructive',
        onPress: async () => {
          try {
            const res = await api.deleteListItems(accountId, list, [item.id]);
            if (res.result?.operation_id) waitForOperation(res.result.operation_id);
          } catch (e: any) {
            Alert.alert(t('common.error'), errMsg(e));
          }
        },
      },
    ]);
  };

  const itemLabel = (item: ListItem) => {
    if (item.ip) return item.ip;
    if (item.asn != null) return `AS${item.asn}`;
    if (item.hostname) return item.hostname.url_hostname;
    if (item.redirect) return `${item.redirect.source_url} → ${item.redirect.target_url}`;
    return item.id;
  };

  if (loading) {
    return (
      <>
        <Stack.Screen options={{ title: name || t('lists.title') }} />
        <View style={[styles.container, { backgroundColor: colors.background, padding: Spacing.lg }]} accessibilityLabel={t('common.loading')}>
          <SkeletonHeading />
          <SkeletonRows count={6} avatar={false} />
        </View>
      </>
    );
  }

  const canSave =
    kind === 'redirect' ? !!value.trim() && !!targetUrl.trim() :
    kind === 'asn' ? /^\d+$/.test(value.trim()) : !!value.trim();

  return (
    <>
      <Stack.Screen options={{ title: name || t('lists.title') }} />
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <ScrollView
          contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 96 }]}
          showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); fetchItems(); }} tintColor={colors.primary} />}
        >
          {(error || pending) && (
            <View style={styles.banners}>
              {error && <Banner message={error} />}
              {pending && <Banner tone="warning" message={t('lists.processing')} />}
            </View>
          )}

          <SectionHeader title={t('lists.items', { count: items.length })} />
          {items.length === 0 ? (
            <EmptyState icon="layers" title={t('lists.no_items')} message={t('lists.no_items_message')} />
          ) : (
            items.map((item) => (
              <View
                key={item.id}
                style={[styles.item, { backgroundColor: colors.surface, borderColor: colors.borderLight }]}
              >
                <View style={styles.itemBody}>
                  <Text style={[styles.itemValue, { color: colors.text }]} numberOfLines={1}>{itemLabel(item)}</Text>
                  {!!item.comment && (
                    <Text style={[styles.itemComment, { color: colors.textSecondary }]} numberOfLines={1}>{item.comment}</Text>
                  )}
                </View>
                <TouchableOpacity
                  onPress={() => deleteItem(item)}
                  hitSlop={10}
                  accessibilityRole="button"
                  accessibilityLabel={t('common.delete')}
                >
                  <Icon name="trash" size={16} color={colors.textTertiary} />
                </TouchableOpacity>
              </View>
            ))
          )}
        </ScrollView>

        <Fab label={t('lists.add_item')} onPress={openAdd} />
      </View>

      <Sheet
        visible={showAdd}
        onClose={() => setShowAdd(false)}
        title={t('lists.add_item')}
        footer={<Button title={t('common.save')} onPress={submitAdd} loading={saving} disabled={!canSave} />}
      >
        <Field
          label={kind === 'ip' ? t('lists.field_ip') : kind === 'asn' ? t('lists.field_asn') : kind === 'hostname' ? t('lists.field_hostname') : t('lists.field_source_url')}
          placeholder={kind === 'ip' ? '203.0.113.0/24' : kind === 'asn' ? '13335' : kind === 'hostname' ? '*.example.com' : 'example.com/old'}
          value={value}
          onChangeText={setValue}
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType={kind === 'asn' ? 'number-pad' : 'default'}
          mono
        />

        {kind === 'hostname' && (
          <Group style={styles.toggle}>
            <ToggleRow
              title={t('lists.exclude_exact_hostname')}
              value={excludeExact}
              onValueChange={setExcludeExact}
            />
          </Group>
        )}

        {kind === 'redirect' && (
          <Field
            label={t('lists.field_target_url')}
            placeholder="https://example.com/new"
            value={targetUrl}
            onChangeText={setTargetUrl}
            autoCapitalize="none"
            autoCorrect={false}
            mono
          />
        )}

        <Field
          label={t('lists.comment')}
          placeholder={t('lists.comment_placeholder')}
          value={comment}
          onChangeText={setComment}
        />
      </Sheet>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: Spacing.lg },
  banners: { gap: Spacing.sm },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    minHeight: 52,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderRadius: Radius.lg,
    borderWidth: 1,
    marginBottom: Spacing.sm,
  },
  itemBody: { flex: 1, gap: 2 },
  itemValue: { fontSize: FontSize.sm, fontFamily: 'monospace' },
  itemComment: { fontSize: FontSize.sm },
  toggle: { marginTop: Spacing.md },
});
