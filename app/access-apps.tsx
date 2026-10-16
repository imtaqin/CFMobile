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
import { Banner, Fab, Field, ListRow } from '@/components/ui/kit';
import { Sheet } from '@/components/ui/sheet';
import { useAuth } from '@/contexts/auth';
import { Spacing, Radius } from '@/constants/theme';
import * as api from '@/services/cloudflare';
import { AccessApplication } from '@/services/cloudflare';
import { useUnlocked } from '@/services/ad-reward';
import { PremiumPaywall } from '@/components/ui/premium-gate';

export default function AccessAppsScreen() {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const { accountId } = useAuth();
  const premium = useUnlocked('access');

  const [apps, setApps] = useState<AccessApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const [showAdd, setShowAdd] = useState(false);
  const [name, setName] = useState('');
  const [domain, setDomain] = useState('');

  const errMsg = (e: any) => e?.response?.data?.errors?.[0]?.message ?? e?.message ?? 'Error';

  const fetchApps = useCallback(async () => {
    if (!accountId || !premium) { setLoading(false); return; }
    try {
      const res = await api.getAccessApplications(accountId);
      setApps(res.result ?? []);
      setError(null);
    } catch (e: any) {
      setError(errMsg(e));
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [accountId, premium]);

  useEffect(() => { fetchApps(); }, [fetchApps]);

  const openAdd = () => {
    setName('');
    setDomain('');
    setShowAdd(true);
  };

  const submitAdd = async () => {
    if (!accountId) return;
    const n = name.trim();
    const d = domain.trim();
    if (!n || !d) return;
    setSaving(true);
    try {
      const res = await api.createAccessApplication(accountId, { name: n, domain: d, type: 'self_hosted' });
      if (res.result) setApps((prev) => [...prev, res.result]);
      setShowAdd(false);
    } catch (e: any) {
      Alert.alert(t('common.error'), errMsg(e));
    } finally {
      setSaving(false);
    }
  };

  const deleteApp = (app: AccessApplication) => {
    if (!accountId) return;
    Alert.alert(t('access_apps.delete_title'), t('access_apps.delete_confirm', { name: app.name }), [
      { text: t('common.cancel'), style: 'cancel' },
      {
        text: t('common.delete'),
        style: 'destructive',
        onPress: async () => {
          try {
            await api.deleteAccessApplication(accountId, app.id);
            setApps((prev) => prev.filter((a) => a.id !== app.id));
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
        <Stack.Screen options={{ title: t('access_apps.title') }} />
        <PremiumPaywall feature="access" />
      </>
    );
  }

  if (loading) return <Loading />;

  return (
    <>
      <Stack.Screen options={{ title: t('access_apps.title') }} />
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <ScrollView
          contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 96 }]}
          showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); fetchApps(); }} tintColor={colors.primary} />}
        >
          {!!error && <Banner message={error} />}

          <SectionHeader title={t('access_apps.applications')} />
          {apps.length === 0 ? (
            <EmptyState icon="shield" title={t('access_apps.no_apps')} message={t('access_apps.no_apps_message')} />
          ) : (
            apps.map((app) => (
              <View
                key={app.id}
                style={[styles.item, { backgroundColor: colors.surface, borderColor: colors.borderLight }]}
              >
                <ListRow
                  icon="shield"
                  title={app.name}
                  subtitle={app.domain}
                  onPress={() => router.push({ pathname: '/access-apps/[app]' as any, params: { app: app.id } })}
                  chevron
                  trailing={
                    <>
                      {app.policies && app.policies.length > 0 && (
                        <View>
                          <Badge label={`${app.policies.length} ${t('access_apps.policies')}`} />
                        </View>
                      )}
                      <TouchableOpacity
                        onPress={() => deleteApp(app)}
                        hitSlop={10}
                        accessibilityRole="button"
                        accessibilityLabel={t('common.delete')}
                      >
                        <Icon name="trash" size={16} color={colors.textTertiary} />
                      </TouchableOpacity>
                    </>
                  }
                />
              </View>
            ))
          )}
        </ScrollView>

        <Fab label={t('access_apps.add_app')} onPress={openAdd} />
      </View>

      <Sheet
        visible={showAdd}
        onClose={() => setShowAdd(false)}
        title={t('access_apps.add_app')}
        footer={
          <Button
            title={t('common.save')}
            onPress={submitAdd}
            loading={saving}
            disabled={!name.trim() || !domain.trim()}
          />
        }
      >
        <Field
          label={t('access_apps.name')}
          placeholder="Internal Wiki"
          value={name}
          onChangeText={setName}
        />
        <Field
          label={t('access_apps.domain')}
          placeholder="wiki.example.com"
          value={domain}
          onChangeText={setDomain}
          autoCapitalize="none"
          autoCorrect={false}
          mono
        />
      </Sheet>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: Spacing.lg },
  item: { borderRadius: Radius.lg, borderWidth: 1, marginBottom: Spacing.sm, overflow: 'hidden' },
});
