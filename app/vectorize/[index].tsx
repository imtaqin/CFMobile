import { useEffect, useState, useCallback } from 'react';
import { StyleSheet, View, ScrollView, RefreshControl, TouchableOpacity, Alert } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Icon } from '@/components/ui/icon';
import { useTheme } from '@/hooks/use-theme';
import { SkeletonRows, SkeletonStats, SkeletonHeading } from '@/components/ui/skeleton';
import { EmptyState } from '@/components/ui/empty-state';
import { SectionHeader } from '@/components/ui/section-header';
import { Button } from '@/components/ui/button';
import { Sheet } from '@/components/ui/sheet';
import { Banner, ChipRow, Fab, Field, FieldLabel, Group, ListRow, StatCard } from '@/components/ui/kit';
import { useAuth } from '@/contexts/auth';
import { Spacing } from '@/constants/theme';
import * as api from '@/services/cloudflare';
import { VectorizeIndexInfo, VectorizeMetadataIndex } from '@/services/cloudflare';

const PROPERTY_TYPES: VectorizeMetadataIndex['indexType'][] = ['string', 'number', 'boolean'];

export default function VectorizeIndexScreen() {
  const { index: indexName } = useLocalSearchParams<{ index: string }>();
  const { t } = useTranslation();
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const { accountId } = useAuth();

  const [info, setInfo] = useState<VectorizeIndexInfo | null>(null);
  const [metadataIndexes, setMetadataIndexes] = useState<VectorizeMetadataIndex[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const [showAdd, setShowAdd] = useState(false);
  const [propertyName, setPropertyName] = useState('');
  const [propertyType, setPropertyType] = useState<VectorizeMetadataIndex['indexType']>('string');
  const [idsInput, setIdsInput] = useState('');

  const errMsg = (e: any) => e?.response?.data?.errors?.[0]?.message ?? e?.message ?? 'Error';

  const fetchAll = useCallback(async () => {
    if (!accountId) { setLoading(false); return; }
    try {
      const [infoRes, metaRes] = await Promise.allSettled([
        api.getVectorizeIndexInfo(accountId, indexName),
        api.getVectorizeMetadataIndexes(accountId, indexName),
      ]);
      if (infoRes.status === 'fulfilled') setInfo(infoRes.value.result ?? null);
      if (metaRes.status === 'fulfilled') setMetadataIndexes(metaRes.value.result ?? []);
      setError(null);
    } catch (e: any) {
      setError(errMsg(e));
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [accountId, indexName]);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  const openAdd = () => {
    setPropertyName('');
    setPropertyType('string');
    setShowAdd(true);
  };

  const submitAdd = async () => {
    if (!accountId) return;
    const name = propertyName.trim();
    if (!name) return;
    setSaving(true);
    try {
      await api.createVectorizeMetadataIndex(accountId, indexName, { propertyName: name, indexType: propertyType });
      setMetadataIndexes((prev) => [...prev, { propertyName: name, indexType: propertyType }]);
      setShowAdd(false);
    } catch (e: any) {
      Alert.alert(t('common.error'), errMsg(e));
    } finally {
      setSaving(false);
    }
  };

  const deleteMetadataIndex = (m: VectorizeMetadataIndex) => {
    if (!accountId) return;
    Alert.alert(t('vectorize.delete_metadata_title'), t('vectorize.delete_metadata_confirm', { name: m.propertyName }), [
      { text: t('common.cancel'), style: 'cancel' },
      {
        text: t('common.delete'),
        style: 'destructive',
        onPress: async () => {
          try {
            await api.deleteVectorizeMetadataIndex(accountId, indexName, m.propertyName);
            setMetadataIndexes((prev) => prev.filter((x) => x.propertyName !== m.propertyName));
          } catch (e: any) {
            Alert.alert(t('common.error'), errMsg(e));
          }
        },
      },
    ]);
  };

  const deleteVectors = () => {
    if (!accountId) return;
    const ids = idsInput.split(',').map((s) => s.trim()).filter(Boolean);
    if (ids.length === 0) return;
    Alert.alert(t('vectorize.delete_vectors_title'), t('vectorize.delete_vectors_confirm', { count: ids.length }), [
      { text: t('common.cancel'), style: 'cancel' },
      {
        text: t('common.delete'),
        style: 'destructive',
        onPress: async () => {
          try {
            await api.deleteVectorsByIds(accountId, indexName, ids);
            setIdsInput('');
            Alert.alert(t('common.success'), t('vectorize.delete_vectors_success'));
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
        <Stack.Screen options={{ title: indexName }} />
        <View style={[styles.container, { backgroundColor: colors.background, padding: Spacing.lg }]} accessibilityLabel={t('common.loading')}>
          <SkeletonStats count={2} />
          <SkeletonHeading />
          <SkeletonRows count={4} />
        </View>
      </>
    );
  }

  return (
    <>
      <Stack.Screen options={{ title: indexName }} />
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <ScrollView
          contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 96 }]}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); fetchAll(); }} tintColor={colors.primary} />}
        >
          {error && <View style={styles.banner}><Banner message={error} /></View>}

          {info && (
            <View style={styles.stats}>
              <StatCard label={t('vectorize.vector_count')} value={String(info.vectorCount ?? '—')} />
              <StatCard label={t('vectorize.dimensions')} value={String(info.dimensions ?? '—')} />
            </View>
          )}

          <SectionHeader title={t('vectorize.metadata_indexes')} />
          {metadataIndexes.length === 0 ? (
            <EmptyState icon="layers" title={t('vectorize.no_metadata_indexes')} message={t('vectorize.no_metadata_indexes_message')} />
          ) : (
            metadataIndexes.map((m) => (
              <Group key={m.propertyName} style={styles.item}>
                <ListRow
                  icon="layers"
                  title={m.propertyName}
                  subtitle={m.indexType}
                  mono
                  trailing={
                    <TouchableOpacity
                      onPress={() => deleteMetadataIndex(m)}
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

          <SectionHeader title={t('vectorize.delete_vectors')} />
          <View style={styles.form}>
            <Field
              label={t('vectorize.vector_ids')}
              placeholder="id-1, id-2, id-3"
              value={idsInput}
              onChangeText={setIdsInput}
              autoCapitalize="none"
              autoCorrect={false}
              mono
            />
          </View>
          <Button
            title={t('common.delete')}
            variant="danger"
            onPress={deleteVectors}
            disabled={!idsInput.trim()}
            style={styles.formButton}
          />
        </ScrollView>

        <Fab label={t('vectorize.add_metadata_index')} onPress={openAdd} />
      </View>

      <Sheet
        visible={showAdd}
        onClose={() => setShowAdd(false)}
        title={t('vectorize.add_metadata_index')}
        footer={
          <Button
            title={t('common.save')}
            onPress={submitAdd}
            loading={saving}
            disabled={!propertyName.trim()}
          />
        }
      >
        <Field
          label={t('vectorize.property_name')}
          placeholder="category"
          value={propertyName}
          onChangeText={setPropertyName}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <FieldLabel>{t('vectorize.property_type')}</FieldLabel>
        <ChipRow
          wrap
          style={styles.chips}
          options={PROPERTY_TYPES.map((tp) => ({ value: tp, label: tp }))}
          value={propertyType}
          onChange={setPropertyType}
        />
      </Sheet>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: Spacing.lg },
  banner: { marginBottom: Spacing.md },
  stats: { flexDirection: 'row', gap: Spacing.sm },
  item: { marginBottom: Spacing.sm },
  // Field brings its own top margin; pull it up so it sits right under the section title.
  form: { marginTop: -Spacing.md },
  formButton: { marginTop: Spacing.md },
  chips: { marginTop: 6 },
});
