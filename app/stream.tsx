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
import { StreamVideo } from '@/services/cloudflare';
import { useUnlocked } from '@/services/ad-reward';
import { PremiumPaywall } from '@/components/ui/premium-gate';

function formatDuration(seconds: number): string {
  if (seconds < 0) return '—';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

function formatSize(bytes: number): string {
  if (bytes >= 1_073_741_824) return `${(bytes / 1_073_741_824).toFixed(1)} GB`;
  if (bytes >= 1_048_576) return `${(bytes / 1_048_576).toFixed(1)} MB`;
  if (bytes >= 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${bytes} B`;
}

export default function StreamScreen() {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const { accountId } = useAuth();
  const premium = useUnlocked('stream');

  const [videos, setVideos] = useState<StreamVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchVideos = useCallback(async () => {
    if (!accountId || !premium) { setLoading(false); return; }
    try {
      const res = await api.getStreamVideos(accountId);
      setVideos(res.result ?? []);
      setError(null);
    } catch (e: any) {
      setError(e?.response?.data?.errors?.[0]?.message ?? e?.message ?? 'Error');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [accountId, premium]);

  useEffect(() => { fetchVideos(); }, [fetchVideos]);

  const handleDelete = (video: StreamVideo) => {
    if (!accountId) return;
    Alert.alert(t('stream.delete_title'), t('stream.delete_confirm'), [
      { text: t('common.cancel'), style: 'cancel' },
      { text: t('common.delete'), style: 'destructive', onPress: async () => {
        try { await api.deleteStreamVideo(accountId, video.uid); setVideos((p) => p.filter((v) => v.uid !== video.uid)); }
        catch { Alert.alert(t('common.error'), t('stream.delete_error')); }
      }},
    ]);
  };

  const stateColor = (state: string) => {
    if (state === 'ready') return 'success';
    if (state === 'error') return 'error';
    return 'warning';
  };

  const renderVideo = ({ item }: { item: StreamVideo }) => (
    <View style={[styles.item, { backgroundColor: colors.surface, borderColor: colors.borderLight }]}>
      <ListRow
        icon="cloud"
        // The icon reports whether the video can be played yet.
        iconTone={item.readyToStream ? 'success' : 'warning'}
        title={item.meta?.name ?? item.uid}
        subtitle={`${formatDuration(item.duration)} · ${formatSize(item.size)}${item.input ? ` · ${item.input.width}×${item.input.height}` : ''}`}
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
      <View style={styles.badges}>
        <Badge label={item.status?.state ?? 'unknown'} variant={stateColor(item.status?.state)} />
        {item.readyToStream && <Badge label={t('stream.ready')} variant="success" />}
      </View>
    </View>
  );

  if (!premium) {
    return (
      <>
        <Stack.Screen options={{ title: t('stream.title') }} />
        <PremiumPaywall feature="stream" />
      </>
    );
  }

  if (loading) return <Loading />;

  return (
    <>
      <Stack.Screen options={{ title: t('stream.title') }} />
      <FlatList
        data={videos}
        keyExtractor={(item) => item.uid}
        renderItem={renderVideo}
        contentContainerStyle={styles.list}
        style={{ backgroundColor: colors.background }}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); fetchVideos(); }} tintColor={colors.primary} />}
        ListEmptyComponent={<EmptyState icon="cloud" title={error ? t('common.error') : t('stream.no_videos')} message={error ?? t('stream.no_videos_message')} />}
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
