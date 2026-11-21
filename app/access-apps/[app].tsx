import { useEffect, useState, useCallback } from 'react';
import { StyleSheet, Text, ScrollView, RefreshControl, TouchableOpacity, Alert } from 'react-native';
import { router, useLocalSearchParams, Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/hooks/use-theme';
import { SkeletonRows, SkeletonHeading } from '@/components/ui/skeleton';
import { SectionHeader } from '@/components/ui/section-header';
import { Button } from '@/components/ui/button';
import { Banner, Field, Group, IconCircle, ListRow, ToggleRow } from '@/components/ui/kit';
import { useAuth } from '@/contexts/auth';
import { Spacing, FontSize } from '@/constants/theme';
import * as api from '@/services/cloudflare';
import { AccessApplication } from '@/services/cloudflare';

export default function AccessAppDetailScreen() {
  const { app: appId } = useLocalSearchParams<{ app: string }>();
  const { t } = useTranslation();
  const { colors } = useTheme();
  const { accountId } = useAuth();

  const [app, setApp] = useState<AccessApplication | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const [name, setName] = useState('');
  const [domain, setDomain] = useState('');
  const [sessionDuration, setSessionDuration] = useState('');
  const [appLauncherVisible, setAppLauncherVisible] = useState(true);
  const [allowIframe, setAllowIframe] = useState(false);
  const [skipInterstitial, setSkipInterstitial] = useState(false);

  const errMsg = (e: any) => e?.response?.data?.errors?.[0]?.message ?? e?.message ?? 'Error';

  const fetchApp = useCallback(async () => {
    if (!accountId) { setLoading(false); return; }
    try {
      const res = await api.getAccessApplication(accountId, appId);
      const a = res.result;
      setApp(a);
      if (a) {
        setName(a.name ?? '');
        setDomain(a.domain ?? '');
        setSessionDuration(a.session_duration ?? '24h');
        setAppLauncherVisible(a.app_launcher_visible ?? true);
      }
      setError(null);
    } catch (e: any) {
      setError(errMsg(e));
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [accountId, appId]);

  useEffect(() => { fetchApp(); }, [fetchApp]);

  const saveApp = async () => {
    if (!accountId) return;
    setSaving(true);
    try {
      await api.updateAccessApplication(accountId, appId, {
        name: name.trim(),
        domain: domain.trim(),
        session_duration: sessionDuration.trim() || undefined,
        app_launcher_visible: appLauncherVisible,
      });
      Alert.alert(t('common.success'), t('access_apps.saved'));
    } catch (e: any) {
      Alert.alert(t('common.error'), errMsg(e));
    } finally {
      setSaving(false);
    }
  };

  const toggleSetting = async (key: 'allow_iframe' | 'skip_interstitial', value: boolean) => {
    if (!accountId) return;
    if (key === 'allow_iframe') setAllowIframe(value); else setSkipInterstitial(value);
    try {
      await api.updateAccessApplicationSettings(accountId, appId, { [key]: value });
    } catch (e: any) {
      if (key === 'allow_iframe') setAllowIframe(!value); else setSkipInterstitial(!value);
      Alert.alert(t('common.error'), errMsg(e));
    }
  };

  const revokeTokens = () => {
    if (!accountId) return;
    Alert.alert(t('access_apps.revoke_title'), t('access_apps.revoke_confirm'), [
      { text: t('common.cancel'), style: 'cancel' },
      {
        text: t('access_apps.revoke'),
        style: 'destructive',
        onPress: async () => {
          try {
            await api.revokeAccessApplicationTokens(accountId, appId);
            Alert.alert(t('common.success'), t('access_apps.revoke_success'));
          } catch (e: any) {
            Alert.alert(t('common.error'), errMsg(e));
          }
        },
      },
    ]);
  };

  const deleteApp = () => {
    if (!accountId) return;
    Alert.alert(t('access_apps.delete_title'), t('access_apps.delete_confirm', { name }), [
      { text: t('common.cancel'), style: 'cancel' },
      {
        text: t('common.delete'),
        style: 'destructive',
        onPress: async () => {
          try {
            await api.deleteAccessApplication(accountId, appId);
            router.back();
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
        <Stack.Screen options={{ title: app?.name ?? t('access_apps.title') }} />
        <ScrollView
          scrollEnabled={false}
          style={[styles.container, { backgroundColor: colors.background }]}
          contentContainerStyle={styles.content}
          accessibilityLabel={t('common.loading')}
        >
          <SkeletonHeading />
          <SkeletonRows count={4} avatar={false} />
          <SkeletonHeading />
          <SkeletonRows count={2} avatar={false} />
          <SkeletonHeading />
          <SkeletonRows count={2} avatar={false} />
        </ScrollView>
      </>
    );
  }

  return (
    <>
      <Stack.Screen options={{ title: app?.name ?? t('access_apps.title') }} />
      <ScrollView
        style={[styles.container, { backgroundColor: colors.background }]}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); fetchApp(); }} tintColor={colors.primary} />}
      >
        {!!error && <Banner message={error} />}

        <SectionHeader title={t('access_apps.details')} />
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
        <Group style={styles.afterFields}>
          <ToggleRow
            title={t('access_apps.app_launcher_visible')}
            value={appLauncherVisible}
            onValueChange={setAppLauncherVisible}
          />
        </Group>
        <Button title={t('common.save')} onPress={saveApp} loading={saving} style={styles.afterFields} />

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
          {/* Destructive row: the label itself is red, the card stays neutral. */}
          <TouchableOpacity style={styles.dangerRow} onPress={deleteApp} activeOpacity={0.7}>
            <IconCircle name="trash" tone="error" />
            <Text style={[styles.dangerLabel, { color: colors.error }]} numberOfLines={1}>
              {t('access_apps.delete_app')}
            </Text>
          </TouchableOpacity>
        </Group>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: Spacing.lg, paddingBottom: Spacing.xxxl },
  afterFields: { marginTop: Spacing.md },
  dangerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    paddingHorizontal: Spacing.lg,
    paddingVertical: 13,
  },
  dangerLabel: { flex: 1, fontSize: FontSize.md, fontWeight: '500' },
});
