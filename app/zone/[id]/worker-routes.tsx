import { useEffect, useState, useCallback } from 'react';
import { StyleSheet, View, ScrollView, RefreshControl, TouchableOpacity, Alert } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Icon } from '@/components/ui/icon';
import { useTheme } from '@/hooks/use-theme';
import { SkeletonRows } from '@/components/ui/skeleton';
import { EmptyState } from '@/components/ui/empty-state';
import { Button } from '@/components/ui/button';
import { Banner, Fab, Field, Group, ListRow } from '@/components/ui/kit';
import { Sheet } from '@/components/ui/sheet';
import { Spacing } from '@/constants/theme';
import * as api from '@/services/cloudflare';
import { WorkerRoute } from '@/services/cloudflare';

export default function WorkerRoutesScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { t } = useTranslation();
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  const [routes, setRoutes] = useState<WorkerRoute[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const [showAdd, setShowAdd] = useState(false);
  const [editingRoute, setEditingRoute] = useState<WorkerRoute | null>(null);
  const [pattern, setPattern] = useState('');
  const [script, setScript] = useState('');

  const errMsg = (e: any) => e?.response?.data?.errors?.[0]?.message ?? e?.message ?? 'Error';

  const fetchAll = useCallback(async () => {
    setError(null);
    try {
      const res = await api.getWorkerRoutes(id);
      setRoutes(res.result ?? []);
    } catch (e: any) {
      setError(errMsg(e));
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [id]);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  const deleteRoute = (route: WorkerRoute) => {
    Alert.alert(t('worker_routes.delete_title'), t('worker_routes.delete_confirm', { pattern: route.pattern }), [
      { text: t('common.cancel'), style: 'cancel' },
      {
        text: t('common.delete'),
        style: 'destructive',
        onPress: async () => {
          try {
            await api.deleteWorkerRoute(id, route.id);
            setRoutes((prev) => prev.filter((r) => r.id !== route.id));
          } catch (e: any) {
            Alert.alert(t('common.error'), errMsg(e));
          }
        },
      },
    ]);
  };

  const openAdd = () => {
    setEditingRoute(null);
    setPattern('');
    setScript('');
    setShowAdd(true);
  };

  const openEdit = (route: WorkerRoute) => {
    setEditingRoute(route);
    setPattern(route.pattern);
    setScript(route.script || '');
    setShowAdd(true);
  };

  const submitRoute = async () => {
    const p = pattern.trim();
    if (!p) return;
    setSaving(true);
    try {
      if (editingRoute) {
        // Update existing route
        const res = await api.updateWorkerRoute(id, editingRoute.id, {
          pattern: p,
          script: script.trim() || undefined,
        });
        // Update in local state
        setRoutes((prev) => prev.map((r) => (r.id === editingRoute.id ? res.result : r)));
      } else {
        // Create new route
        const res = await api.createWorkerRoute(id, {
          pattern: p,
          script: script.trim() || undefined,
        });
        if (res.result) setRoutes((prev) => [...prev, res.result]);
      }
      setShowAdd(false);
    } catch (e: any) {
      Alert.alert(t('common.error'), errMsg(e));
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <>
        <Stack.Screen options={{ title: t('worker_routes.title') }} />
        <View style={{ flex: 1, backgroundColor: colors.background, padding: Spacing.lg }} accessibilityLabel={t('common.loading')}>
          <SkeletonRows count={6} />
        </View>
      </>
    );
  }

  return (
    <>
      <Stack.Screen options={{ title: t('worker_routes.title') }} />
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <ScrollView
          contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 96 }]}
          showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); fetchAll(); }} tintColor={colors.primary} />}
        >
          {error && (
            <View style={styles.banner}>
              <Banner message={error} />
            </View>
          )}

          {routes.length === 0 ? (
            <EmptyState icon="route" title={t('worker_routes.no_routes')} message={t('worker_routes.no_routes_message')} />
          ) : (
            routes.map((r) => (
              <Group key={r.id} style={styles.route}>
                <ListRow
                  icon="route"
                  iconTone={r.script ? 'success' : 'neutral'}
                  title={r.pattern}
                  subtitle={r.script ? `${t('worker_routes.script')}: ${r.script}` : t('worker_routes.no_script')}
                  onPress={() => openEdit(r)}
                  trailing={
                    <TouchableOpacity
                      onPress={() => deleteRoute(r)}
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

        <Fab label={t('worker_routes.add_route')} onPress={openAdd} />
      </View>

      <Sheet
        visible={showAdd}
        onClose={() => setShowAdd(false)}
        title={editingRoute ? t('worker_routes.edit_route') : t('worker_routes.add_route')}
        footer={
          <Button
            title={t('common.save')}
            onPress={submitRoute}
            loading={saving}
            disabled={!pattern.trim()}
          />
        }
      >
        <Field
          label={t('worker_routes.pattern')}
          placeholder="example.com/api/*"
          value={pattern}
          onChangeText={setPattern}
          mono
          autoCapitalize="none"
          autoCorrect={false}
        />

        <Field
          label={t('worker_routes.script')}
          placeholder="my-worker-script"
          value={script}
          onChangeText={setScript}
          mono
          autoCapitalize="none"
          autoCorrect={false}
        />
      </Sheet>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: Spacing.lg },
  banner: { marginBottom: Spacing.md },
  route: { marginBottom: Spacing.sm },
});
