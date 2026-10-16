import { useEffect, useState, useCallback } from 'react';
import { StyleSheet, View, FlatList, RefreshControl, TouchableOpacity, Alert } from 'react-native';
import { Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Icon } from '@/components/ui/icon';
import { useTheme } from '@/hooks/use-theme';
import { Loading } from '@/components/ui/loading';
import { EmptyState } from '@/components/ui/empty-state';
import { Badge } from '@/components/ui/badge';
import { ListRow } from '@/components/ui/kit';
import { useAuth } from '@/contexts/auth';
import { Spacing, Radius } from '@/constants/theme';
import * as api from '@/services/cloudflare';
import { CFImage } from '@/services/cloudflare';
import { useUnlocked } from '@/services/ad-reward';
import { PremiumPaywall } from '@/components/ui/premium-gate';

export default function ImagesScreen() {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const { accountId } = useAuth();
  const premium = useUnlocked('images');

  const [images, setImages] = useState<CFImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchImages = useCallback(async () => {
    if (!accountId || !premium) { setLoading(false); return; }
    try {
      const res = await api.getCFImages(accountId);
      setImages(res.result ?? []);
      setError(null);
    } catch (e: any) {
      setError(e?.response?.data?.errors?.[0]?.message ?? e?.message ?? 'Error');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [accountId, premium]);

  useEffect(() => { fetchImages(); }, [fetchImages]);

  const handleDelete = (image: CFImage) => {
    if (!accountId) return;
    Alert.alert(t('images.delete_title'), t('images.delete_confirm', { name: image.filename ?? image.id }), [
      { text: t('common.cancel'), style: 'cancel' },
      { text: t('common.delete'), style: 'destructive', onPress: async () => {
        try { await api.deleteCFImage(accountId, image.id); setImages((p) => p.filter((i) => i.id !== image.id)); }
        catch { Alert.alert(t('common.error'), t('images.delete_error')); }
      }},
    ]);
  };

  const renderImage = ({ item }: { item: CFImage }) => (
    <View style={[styles.item, { backgroundColor: colors.surface, borderColor: colors.borderLight }]}>
      <ListRow
        icon="cloud"
        title={item.filename ?? item.id}
        subtitle={`${item.variants?.length ?? 0} ${t('images.variants')} · ${new Date(item.uploaded).toLocaleDateString()}`}
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
      {(item.requireSignedURLs || item.draft) && (
        <View style={styles.badges}>
          {item.requireSignedURLs && <Badge label={t('images.signed')} variant="warning" />}
          {item.draft && <Badge label={t('images.draft')} variant="default" />}
        </View>
      )}
    </View>
  );

  if (!premium) {
    return (
      <>
        <Stack.Screen options={{ title: t('images.title') }} />
        <PremiumPaywall feature="images" />
      </>
    );
  }

  if (loading) return <Loading />;

  return (
    <>
      <Stack.Screen options={{ title: t('images.title') }} />
      <FlatList
        data={images}
        keyExtractor={(item) => item.id}
        renderItem={renderImage}
        contentContainerStyle={styles.list}
        style={{ backgroundColor: colors.background }}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); fetchImages(); }} tintColor={colors.primary} />}
        ListEmptyComponent={<EmptyState icon="cloud" title={error ? t('common.error') : t('images.no_images')} message={error ?? t('images.no_images_message')} />}
      />
    </>
  );
}

const styles = StyleSheet.create({
  list: { padding: Spacing.lg, paddingBottom: Spacing.xxxl },
  item: { borderRadius: Radius.lg, borderWidth: 1, marginBottom: Spacing.sm, overflow: 'hidden' },
  // Lines up with the row text: row padding + icon circle + gap.
  badges: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.xs,
    paddingLeft: Spacing.lg + 36 + Spacing.md,
    paddingRight: Spacing.lg,
    paddingBottom: 13,
    marginTop: -5,
  },
});
