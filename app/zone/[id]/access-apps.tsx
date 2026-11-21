import { useEffect, useState, useCallback } from 'react';
import { StyleSheet, View, Text, ScrollView, RefreshControl, TouchableOpacity, Alert } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Icon } from '@/components/ui/icon';
import { useTheme } from '@/hooks/use-theme';
import { Loading } from '@/components/ui/loading';
import { EmptyState } from '@/components/ui/empty-state';
import { SectionHeader } from '@/components/ui/section-header';
import { Button } from '@/components/ui/button';
import { Sheet } from '@/components/ui/sheet';
import { Banner, Fab, Field, Group, IconCircle, ListRow, ToggleRow } from '@/components/ui/kit';
import { Spacing, Radius, FontSize } from '@/constants/theme';
import * as api from '@/services/cloudflare';
import { AccessApplication } from '@/services/cloudflare';

export default function ZoneAccessAppsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { t } = useTranslation();
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  const [apps, setApps] = useState<AccessApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  // Create editor
  const [showAdd, setShowAdd] = useState(false);
  const [addName, setAddName] = useState('');
  const [addDomain, setAddDomain] = useState('');

  // Edit editor (one app at a time)
  const [editing, setEditing] = useState<AccessApplication | null>(null);
  const [name, setName] = useState('');
  const [domain, setDomain] = useState('');
  const [sessionDuration, setSessionDuration] = useState('');
  const [appLauncherVisible, setAppLauncherVisible] = useState(true);
  const [allowIframe, setAllowIframe] = useState(false);
  const [skipInterstitial, setSkipInterstitial] = useState(false);

  const errMsg = (e: any) => e?.response?.data?.errors?.[0]?.message ?? e?.message ?? 'Error';

  const fetchApps = useCallback(async () => {
    try {
      const res = await api.getZoneAccessApplications(id);
      setApps(res.result ?? []);
      setError(null);
    } catch (e: any) {
      // A scoped token with no Access read returns 403 — show an empty list, not a failure.
      if (e?.response?.status === 403) {
        setApps([]);
        setError(null);
      } else {
        setError(errMsg(e));
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [id]);

  useEffect(() => { fetchApps(); }, [fetchApps]);

  // ─── Create ────────────────────────────────────────────────────────────────

  const openAdd = () => {
    setAddName('');
    setAddDomain('');
    setShowAdd(true);
  };

  const submitAdd = async () => {
    const n = addName.trim();
    const d = addDomain.trim();
    if (!n || !d) return;
    setSaving(true);
    try {
      const res = await api.createZoneAccessApplication(id, { name: n, domain: d, type: 'self_hosted' });
      if (res.result) setApps((prev) => [...prev, res.result]);
      setShowAdd(false);
    } catch (e: any) {
      Alert.alert(t('common.error'), errMsg(e));
    } finally {
      setSaving(false);
    }
  };

  // ─── Edit ──────────────────────────────────────────────────────────────────

  const openEdit = (app: AccessApplication) => {
    setEditing(app);
    setName(app.name ?? '');
    setDomain(app.domain ?? '');
    setSessionDuration(app.session_duration ?? '24h');
    setAppLauncherVisible(app.app_launcher_visible ?? true);
    setAllowIframe(app.allow_iframe ?? false);
    setSkipInterstitial(app.skip_interstitial ?? false);
  };

  const saveApp = async () => {
    if (!editing) return;
    setSaving(true);
    try {
      // Only the fields we manage are sent; the server keeps everything else untouched.
      const res = await api.updateZoneAccessApplication(id, editing.id, {
        name: name.trim(),
        domain: domain.trim(),
        session_duration: sessionDuration.trim() || undefined,
        app_launcher_visible: appLauncherVisible,
      });
      const updated = res.result;
      setApps((prev) => prev.map((a) => (a.id === editing.id ? { ...a, ...updated } : a)));
      setEditing(null);
      Alert.alert(t('common.success'), t('access_apps.saved'));
    } catch (e: any) {
      Alert.alert(t('common.error'), errMsg(e));
    } finally {
      setSaving(false);
    }
  };

  const toggleSetting = async (key: 'allow_iframe' | 'skip_interstitial', value: boolean) => {
    if (!editing) return;
    if (key === 'allow_iframe') setAllowIframe(value); else setSkipInterstitial(value);
    try {
      await api.updateZoneAccessApplicationSettings(id, editing.id, { [key]: value });
      setApps((prev) => prev.map((a) => (a.id === editing.id ? { ...a, [key]: value } : a)));
    } catch (e: any) {
      // Revert the optimistic flip on failure.
      if (key === 'allow_iframe') setAllowIframe(!value); else setSkipInterstitial(!value);
      Alert.alert(t('common.error'), errMsg(e));
    }
  };

  const revokeTokens = () => {
    if (!editing) return;
    const appId = editing.id;
    Alert.alert(t('access_apps.revoke_title'), t('access_apps.revoke_confirm'), [
      { text: t('common.cancel'), style: 'cancel' },
      {
        text: t('access_apps.revoke'),
        style: 'destructive',
        onPress: async () => {
          try {
            await api.revokeZoneAccessApplicationTokens(id, appId);
            Alert.alert(t('common.success'), t('access_apps.revoke_success'));
          } catch (e: any) {
            Alert.alert(t('common.error'), errMsg(e));
          }
        },
      },
    ]);
  };

  const deleteApp = (app: AccessApplication) => {
    Alert.alert(t('access_apps.delete_title'), t('access_apps.delete_confirm', { name: app.name }), [
      { text: t('common.cancel'), style: 'cancel' },
      {
        text: t('common.delete'),
        style: 'destructive',
        onPress: async () => {
          try {
            await api.deleteZoneAccessApplication(id, app.id);
            setApps((prev) => prev.filter((a) => a.id !== app.id));
            if (editing?.id === app.id) setEditing(null);
          } catch (e: any) {
            Alert.alert(t('common.error'), errMsg(e));
          }
        },
      },
    ]);
  };

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
            <EmptyState icon="fingerprint" title={t('access_apps.no_apps')} message={t('zone_access.no_apps_message')} />
          ) : (
            apps.map((app) => (
              <View
                key={app.id}
                style={[styles.item, { backgroundColor: colors.surface, borderColor: colors.borderLight }]}
              >
                <ListRow
                  icon="fingerprint"
                  title={app.name}
                  subtitle={app.domain}
                  onPress={() => openEdit(app)}
                  chevron
                  trailing={
                    <TouchableOpacity
                      onPress={() => deleteApp(app)}
                      hitSlop={10}
                      accessibilityRole="button"
                      accessibilityLabel={t('common.delete')}
                    >
                      <Icon name="trash" size={16} color={colors.textTertiary} />
                    </TouchableOpacity>
                  }
                />
              </View>
            ))
          )}
        </ScrollView>

        <Fab label={t('access_apps.add_app')} onPress={openAdd} />
      </View>

      {/* Create editor */}
      <Sheet
        visible={showAdd}
        onClose={() => setShowAdd(false)}
        title={t('access_apps.add_app')}
        footer={
          <Button
            title={t('common.save')}
            onPress={submitAdd}
            loading={saving}
            disabled={!addName.trim() || !addDomain.trim()}
          />
        }
      >
        <Field
          label={t('access_apps.name')}
          placeholder="Internal Wiki"
          value={addName}
          onChangeText={setAddName}
        />
        <Field
          label={t('access_apps.domain')}
          placeholder="wiki.example.com"
          value={addDomain}
          onChangeText={setAddDomain}
          autoCapitalize="none"
          autoCorrect={false}
          mono
        />
      </Sheet>

      {/* Edit editor */}
      <Sheet
        visible={!!editing}
        onClose={() => setEditing(null)}
        title={editing?.name ?? t('access_apps.title')}
        footer={
          <Button
            title={t('common.save')}
            onPress={saveApp}
            loading={saving}
            disabled={!name.trim() || !domain.trim()}
          />
        }
      >
        <Field
          label={t('access_apps.name')}
          value={name}
          onChangeText={setName}
        />
        <Field
          label={t('access_apps.domain')}
          value={domain}
          onChangeText={setDomain}
          autoCapitalize="none"
          autoCorrect={false}
          mono
        />
        <Field
          label={t('access_apps.session_duration')}
          placeholder="24h"
          value={sessionDuration}
          onChangeText={setSessionDuration}
          autoCapitalize="none"
          autoCorrect={false}
          mono
        />
        <Group style={styles.group}>
          <ToggleRow
            title={t('access_apps.app_launcher_visible')}
            value={appLauncherVisible}
            onValueChange={setAppLauncherVisible}
          />
        </Group>

        <SectionHeader title={t('access_apps.settings')} />
        <Group>
          <ToggleRow
            title={t('access_apps.allow_iframe')}
            value={allowIframe}
            onValueChange={(v) => toggleSetting('allow_iframe', v)}
          />
          <ToggleRow
            title={t('access_apps.skip_interstitial')}
            value={skipInterstitial}
            onValueChange={(v) => toggleSetting('skip_interstitial', v)}
          />
        </Group>

        <SectionHeader title={t('access_apps.danger_zone')} />
        <Group>
          <ListRow icon="refresh" iconTone="warning" title={t('access_apps.revoke')} onPress={revokeTokens} />
          <TouchableOpacity style={styles.dangerRow} onPress={() => editing && deleteApp(editing)} activeOpacity={0.7}>
            <IconCircle name="trash" tone="error" />
            <Text style={[styles.dangerLabel, { color: colors.error }]} numberOfLines={1}>
              {t('access_apps.delete_app')}
            </Text>
          </TouchableOpacity>
        </Group>
      </Sheet>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: Spacing.lg },
  item: { borderRadius: Radius.lg, borderWidth: 1, marginBottom: Spacing.sm, overflow: 'hidden' },
  group: { marginTop: Spacing.md },
  dangerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    paddingHorizontal: Spacing.lg,
    paddingVertical: 13,
  },
  dangerLabel: { flex: 1, fontSize: FontSize.md, fontWeight: '500' },
});
