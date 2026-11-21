import { useEffect, useState, useCallback } from 'react';
import { StyleSheet, View, ScrollView, RefreshControl, TouchableOpacity, Alert, Switch } from 'react-native';
import { Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Icon } from '@/components/ui/icon';
import { useTheme } from '@/hooks/use-theme';
import { Badge } from '@/components/ui/badge';
import { SkeletonRows, SkeletonHeading } from '@/components/ui/skeleton';
import { EmptyState } from '@/components/ui/empty-state';
import { SectionHeader } from '@/components/ui/section-header';
import { Button } from '@/components/ui/button';
import { Banner, Fab, Field, Group, ListRow } from '@/components/ui/kit';
import { Sheet } from '@/components/ui/sheet';
import { useAuth } from '@/contexts/auth';
import { Spacing } from '@/constants/theme';
import * as api from '@/services/cloudflare';
import { NotificationPolicy, NotificationWebhook } from '@/services/cloudflare';

export default function NotificationsScreen() {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const { accountId } = useAuth();

  const [policies, setPolicies] = useState<NotificationPolicy[]>([]);
  const [webhooks, setWebhooks] = useState<NotificationWebhook[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const [showAddWebhook, setShowAddWebhook] = useState(false);
  const [whName, setWhName] = useState('');
  const [whUrl, setWhUrl] = useState('');

  const errMsg = (e: any) => e?.response?.data?.errors?.[0]?.message ?? e?.message ?? 'Error';

  const fetchAll = useCallback(async () => {
    if (!accountId) { setLoading(false); return; }
    setError(null);
    const [pRes, wRes] = await Promise.allSettled([
      api.getNotificationPolicies(accountId),
      api.getNotificationWebhooks(accountId),
    ]);
    if (pRes.status === 'fulfilled') setPolicies(pRes.value.result ?? []);
    else setError(errMsg(pRes.reason));
    if (wRes.status === 'fulfilled') setWebhooks(wRes.value.result ?? []);
    setLoading(false);
    setRefreshing(false);
  }, [accountId]);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  const togglePolicy = async (policy: NotificationPolicy, enabled: boolean) => {
    if (!accountId) return;
    const prev = policy.enabled;
    setPolicies((list) => list.map((p) => (p.id === policy.id ? { ...p, enabled } : p)));
    try {
      await api.updateNotificationPolicy(accountId, policy.id, { ...policy, enabled });
    } catch (e: any) {
      setPolicies((list) => list.map((p) => (p.id === policy.id ? { ...p, enabled: prev } : p)));
      Alert.alert(t('common.error'), errMsg(e));
    }
  };

  const deletePolicy = (policy: NotificationPolicy) => {
    if (!accountId) return;
    Alert.alert(t('notifications.delete_policy_title'), t('notifications.delete_policy_confirm', { name: policy.name }), [
      { text: t('common.cancel'), style: 'cancel' },
      {
        text: t('common.delete'),
        style: 'destructive',
        onPress: async () => {
          try {
            await api.deleteNotificationPolicy(accountId, policy.id);
            setPolicies((list) => list.filter((p) => p.id !== policy.id));
          } catch (e: any) {
            Alert.alert(t('common.error'), errMsg(e));
          }
        },
      },
    ]);
  };

  const submitWebhook = async () => {
    if (!accountId) return;
    const name = whName.trim();
    const url = whUrl.trim();
    if (!name || !url) return;
    setSaving(true);
    try {
      await api.createNotificationWebhook(accountId, { name, url });
      setShowAddWebhook(false);
      setWhName('');
      setWhUrl('');
      fetchAll();
    } catch (e: any) {
      Alert.alert(t('common.error'), errMsg(e));
    } finally {
      setSaving(false);
    }
  };

  const deleteWebhook = (wh: NotificationWebhook) => {
    if (!accountId) return;
    Alert.alert(t('notifications.delete_webhook_title'), t('notifications.delete_webhook_confirm', { name: wh.name }), [
      { text: t('common.cancel'), style: 'cancel' },
      {
        text: t('common.delete'),
        style: 'destructive',
        onPress: async () => {
          try {
            await api.deleteNotificationWebhook(accountId, wh.id);
            setWebhooks((list) => list.filter((w) => w.id !== wh.id));
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
        <Stack.Screen options={{ title: t('notifications.title') }} />
        <View style={[styles.container, styles.content, { backgroundColor: colors.background }]} accessibilityLabel={t('common.loading')}>
          <SkeletonHeading />
          <SkeletonRows count={4} />
          <SkeletonHeading />
          <SkeletonRows count={3} />
        </View>
      </>
    );
  }

  const trash = (onPress: () => void) => (
    <TouchableOpacity onPress={onPress} hitSlop={10} accessibilityRole="button" accessibilityLabel={t('common.delete')}>
      <Icon name="trash" size={16} color={colors.textTertiary} />
    </TouchableOpacity>
  );

  return (
    <>
      <Stack.Screen options={{ title: t('notifications.title') }} />
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <ScrollView
          contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 96 }]}
          showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); fetchAll(); }} tintColor={colors.primary} />}
        >
          {error && <Banner message={error} />}

          <SectionHeader title={t('notifications.policies')} />
          {policies.length === 0 && !error ? (
            <EmptyState icon="bell" title={t('notifications.no_policies')} message={t('notifications.no_policies_message')} />
          ) : (
            <Group>
              {policies.map((p) => (
                <ListRow
                  key={p.id}
                  icon="bell"
                  title={p.name || p.alert_type}
                  subtitle={p.alert_type}
                  trailing={
                    <View style={styles.actions}>
                      <Switch
                        value={p.enabled}
                        onValueChange={(v) => togglePolicy(p, v)}
                        trackColor={{ true: colors.primary, false: colors.border }}
                        thumbColor="#FFF"
                      />
                      {trash(() => deletePolicy(p))}
                    </View>
                  }
                />
              ))}
            </Group>
          )}

          <SectionHeader title={t('notifications.webhooks')} />
          {webhooks.length === 0 ? (
            <EmptyState icon="link" title={t('notifications.no_webhooks')} message={t('notifications.no_webhooks_message')} />
          ) : (
            <Group>
              {webhooks.map((w) => (
                <ListRow
                  key={w.id}
                  icon="link"
                  title={w.name}
                  subtitle={w.url}
                  mono
                  trailing={
                    <View style={styles.actions}>
                      {!!w.type && <Badge label={w.type} />}
                      {trash(() => deleteWebhook(w))}
                    </View>
                  }
                />
              ))}
            </Group>
          )}
        </ScrollView>

        <Fab label={t('notifications.add_webhook')} onPress={() => setShowAddWebhook(true)} />
      </View>

      {/* Add webhook */}
      <Sheet
        visible={showAddWebhook}
        onClose={() => setShowAddWebhook(false)}
        title={t('notifications.add_webhook')}
        footer={
          <Button
            title={t('common.save')}
            onPress={submitWebhook}
            loading={saving}
            disabled={!whName.trim() || !whUrl.trim()}
          />
        }
      >
        <Field
          label={t('notifications.webhook_name')}
          placeholder="Ops Slack"
          value={whName}
          onChangeText={setWhName}
        />
        <Field
          label={t('notifications.webhook_url')}
          placeholder="https://hooks.slack.com/..."
          value={whUrl}
          onChangeText={setWhUrl}
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
  actions: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md },
});
