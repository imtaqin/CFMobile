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
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Sheet } from '@/components/ui/sheet';
import { Banner, Fab, Field, Group, ListRow, ToggleRow } from '@/components/ui/kit';
import { useAuth } from '@/contexts/auth';
import { Spacing } from '@/constants/theme';
import * as api from '@/services/cloudflare';
import { DispatchNamespace } from '@/services/cloudflare';
import { useUnlocked } from '@/services/ad-reward';
import { PremiumPaywall } from '@/components/ui/premium-gate';

export default function WorkersForPlatformsScreen() {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const { accountId } = useAuth();
  const premium = useUnlocked('workers-for-platforms');

  const [namespaces, setNamespaces] = useState<DispatchNamespace[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const [showAdd, setShowAdd] = useState(false);
  const [name, setName] = useState('');
  const [trusted, setTrusted] = useState(false);

  const errMsg = (e: any) => e?.response?.data?.errors?.[0]?.message ?? e?.message ?? 'Error';

  const fetchNamespaces = useCallback(async () => {
    if (!accountId || !premium) { setLoading(false); return; }
    try {
      const res = await api.getDispatchNamespaces(accountId);
      setNamespaces(res.result ?? []);
      setError(null);
    } catch (e: any) {
      setError(errMsg(e));
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [accountId, premium]);

  useEffect(() => { fetchNamespaces(); }, [fetchNamespaces]);

  const openAdd = () => {
    setName('');
    setTrusted(false);
    setShowAdd(true);
  };

  const submitAdd = async () => {
    if (!accountId) return;
    const n = name.trim();
    if (!n) return;
    setSaving(true);
    try {
      const res = await api.createDispatchNamespace(accountId, n);
      if (res.result) setNamespaces((prev) => [...prev, res.result]);
      setShowAdd(false);
    } catch (e: any) {
      Alert.alert(t('common.error'), errMsg(e));
    } finally {
      setSaving(false);
    }
  };

  const deleteNamespace = (ns: DispatchNamespace) => {
    if (!accountId) return;
    Alert.alert(t('wfp.delete_title'), t('wfp.delete_confirm', { name: ns.namespace_name }), [
      { text: t('common.cancel'), style: 'cancel' },
      {
        text: t('common.delete'),
        style: 'destructive',
        onPress: async () => {
          try {
            await api.deleteDispatchNamespace(accountId, ns.namespace_name);
            setNamespaces((prev) => prev.filter((x) => x.namespace_id !== ns.namespace_id));
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
        <Stack.Screen options={{ title: t('wfp.title') }} />
        <PremiumPaywall feature="workers-for-platforms" />
      </>
    );
  }

  if (loading) return <Loading />;

  return (
    <>
      <Stack.Screen options={{ title: t('wfp.title') }} />
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <ScrollView
          contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 96 }]}
          showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); fetchNamespaces(); }} tintColor={colors.primary} />}
        >
          {error && <Banner message={error} />}

          <SectionHeader title={t('wfp.namespaces')} />
          {namespaces.length === 0 ? (
            <EmptyState icon="code" title={t('wfp.no_namespaces')} message={t('wfp.no_namespaces_message')} />
          ) : (
            namespaces.map((ns) => (
              <Group key={ns.namespace_id} style={styles.item}>
                <ListRow
                  icon="code"
                  title={ns.namespace_name}
                  subtitle={`${ns.script_count ?? 0} ${t('wfp.scripts')}`}
                  onPress={() => router.push({ pathname: '/workers-for-platforms/[namespace]' as any, params: { namespace: ns.namespace_name } })}
                  chevron
                  trailing={
                    <View style={styles.trailing}>
                      {ns.trusted_workers && <Badge label={t('wfp.trusted')} variant="info" />}
                      <TouchableOpacity
                        onPress={() => deleteNamespace(ns)}
                        hitSlop={10}
                        accessibilityRole="button"
                        accessibilityLabel={t('common.delete')}
                      >
                        <Icon name="trash" size={16} color={colors.textTertiary} />
                      </TouchableOpacity>
                    </View>
                  }
                />
              </Group>
            ))
          )}
        </ScrollView>

        <Fab label={t('wfp.add_namespace')} onPress={openAdd} />
      </View>

      <Sheet
        visible={showAdd}
        onClose={() => setShowAdd(false)}
        title={t('wfp.add_namespace')}
        footer={
          <Button
            title={t('common.save')}
            onPress={submitAdd}
            loading={saving}
            disabled={!name.trim()}
          />
        }
      >
        <Field
          label={t('wfp.name')}
          placeholder="customer-workers"
          value={name}
          onChangeText={setName}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Group style={styles.toggle}>
          <ToggleRow title={t('wfp.trusted_workers')} value={trusted} onValueChange={setTrusted} />
        </Group>
      </Sheet>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: Spacing.lg },
  item: { marginBottom: Spacing.sm },
  trailing: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md },
  toggle: { marginTop: Spacing.lg },
});
