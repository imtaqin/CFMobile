import { useEffect, useState, useCallback } from 'react';
import { StyleSheet, View, Text, ScrollView, RefreshControl, TouchableOpacity, Alert } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Icon } from '@/components/ui/icon';
import { useTheme } from '@/hooks/use-theme';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SkeletonRows, SkeletonHeading } from '@/components/ui/skeleton';
import { EmptyState } from '@/components/ui/empty-state';
import { SectionHeader } from '@/components/ui/section-header';
import { Button } from '@/components/ui/button';
import { Sheet } from '@/components/ui/sheet';
import { Banner, Fab, Field, Group, ListRow } from '@/components/ui/kit';
import { useAuth } from '@/contexts/auth';
import { Spacing, FontSize } from '@/constants/theme';
import * as api from '@/services/cloudflare';
import { PagesDeployment, PagesDomain } from '@/services/cloudflare';

const stageVariant = (s: string) =>
  s === 'success' ? 'success' : s === 'failure' ? 'error' : s === 'canceled' ? 'default' : 'warning';

const domainVariant = (s: string) =>
  s === 'active' ? 'success' : s === 'blocked' || s === 'error' ? 'error' : 'warning';

export default function PagesProjectScreen() {
  const { project } = useLocalSearchParams<{ project: string }>();
  const { t } = useTranslation();
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const { accountId } = useAuth();

  const [deployments, setDeployments] = useState<PagesDeployment[]>([]);
  const [domains, setDomains] = useState<PagesDomain[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);

  const [showAddDomain, setShowAddDomain] = useState(false);
  const [domainName, setDomainName] = useState('');
  const [saving, setSaving] = useState(false);

  const errMsg = (e: any) => e?.response?.data?.errors?.[0]?.message ?? e?.message ?? 'Error';

  const fetchAll = useCallback(async () => {
    if (!accountId || !project) return;
    setError(null);
    try {
      const dRes = await api.getPagesDeployments(accountId, project);
      setDeployments(dRes.result ?? []);
    } catch (e: any) {
      setError(errMsg(e));
    }
    try {
      const domRes = await api.getPagesDomains(accountId, project);
      setDomains(domRes.result ?? []);
    } catch {
      // custom domains need a zone on the account — absence is not fatal
    }
    setLoading(false);
    setRefreshing(false);
  }, [accountId, project]);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  const retry = async (d: PagesDeployment) => {
    if (!accountId || !project) return;
    setBusyId(d.id);
    try {
      await api.retryPagesDeployment(accountId, project, d.id);
      await fetchAll();
    } catch (e: any) {
      Alert.alert(t('common.error'), errMsg(e));
    } finally {
      setBusyId(null);
    }
  };

  const rollback = (d: PagesDeployment) => {
    if (!accountId || !project) return;
    Alert.alert(t('pages.rollback_title'), t('pages.rollback_confirm', { id: d.short_id }), [
      { text: t('common.cancel'), style: 'cancel' },
      {
        text: t('pages.rollback'),
        onPress: async () => {
          setBusyId(d.id);
          try {
            await api.rollbackPagesDeployment(accountId, project, d.id);
            await fetchAll();
          } catch (e: any) {
            Alert.alert(t('common.error'), errMsg(e));
          } finally {
            setBusyId(null);
          }
        },
      },
    ]);
  };

  const deleteDeployment = (d: PagesDeployment) => {
    if (!accountId || !project) return;
    Alert.alert(t('pages.delete_deployment_title'), t('pages.delete_deployment_confirm', { id: d.short_id }), [
      { text: t('common.cancel'), style: 'cancel' },
      {
        text: t('common.delete'),
        style: 'destructive',
        onPress: async () => {
          try {
            await api.deletePagesDeployment(accountId, project, d.id);
            setDeployments((prev) => prev.filter((x) => x.id !== d.id));
          } catch (e: any) {
            Alert.alert(t('common.error'), errMsg(e));
          }
        },
      },
    ]);
  };

  const submitAddDomain = async () => {
    if (!accountId || !project) return;
    const name = domainName.trim();
    if (!name) return;
    setSaving(true);
    try {
      const res = await api.addPagesDomain(accountId, project, name);
      if (res.result) setDomains((prev) => [...prev, res.result]);
      setShowAddDomain(false);
      setDomainName('');
    } catch (e: any) {
      Alert.alert(t('common.error'), errMsg(e));
    } finally {
      setSaving(false);
    }
  };

  const deleteDomain = (d: PagesDomain) => {
    if (!accountId || !project) return;
    Alert.alert(t('pages.delete_domain_title'), t('pages.delete_domain_confirm', { name: d.name }), [
      { text: t('common.cancel'), style: 'cancel' },
      {
        text: t('common.delete'),
        style: 'destructive',
        onPress: async () => {
          try {
            await api.deletePagesDomain(accountId, project, d.name);
            setDomains((prev) => prev.filter((x) => x.id !== d.id));
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
        <Stack.Screen options={{ title: project }} />
        <View style={[styles.container, { backgroundColor: colors.background, padding: Spacing.lg }]} accessibilityLabel={t('common.loading')}>
          <SkeletonHeading />
          <SkeletonRows count={4} />
          <SkeletonHeading />
          <SkeletonRows count={2} />
        </View>
      </>
    );
  }

  return (
    <>
      <Stack.Screen options={{ title: project }} />
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <ScrollView
          contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 96 }]}
          showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); fetchAll(); }} tintColor={colors.primary} />}
        >
          {error && <Banner message={error} />}

          <SectionHeader title={t('pages.deployments')} />
          {deployments.length === 0 && !error ? (
            <EmptyState icon="cloud-upload" title={t('pages.no_deployments')} message={t('pages.no_deployments_message')} />
          ) : (
            deployments.slice(0, 15).map((d) => (
              <Card key={d.id} style={styles.deployCard}>
                <View style={styles.deployHeader}>
                  <Badge label={d.environment} variant={d.environment === 'production' ? 'success' : 'info'} />
                  <Badge label={t(`pages.stage_${d.latest_stage.status}`, { defaultValue: d.latest_stage.status })} variant={stageVariant(d.latest_stage.status)} />
                  <View style={styles.spacer} />
                  <Text style={[styles.shortId, { color: colors.textTertiary }]}>{d.short_id}</Text>
                </View>
                {d.deployment_trigger?.metadata?.commit_message && (
                  <Text style={[styles.commitMsg, { color: colors.text }]} numberOfLines={1}>
                    {d.deployment_trigger.metadata.commit_message}
                  </Text>
                )}
                <Text style={[styles.meta, { color: colors.textTertiary }]}>
                  {d.deployment_trigger?.metadata?.branch ?? d.deployment_trigger?.type} · {new Date(d.created_on).toLocaleString()}
                </Text>
                <View style={styles.actionsRow}>
                  <Button
                    title={t('pages.retry')}
                    variant="secondary"
                    size="sm"
                    icon={<Icon name="refresh" size={14} color={colors.text} />}
                    onPress={() => retry(d)}
                    disabled={busyId === d.id}
                  />
                  <Button
                    title={t('pages.rollback')}
                    variant="secondary"
                    size="sm"
                    icon={<Icon name="route" size={14} color={colors.text} />}
                    onPress={() => rollback(d)}
                    disabled={busyId === d.id}
                  />
                  <View style={styles.spacer} />
                  <TouchableOpacity
                    onPress={() => deleteDeployment(d)}
                    hitSlop={10}
                    accessibilityRole="button"
                    accessibilityLabel={t('common.delete')}
                  >
                    <Icon name="trash" size={16} color={colors.textTertiary} />
                  </TouchableOpacity>
                </View>
              </Card>
            ))
          )}

          <SectionHeader title={t('pages.custom_domains')} />
          {domains.length === 0 ? (
            <EmptyState icon="globe" title={t('pages.no_domains')} message={t('pages.no_domains_message')} />
          ) : (
            <Group>
              {domains.map((d) => (
                <ListRow
                  key={d.id}
                  icon="globe"
                  title={d.name}
                  trailing={
                    <View style={styles.trailing}>
                      <Badge label={t(`pages.domain_${d.status}`, { defaultValue: d.status })} variant={domainVariant(d.status)} />
                      <TouchableOpacity
                        onPress={() => deleteDomain(d)}
                        hitSlop={10}
                        accessibilityRole="button"
                        accessibilityLabel={t('common.delete')}
                      >
                        <Icon name="trash" size={16} color={colors.textTertiary} />
                      </TouchableOpacity>
                    </View>
                  }
                />
              ))}
            </Group>
          )}
        </ScrollView>

        <Fab label={t('pages.add_domain')} onPress={() => setShowAddDomain(true)} />
      </View>

      <Sheet
        visible={showAddDomain}
        onClose={() => setShowAddDomain(false)}
        title={t('pages.add_domain')}
        footer={
          <Button
            title={t('common.save')}
            onPress={submitAddDomain}
            loading={saving}
            disabled={!domainName.trim()}
          />
        }
      >
        <Field
          label={t('pages.domain_name')}
          placeholder="app.example.com"
          value={domainName}
          onChangeText={setDomainName}
          autoCapitalize="none"
          autoCorrect={false}
          hint={t('pages.add_domain_hint')}
        />
      </Sheet>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: Spacing.lg },
  deployCard: { marginBottom: Spacing.sm, gap: 4 },
  deployHeader: { flexDirection: 'row', alignItems: 'center', gap: Spacing.xs, marginBottom: Spacing.xs },
  spacer: { flex: 1 },
  shortId: { fontSize: 12, fontFamily: 'monospace' },
  commitMsg: { fontSize: FontSize.md, fontWeight: '500' },
  meta: { fontSize: FontSize.xs },
  actionsRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm, marginTop: Spacing.sm },
  trailing: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md },
});
