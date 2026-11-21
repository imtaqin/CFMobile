import { useEffect, useState, useCallback } from 'react';
import { StyleSheet, View, Text, FlatList, RefreshControl, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as DocumentPicker from 'expo-document-picker';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system/legacy';
import { Icon } from '@/components/ui/icon';
import { useTheme } from '@/hooks/use-theme';
import { Card } from '@/components/ui/card';
import { SkeletonRows } from '@/components/ui/skeleton';
import { EmptyState } from '@/components/ui/empty-state';
import { SectionHeader } from '@/components/ui/section-header';
import { HeaderButton } from '@/components/ui/header-button';
import { Sheet } from '@/components/ui/sheet';
import { Fab, Group, IconCircle, ListRow, ToggleRow } from '@/components/ui/kit';
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
  const insets = useSafeAreaInsets();
  const { accountId } = useAuth();

  const [objects, setObjects] = useState<R2Object[]>([]);
  const [cursor, setCursor] = useState<string | undefined>();
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [busyKey, setBusyKey] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [publicAccess, setPublicAccess] = useState<boolean | null>(null);
  const [corsRules, setCorsRules] = useState<api.R2CorsRule[]>([]);
  const [lifecycleRules, setLifecycleRules] = useState<api.R2LifecycleRule[]>([]);
  const [lockRules, setLockRules] = useState<api.R2BucketLockRule[]>([]);
  const [customDomains, setCustomDomains] = useState<api.R2CustomDomain[]>([]);

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

  const fetchSettings = useCallback(async () => {
    if (!accountId) return;
    const [pa, cors, lc, lk, cd] = await Promise.allSettled([
      api.getR2PublicAccess(accountId, bucket),
      api.getR2Cors(accountId, bucket),
      api.getR2Lifecycle(accountId, bucket),
      api.getR2BucketLocks(accountId, bucket),
      api.getR2CustomDomains(accountId, bucket),
    ]);
    if (pa.status === 'fulfilled') setPublicAccess(pa.value.result?.enabled ?? false);
    if (cors.status === 'fulfilled') setCorsRules(cors.value.result ?? []);
    if (lc.status === 'fulfilled') setLifecycleRules(lc.value.result ?? []);
    if (lk.status === 'fulfilled') setLockRules(lk.value.result ?? []);
    if (cd.status === 'fulfilled') setCustomDomains(cd.value.result ?? []);
  }, [accountId, bucket]);

  const togglePublicAccess = async (value: boolean) => {
    if (!accountId) return;
    const prev = publicAccess;
    setPublicAccess(value);
    try {
      await api.putR2PublicAccess(accountId, bucket, value);
    } catch {
      setPublicAccess(prev);
      Alert.alert(t('common.error'), t('r2.public_access_error'));
    }
  };

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
    <View style={[styles.objRow, { backgroundColor: colors.surface, borderColor: colors.borderLight }]}>
      <IconCircle name="cloud-upload" />
      <View style={styles.objBody}>
        <Text style={[styles.objKey, { color: colors.text }]} numberOfLines={1}>{item.key}</Text>
        <Text style={[styles.objMeta, { color: colors.textTertiary }]}>
          {formatSize(item.size)} · {new Date(item.last_modified).toLocaleDateString()}
        </Text>
      </View>
      {busyKey === item.key ? (
        <ActivityIndicator size="small" color={colors.textTertiary} />
      ) : (
        <>
          <TouchableOpacity onPress={() => handleDownload(item)} hitSlop={10} accessibilityRole="button">
            <Icon name="download" size={16} color={colors.textSecondary} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleDelete(item)}
            hitSlop={10}
            accessibilityRole="button"
            accessibilityLabel={t('common.delete')}
          >
            <Icon name="trash" size={16} color={colors.textTertiary} />
          </TouchableOpacity>
        </>
      )}
    </View>
  );

  // Placeholder line for a settings section that has nothing configured.
  const emptyNote = (text: string) => (
    <Card compact>
      <Text style={[styles.note, { color: colors.textSecondary }]}>{text}</Text>
    </Card>
  );

  if (loading) {
    return (
      <>
        <Stack.Screen options={{ title: bucket }} />
        <View style={[styles.container, { backgroundColor: colors.background, padding: Spacing.lg }]} accessibilityLabel={t('common.loading')}>
          <SkeletonRows count={6} />
        </View>
      </>
    );
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: bucket,
          headerRight: () => (
            <View style={styles.headerRight}>
              {uploading && <ActivityIndicator size="small" color={colors.textTertiary} />}
              <HeaderButton
                icon="settings"
                label={t('r2.bucket_settings')}
                onPress={() => { setShowSettings(true); fetchSettings(); }}
              />
            </View>
          ),
        }}
      />
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <FlatList
          data={objects}
          keyExtractor={(item) => item.key}
          renderItem={renderObject}
          contentContainerStyle={[styles.list, { paddingBottom: insets.bottom + 96 }]}
          showsVerticalScrollIndicator={false}
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

        <Fab label="Upload" icon="cloud-upload" onPress={handleUpload} />
      </View>

      {/* Bucket settings */}
      <Sheet visible={showSettings} onClose={() => setShowSettings(false)} title={t('r2.bucket_settings')}>
        <SectionHeader title={t('r2.public_access')} />
        <Group>
          {publicAccess !== null ? (
            <ToggleRow
              title={t('r2.public_access_toggle')}
              subtitle={t('r2.public_access_desc')}
              value={publicAccess}
              onValueChange={togglePublicAccess}
            />
          ) : (
            <ListRow title={t('r2.public_access_toggle')} subtitle={t('r2.public_access_desc')} />
          )}
        </Group>

        <SectionHeader title={t('r2.custom_domains')} />
        {customDomains.length > 0 ? (
          <Group>
            {customDomains.map((d) => (
              <ListRow
                key={d.domain}
                title={d.domain}
                subtitle={d.enabled ? t('r2.domain_enabled') : t('r2.domain_disabled')}
                trailing={
                  <Icon
                    name={d.enabled ? 'check-circle' : 'error-circle'}
                    size={18}
                    color={d.enabled ? colors.success : colors.textTertiary}
                  />
                }
              />
            ))}
          </Group>
        ) : emptyNote(t('r2.no_custom_domains'))}

        <SectionHeader title={t('r2.cors_rules')} />
        {corsRules.length > 0 ? (
          <Group>
            {corsRules.map((rule, i) => (
              <ListRow
                key={rule.id ?? i}
                title={rule.allowed.origins.join(', ')}
                subtitle={rule.allowed.methods.join(', ')}
                mono
              />
            ))}
          </Group>
        ) : emptyNote(t('r2.no_cors_rules'))}

        <SectionHeader title={t('r2.lifecycle_rules')} />
        {lifecycleRules.length > 0 ? (
          <Group>
            {lifecycleRules.map((rule) => (
              <ListRow
                key={rule.id}
                title={rule.id}
                subtitle={`${rule.conditions?.prefix ? `prefix: ${rule.conditions.prefix}` : 'all objects'} · ${rule.enabled ? t('r2.rule_enabled') : t('r2.rule_disabled')}`}
              />
            ))}
          </Group>
        ) : emptyNote(t('r2.no_lifecycle_rules'))}

        <SectionHeader title={t('r2.bucket_locks')} />
        {lockRules.length > 0 ? (
          <Group>
            {lockRules.map((rule) => (
              <ListRow
                key={rule.id}
                title={rule.id}
                subtitle={`${rule.prefix ? `prefix: ${rule.prefix}` : 'all objects'} · ${rule.enabled ? t('r2.rule_enabled') : t('r2.rule_disabled')}`}
              />
            ))}
          </Group>
        ) : emptyNote(t('r2.no_bucket_locks'))}
      </Sheet>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  headerRight: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md },
  list: { padding: Spacing.lg },
  objRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    paddingHorizontal: Spacing.lg,
    paddingVertical: 13,
    borderRadius: Radius.lg,
    borderWidth: 1,
    marginBottom: Spacing.sm,
  },
  objBody: { flex: 1, gap: 2 },
  objKey: { fontSize: FontSize.sm, fontFamily: 'monospace' },
  objMeta: { fontSize: FontSize.xs },
  note: { fontSize: FontSize.sm, lineHeight: 18 },
});
