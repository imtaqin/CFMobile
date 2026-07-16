import { useEffect, useState, useCallback } from 'react';
import { StyleSheet, View, Text, FlatList, RefreshControl, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';
import * as DocumentPicker from 'expo-document-picker';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system/legacy';
import { Icon } from '@/components/ui/icon';
import { useTheme } from '@/hooks/use-theme';
import { Card } from '@/components/ui/card';
import { Loading } from '@/components/ui/loading';
import { EmptyState } from '@/components/ui/empty-state';
import { useAuth } from '@/contexts/auth';
import { Spacing, FontSize, Radius } from '@/constants/theme';
import * as api from '@/services/cloudflare';
import { R2Object } from '@/services/cloudflare';

function formatSize(bytes: number): string {
  if (bytes >= 1_073_741_824) return `${(bytes / 1_073_741_824).toFixed(1)} GB`;
  if (bytes >= 1_048_576) return `${(bytes / 1_048_576).toFixed(1)} MB`;
  if (bytes >= 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${bytes} B`;
}

export default function R2BrowserScreen() {
  const { bucket } = useLocalSearchParams<{ bucket: string }>();
  const { t } = useTranslation();
  const { colors } = useTheme();
  const { accountId } = useAuth();

  const [objects, setObjects] = useState<R2Object[]>([]);
  const [cursor, setCursor] = useState<string | undefined>();
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [busyKey, setBusyKey] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const errMsg = (e: any) => e?.response?.data?.errors?.[0]?.message ?? e?.message ?? 'Error';

  const fetchObjects = useCallback(async (nextCursor?: string) => {
    if (!accountId) { setLoading(false); return; }
    try {
      const res = await api.getR2Objects(accountId, bucket, nextCursor);
      setObjects((prev) => (nextCursor ? [...prev, ...res.objects] : res.objects));
      setCursor(res.cursor);
      setHasMore(res.isTruncated);
      setError(null);
    } catch (e: any) {
      setError(errMsg(e));
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [accountId, bucket]);

  useEffect(() => { fetchObjects(); }, [fetchObjects]);

  const handleUpload = async () => {
    if (!accountId || uploading) return;
    const picked = await DocumentPicker.getDocumentAsync({ copyToCacheDirectory: true });
    if (picked.canceled || !picked.assets?.[0]) return;
    const asset = picked.assets[0];
    setUploading(true);
    try {
      const url = api.getR2ObjectUrl(accountId, bucket, asset.name);
      const res = await FileSystem.uploadAsync(url, asset.uri, {
        httpMethod: 'PUT',
        headers: {
          ...api.getAuthHeaders(),
          'Content-Type': asset.mimeType ?? 'application/octet-stream',
        },
      });
      if (res.status >= 200 && res.status < 300) {
        setRefreshing(true);
        fetchObjects();
      } else {
        Alert.alert(t('common.error'), `HTTP ${res.status}`);
      }
    } catch (e: any) {
      Alert.alert(t('common.error'), errMsg(e));
    } finally {
      setUploading(false);
    }
  };

  const handleDownload = async (obj: R2Object) => {
    if (!accountId || busyKey) return;
    setBusyKey(obj.key);
    try {
      const url = api.getR2ObjectUrl(accountId, bucket, obj.key);
      const safeName = obj.key.split('/').pop() || 'file';
      const dest = `${FileSystem.cacheDirectory}${safeName}`;
      const res = await FileSystem.downloadAsync(url, dest, { headers: api.getAuthHeaders() });
      if (res.status >= 200 && res.status < 300 && (await Sharing.isAvailableAsync())) {
        await Sharing.shareAsync(res.uri);
      } else if (res.status >= 300) {
        Alert.alert(t('common.error'), `HTTP ${res.status}`);
      }
    } catch (e: any) {
      Alert.alert(t('common.error'), errMsg(e));
    } finally {
      setBusyKey(null);
    }
  };

  const handleDelete = (obj: R2Object) => {
    if (!accountId) return;
    Alert.alert(
      t('r2.delete_title'),
      t('r2.delete_confirm', { key: obj.key }),
      [
        { text: t('common.cancel'), style: 'cancel' },
        {
          text: t('common.delete'),
          style: 'destructive',
          onPress: async () => {
            try {
              await api.deleteR2Object(accountId, bucket, obj.key);
              setObjects((prev) => prev.filter((o) => o.key !== obj.key));
            } catch (e: any) {
              Alert.alert(t('common.error'), errMsg(e));
            }
          },
        },
      ]
    );
  };

  const renderObject = ({ item }: { item: R2Object }) => (
    <Card style={styles.objCard}>
      <View style={[styles.objIcon, { backgroundColor: colors.success + '15' }]}>
        <Icon name="cloud-upload" size={18} color={colors.success} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={[styles.objKey, { color: colors.text }]} numberOfLines={1}>{item.key}</Text>
        <Text style={[styles.objMeta, { color: colors.textSecondary }]}>
          {formatSize(item.size)} · {new Date(item.last_modified).toLocaleDateString()}
        </Text>
      </View>
      {busyKey === item.key ? (
        <ActivityIndicator size="small" color={colors.primary} />
      ) : (
        <>
          <TouchableOpacity onPress={() => handleDownload(item)} hitSlop={8} style={{ padding: 4 }}>
            <Icon name="download" size={18} color={colors.info} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleDelete(item)} hitSlop={8} style={{ padding: 4 }}>
            <Icon name="trash" size={18} color={colors.error} />
          </TouchableOpacity>
        </>
      )}
    </Card>
  );

  if (loading) return <Loading />;

  return (
    <>
      <Stack.Screen options={{ title: bucket }} />
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <FlatList
          data={objects}
          keyExtractor={(item) => item.key}
          renderItem={renderObject}
          contentContainerStyle={styles.list}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => { setRefreshing(true); fetchObjects(); }}
              tintColor={colors.primary}
            />
          }
          onEndReached={() => { if (hasMore && cursor) fetchObjects(cursor); }}
          onEndReachedThreshold={0.3}
          ListEmptyComponent={
            <EmptyState
              icon="cloud-upload"
              title={error ? t('common.error') : t('r2.no_objects')}
              message={error ?? t('r2.no_objects_message')}
            />
          }
        />

        {/* Upload FAB */}
        <TouchableOpacity
          style={[styles.fab, { backgroundColor: colors.primary }]}
          onPress={handleUpload}
          activeOpacity={0.85}
          disabled={uploading}
        >
          {uploading ? (
            <ActivityIndicator size="small" color="#FFF" />
          ) : (
            <Icon name="plus" size={24} color="#FFF" />
          )}
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  list: { padding: Spacing.lg, paddingBottom: 100 },
  objCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  objIcon: {
    width: 36,
    height: 36,
    borderRadius: Radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  objKey: { fontSize: FontSize.sm, fontWeight: '600' },
  objMeta: { fontSize: FontSize.xs, marginTop: 2 },
  fab: {
    position: 'absolute',
    right: Spacing.lg,
    bottom: Spacing.xl,
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
});
