import { useEffect, useState, useCallback } from 'react';
import { StyleSheet, View, ScrollView, RefreshControl, TouchableOpacity, Alert } from 'react-native';
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
import { Banner, ChipRow, Fab, Field, FieldLabel, Group, ListRow } from '@/components/ui/kit';
import { useAuth } from '@/contexts/auth';
import { Spacing } from '@/constants/theme';
import * as api from '@/services/cloudflare';
import { VectorizeIndex } from '@/services/cloudflare';
import { useUnlocked } from '@/services/ad-reward';
import { PremiumPaywall } from '@/components/ui/premium-gate';

const METRICS = ['cosine', 'euclidean', 'dot-product'] as const;

export default function VectorizeScreen() {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const { accountId } = useAuth();
  const premium = useUnlocked('vectorize');

  const [indexes, setIndexes] = useState<VectorizeIndex[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const [showAdd, setShowAdd] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [dimensions, setDimensions] = useState('768');
  const [metric, setMetric] = useState<typeof METRICS[number]>('cosine');

  const errMsg = (e: any) => e?.response?.data?.errors?.[0]?.message ?? e?.message ?? 'Error';

  const fetchIndexes = useCallback(async () => {
    if (!accountId || !premium) { setLoading(false); return; }
    try {
      const res = await api.getVectorizeIndexes(accountId);
      setIndexes(res.result ?? []);
      setError(null);
    } catch (e: any) {
      setError(errMsg(e));
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [accountId, premium]);

  useEffect(() => { fetchIndexes(); }, [fetchIndexes]);

  const openAdd = () => {
    setName('');
    setDescription('');
    setDimensions('768');
    setMetric('cosine');
    setShowAdd(true);
  };

  const submitAdd = async () => {
    if (!accountId) return;
    const n = name.trim();
    const dims = parseInt(dimensions, 10);
    if (!n || !dims) return;
    setSaving(true);
    try {
      const res = await api.createVectorizeIndex(accountId, {
        name: n,
        description: description.trim() || undefined,
        config: { dimensions: dims, metric },
      });
      if (res.result) setIndexes((prev) => [...prev, res.result]);
      setShowAdd(false);
    } catch (e: any) {
      Alert.alert(t('common.error'), errMsg(e));
    } finally {
      setSaving(false);
    }
  };

  const deleteIndex = (index: VectorizeIndex) => {
    if (!accountId) return;
    Alert.alert(t('vectorize.delete_title'), t('vectorize.delete_confirm', { name: index.name }), [
      { text: t('common.cancel'), style: 'cancel' },
      {
        text: t('common.delete'),
        style: 'destructive',
        onPress: async () => {
          try {
            await api.deleteVectorizeIndex(accountId, index.name);
            setIndexes((prev) => prev.filter((x) => x.name !== index.name));
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
        <Stack.Screen options={{ title: t('vectorize.title') }} />
        <PremiumPaywall feature="vectorize" />
      </>
    );
  }

  if (loading) return <Loading />;

  return (
    <>
      <Stack.Screen options={{ title: t('vectorize.title') }} />
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <ScrollView
          contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 96 }]}
          showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); fetchIndexes(); }} tintColor={colors.primary} />}
        >
          {error && <Banner message={error} />}

          <SectionHeader title={t('vectorize.indexes')} />
          {indexes.length === 0 ? (
            <EmptyState icon="database" title={t('vectorize.no_indexes')} message={t('vectorize.no_indexes_message')} />
          ) : (
            indexes.map((idx) => (
              <Group key={idx.name} style={styles.item}>
                <ListRow
                  icon="database"
                  title={idx.name}
                  subtitle={idx.description || undefined}
                  onPress={() => router.push({ pathname: '/vectorize/[index]' as any, params: { index: idx.name } })}
                  chevron
                  trailing={
                    <TouchableOpacity
                      onPress={() => deleteIndex(idx)}
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

        <Fab label={t('vectorize.add_index')} onPress={openAdd} />
      </View>

      <Sheet
        visible={showAdd}
        onClose={() => setShowAdd(false)}
        title={t('vectorize.add_index')}
        footer={
          <Button
            title={t('common.save')}
            onPress={submitAdd}
            loading={saving}
            disabled={!name.trim() || !dimensions.trim()}
          />
        }
      >
        <Field
          label={t('vectorize.name')}
          placeholder="my-index"
          value={name}
          onChangeText={setName}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Field
          label={t('vectorize.description')}
          placeholder={t('vectorize.description_placeholder')}
          value={description}
          onChangeText={setDescription}
        />
        <Field
          label={t('vectorize.dimensions')}
          placeholder="768"
          value={dimensions}
          onChangeText={setDimensions}
          keyboardType="number-pad"
        />
        <FieldLabel>{t('vectorize.metric')}</FieldLabel>
        <ChipRow
          wrap
          style={styles.chips}
          options={METRICS.map((m) => ({ value: m, label: m }))}
          value={metric}
          onChange={setMetric}
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
