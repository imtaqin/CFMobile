import { useEffect, useState, useCallback } from 'react';
import {
  StyleSheet, View, Text, ScrollView, RefreshControl, Alert, TouchableOpacity,
} from 'react-native';
import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/contexts/auth';
import { Icon, IconName } from '@/components/ui/icon';
import { useTheme } from '@/hooks/use-theme';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loading } from '@/components/ui/loading';
import { EmptyState } from '@/components/ui/empty-state';
import { SectionHeader } from '@/components/ui/section-header';
import { Spacing, FontSize, Radius } from '@/constants/theme';
import * as api from '@/services/cloudflare';
import { WorkerScript, KVNamespace, R2Bucket, PagesProject } from '@/services/types';

interface ServiceError {
  workers?: string;
  kv?: string;
  r2?: string;
  pages?: string;
}

export default function ServicesScreen() {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const { accountId, permissions } = useAuth();
  const perms = permissions ?? { workers: true, kv: true, r2: true, pages: true } as any;

  const [workers, setWorkers] = useState<WorkerScript[]>([]);
  const [kvNamespaces, setKvNamespaces] = useState<KVNamespace[]>([]);
  const [r2Buckets, setR2Buckets] = useState<R2Bucket[]>([]);
  const [pages, setPages] = useState<PagesProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [errors, setErrors] = useState<ServiceError>({});

  const getErrorMsg = (e: any): string => {
    return e?.response?.data?.errors?.[0]?.message
      ?? e?.response?.data?.messages?.[0]?.message
      ?? e?.message
      ?? 'Unknown error';
  };

  const fetchAll = useCallback(async () => {
    if (!accountId) {
      setLoading(false);
      return;
    }

    const newErrors: ServiceError = {};

    const [wRes, kvRes, r2Res, pRes] = await Promise.allSettled([
      api.getWorkerScripts(accountId),
      api.getKVNamespaces(accountId),
      api.getR2Buckets(accountId),
      api.getPagesProjects(accountId),
    ]);

    if (wRes.status === 'fulfilled') {
      const result = wRes.value.result;
      setWorkers(Array.isArray(result) ? result : []);
    } else {
      newErrors.workers = getErrorMsg(wRes.reason);
      console.log('[CF] Workers error:', wRes.reason?.response?.data ?? wRes.reason?.message);
    }

    if (kvRes.status === 'fulfilled') {
      const result = kvRes.value.result;
      setKvNamespaces(Array.isArray(result) ? result : []);
    } else {
      newErrors.kv = getErrorMsg(kvRes.reason);
      console.log('[CF] KV error:', kvRes.reason?.response?.data ?? kvRes.reason?.message);
    }

    if (r2Res.status === 'fulfilled') {
      const result = r2Res.value.result;
      setR2Buckets(Array.isArray(result) ? result : []);
    } else {
      newErrors.r2 = getErrorMsg(r2Res.reason);
      console.log('[CF] R2 error:', r2Res.reason?.response?.data ?? r2Res.reason?.message);
    }

    if (pRes.status === 'fulfilled') {
      const result = pRes.value.result;
      setPages(Array.isArray(result) ? result : []);
    } else {
      newErrors.pages = getErrorMsg(pRes.reason);
      console.log('[CF] Pages error:', pRes.reason?.response?.data ?? pRes.reason?.message);
    }

    setErrors(newErrors);
    setLoading(false);
    setRefreshing(false);
  }, [accountId]);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  const onRefresh = () => { setRefreshing(true); fetchAll(); };

  if (loading) return <Loading message={t('common.loading')} />;

  if (!accountId) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <EmptyState
          icon="error-circle"
          title={t('services.no_account')}
          message={t('services.no_account_message')}
        />
      </View>
    );
  }

  const ErrorBanner = ({ message }: { message: string }) => (
    <View style={[styles.errorBanner, { backgroundColor: colors.error + '15' }]}>
      <Icon name="error-circle" size={16} color={colors.error} />
      <Text style={[styles.errorText, { color: colors.error }]} numberOfLines={2}>{message}</Text>
    </View>
  );

  const ServiceCard = ({ icon, iconColor, title, count, error }: {
    icon: IconName; iconColor: string; title: string; count: number; error?: string;
  }) => (
    <Card style={styles.serviceCard}>
      <View style={[styles.serviceIcon, { backgroundColor: iconColor + '15' }]}>
        <Icon name={icon} size={24} color={error ? colors.error : iconColor} />
      </View>
      <Text style={[styles.serviceTitle, { color: colors.text }]}>{title}</Text>
      {error ? (
        <Text style={[styles.serviceCount, { color: colors.error }]} numberOfLines={1}>
          {error}
        </Text>
      ) : (
        <Text style={[styles.serviceCount, { color: colors.textSecondary }]}>
          {count} {count === 1 ? 'item' : 'items'}
        </Text>
      )}
    </Card>
  );

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.content}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.primary} />}
    >
      {/* Account chip */}
      <View style={[styles.accountChip, { backgroundColor: colors.surface, borderColor: colors.borderLight }]}>
        <View style={[styles.accountIcon, { backgroundColor: colors.primary + '15' }]}>
          <Icon name="user" size={14} color={colors.primary} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={[styles.accountLabel, { color: colors.textTertiary }]}>ACCOUNT</Text>
          <Text style={[styles.accountValue, { color: colors.text }]} numberOfLines={1}>
            {accountId ? accountId.slice(0, 4) + '\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022' : '-'}
          </Text>
        </View>
      </View>

      {/* Service Overview Cards */}
      <View style={styles.grid}>
        {perms.workers && <ServiceCard icon="code" iconColor={colors.info} title={t('services.workers')} count={workers.length} error={errors.workers} />}
        {perms.kv && <ServiceCard icon="database" iconColor={colors.warning} title="KV" count={kvNamespaces.length} error={errors.kv} />}
        {perms.r2 && <ServiceCard icon="cloud-upload" iconColor={colors.success} title="R2" count={r2Buckets.length} error={errors.r2} />}
        {perms.pages && <ServiceCard icon="monitor" iconColor={colors.error} title="Pages" count={pages.length} error={errors.pages} />}
      </View>

      {/* Workers List */}
      {perms.workers && (
        <>
          <SectionHeader title={t('services.workers')} />
          {errors.workers ? (
            <ErrorBanner message={errors.workers} />
          ) : workers.length === 0 ? (
            <EmptyState icon="code" title={t('services.no_workers')} />
          ) : (
            workers.map((w) => (
              <TouchableOpacity
                key={w.id}
                activeOpacity={0.7}
                onPress={() => router.push({ pathname: '/worker-tail/[script]' as any, params: { script: w.id } })}
              >
                <Card style={styles.itemCard}>
                  <View style={styles.itemRow}>
                    <Icon name="code" size={20} color={colors.info} />
                    <View style={{ flex: 1 }}>
                      <Text style={[styles.itemName, { color: colors.text }]}>{w.id}</Text>
                      <Text style={[styles.itemMeta, { color: colors.textSecondary }]}>
                        {t('services.modified')}: {new Date(w.modified_on).toLocaleDateString()} · {t('services.tap_tail')}
                      </Text>
                    </View>
                    <Badge label={w.usage_model || 'bundled'} />
                    <Icon name="chevron-right" size={16} color={colors.textTertiary} />
                  </View>
                </Card>
              </TouchableOpacity>
            ))
          )}
        </>
      )}

      {/* KV Namespaces */}
      {perms.kv && (
        <>
          <SectionHeader title="KV Namespaces" />
          {errors.kv ? (
            <ErrorBanner message={errors.kv} />
          ) : kvNamespaces.length === 0 ? (
            <EmptyState icon="database" title={t('services.no_kv')} />
          ) : (
            kvNamespaces.map((ns) => (
              <Card key={ns.id} style={styles.itemCard}>
                <View style={styles.itemRow}>
                  <Icon name="database" size={20} color={colors.warning} />
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.itemName, { color: colors.text }]}>{ns.title}</Text>
                    <Text style={[styles.itemMeta, { color: colors.textTertiary }]} numberOfLines={1}>{ns.id}</Text>
                  </View>
                </View>
              </Card>
            ))
          )}
        </>
      )}

      {/* R2 Buckets */}
      {perms.r2 && (
        <>
          <SectionHeader title="R2 Buckets" />
          {errors.r2 ? (
            <ErrorBanner message={errors.r2} />
          ) : r2Buckets.length === 0 ? (
            <EmptyState icon="cloud-upload" title={t('services.no_r2')} />
          ) : (
            r2Buckets.map((b) => (
              <TouchableOpacity
                key={b.name}
                activeOpacity={0.7}
                onPress={() => router.push({ pathname: '/r2/[bucket]' as any, params: { bucket: b.name } })}
              >
                <Card style={styles.itemCard}>
                  <View style={styles.itemRow}>
                    <Icon name="cloud-upload" size={20} color={colors.success} />
                    <View style={{ flex: 1 }}>
                      <Text style={[styles.itemName, { color: colors.text }]}>{b.name}</Text>
                      <Text style={[styles.itemMeta, { color: colors.textSecondary }]}>
                        {t('services.created')}: {new Date(b.creation_date).toLocaleDateString()} · {t('services.tap_browse')}
                      </Text>
                    </View>
                    {b.location && <Badge label={b.location} />}
                    <Icon name="chevron-right" size={16} color={colors.textTertiary} />
                  </View>
                </Card>
              </TouchableOpacity>
            ))
          )}
        </>
      )}

      {/* Pages */}
      {perms.pages && (
        <>
          <SectionHeader title="Pages Projects" />
          {errors.pages ? (
            <ErrorBanner message={errors.pages} />
          ) : pages.length === 0 ? (
            <EmptyState icon="monitor" title={t('services.no_pages')} />
          ) : (
            pages.map((p) => (
              <Card key={p.id} style={styles.itemCard}>
                <View style={styles.itemRow}>
                  <Icon name="monitor" size={20} color={colors.error} />
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.itemName, { color: colors.text }]}>{p.name}</Text>
                    <Text style={[styles.itemMeta, { color: colors.textSecondary }]}>
                      {p.subdomain} · {p.production_branch}
                    </Text>
                  </View>
                </View>
              </Card>
            ))
          )}
        </>
      )}

      {!perms.workers && !perms.kv && !perms.r2 && !perms.pages && (
        <EmptyState icon="lock" title="No access" message="Your token does not have permission for any service. Create a new token with Account level permissions." />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: Spacing.lg, paddingBottom: Spacing.xxxl },
  accountChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    padding: Spacing.sm,
    borderRadius: Radius.md,
    borderWidth: 1,
    marginBottom: Spacing.md,
  },
  accountIcon: {
    width: 32,
    height: 32,
    borderRadius: Radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  accountLabel: {
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  accountValue: {
    fontSize: FontSize.sm,
    fontFamily: 'monospace',
    fontWeight: '600',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
    marginBottom: Spacing.lg,
  },
  serviceCard: {
    flexBasis: '47%',
    flexGrow: 1,
    alignItems: 'center' as const,
    paddingVertical: Spacing.xl,
    gap: Spacing.sm,
  },
  serviceIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  serviceTitle: { fontSize: FontSize.md, fontWeight: '600' },
  serviceCount: { fontSize: FontSize.sm, textAlign: 'center', paddingHorizontal: Spacing.xs },
  itemCard: { marginBottom: Spacing.sm },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  itemName: { fontSize: FontSize.md, fontWeight: '500' },
  itemMeta: { fontSize: FontSize.sm, marginTop: 2 },
  errorBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    padding: Spacing.md,
    borderRadius: Radius.md,
    marginBottom: Spacing.sm,
  },
  errorText: { flex: 1, fontSize: FontSize.sm },
});
