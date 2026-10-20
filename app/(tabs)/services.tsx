import { useEffect, useState, useCallback } from 'react';
import { StyleSheet, View, Text, ScrollView, RefreshControl } from 'react-native';
import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/contexts/auth';
import { IconName } from '@/components/ui/icon';
import { useTheme } from '@/hooks/use-theme';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SkeletonHeading, SkeletonRows, SkeletonStats } from '@/components/ui/skeleton';
import { EmptyState } from '@/components/ui/empty-state';
import { SectionHeader } from '@/components/ui/section-header';
import { ProportionBar } from '@/components/ui/mini-chart';
import { Banner, Group, IconCircle, ListRow, SearchBar } from '@/components/ui/kit';
import { Spacing, FontSize, Radius } from '@/constants/theme';
import * as api from '@/services/cloudflare';
import { WorkerScript, KVNamespace, R2Bucket, PagesProject } from '@/services/types';
import { D1Database } from '@/services/cloudflare';

/** One product's list on this tab: shown five at a time, searchable, collapsible. */
interface Section {
  key: string;
  title: string;
  allowed: boolean;
  error?: string;
  emptyIcon: IconName;
  emptyTitle: string;
  items: { key: string; node: React.ReactNode }[];
}

interface ServiceError {
  workers?: string;
  kv?: string;
  r2?: string;
  pages?: string;
  d1?: string;
}

/** Rows shown per section before "show all". */
const PREVIEW = 5;

export default function ServicesScreen() {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const { accountId, permissions } = useAuth();
  const perms = permissions ?? { workers: true, kv: true, r2: true, pages: true, d1: true } as any;

  const [workers, setWorkers] = useState<WorkerScript[]>([]);
  const [kvNamespaces, setKvNamespaces] = useState<KVNamespace[]>([]);
  const [r2Buckets, setR2Buckets] = useState<R2Bucket[]>([]);
  const [pages, setPages] = useState<PagesProject[]>([]);
  const [d1Dbs, setD1Dbs] = useState<D1Database[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [errors, setErrors] = useState<ServiceError>({});
  const [query, setQuery] = useState('');
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

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

    const [wRes, kvRes, r2Res, pRes, d1Res] = await Promise.allSettled([
      api.getWorkerScripts(accountId),
      api.getKVNamespaces(accountId),
      api.getR2Buckets(accountId),
      api.getPagesProjects(accountId),
      api.getD1Databases(accountId),
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

    if (d1Res.status === 'fulfilled') {
      const result = d1Res.value.result;
      setD1Dbs(Array.isArray(result) ? result : []);
    } else {
      newErrors.d1 = getErrorMsg(d1Res.reason);
      console.log('[CF] D1 error:', d1Res.reason?.response?.data ?? d1Res.reason?.message);
    }

    setErrors(newErrors);
    setLoading(false);
    setRefreshing(false);
  }, [accountId]);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  const onRefresh = () => { setRefreshing(true); fetchAll(); };

  if (loading) {
    return (
      <ScrollView
        style={[styles.container, { backgroundColor: colors.background }]}
        contentContainerStyle={styles.content}
        scrollEnabled={false}
        accessibilityLabel={t('common.loading')}
      >
        <SkeletonRows count={1} />
        <View style={{ height: Spacing.md }} />
        <SkeletonStats count={2} />
        <SkeletonHeading />
        <SkeletonRows count={4} />
        <SkeletonHeading width={95} />
        <SkeletonRows count={3} />
      </ScrollView>
    );
  }

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

  // One neutral ink at stepped strengths, so the mix reads without a rainbow.
  const shades = ['E6', 'B3', '80', '59', '33'];
  const resourceSlices = [
    { label: t('services.workers'), value: workers.length },
    { label: 'KV', value: kvNamespaces.length },
    { label: 'R2', value: r2Buckets.length },
    { label: 'Pages', value: pages.length },
    { label: 'D1', value: d1Dbs.length },
  ]
    .map((s, i) => ({ ...s, color: colors.text + shades[i] }))
    .filter((s) => s.value > 0);
  const totalResources = resourceSlices.reduce((sum, s) => sum + s.value, 0);

  const serviceTile = (icon: IconName, title: string, count: number, error?: string) => (
    <View
      key={title}
      style={[styles.tile, { backgroundColor: colors.surface, borderColor: colors.borderLight }]}
    >
      <IconCircle name={icon} size={34} tone={error ? 'error' : 'neutral'} />
      <View style={styles.tileBody}>
        <Text style={[styles.tileTitle, { color: colors.text }]} numberOfLines={1}>{title}</Text>
        {error ? (
          <Text style={[styles.tileCount, { color: colors.error }]} numberOfLines={1}>{error}</Text>
        ) : (
          <Text style={[styles.tileCount, { color: colors.textSecondary }]} numberOfLines={1}>
            {count} {count === 1 ? 'item' : 'items'}
          </Text>
        )}
      </View>
    </View>
  );

  const hit = (text: string) => !query || text.toLowerCase().includes(query.trim().toLowerCase());

  const sections: Section[] = [
    {
      key: 'workers',
      title: t('services.workers'),
      allowed: !!perms.workers,
      error: errors.workers,
      emptyIcon: 'code',
      emptyTitle: t('services.no_workers'),
      items: workers.filter((w) => hit(w.id)).map((w) => ({
        key: w.id,
        node: (
          <ListRow
            key={w.id}
            icon="code"
            title={w.id}
            subtitle={`${t('services.modified')}: ${new Date(w.modified_on).toLocaleDateString()} · ${t('services.tap_tail')}`}
            trailing={<Badge label={w.usage_model || 'bundled'} />}
            chevron
            onPress={() => router.push({ pathname: '/worker/[script]' as any, params: { script: w.id } })}
          />
        ),
      })),
    },
    {
      key: 'kv',
      title: 'KV Namespaces',
      allowed: !!perms.kv,
      error: errors.kv,
      emptyIcon: 'database',
      emptyTitle: t('services.no_kv'),
      items: kvNamespaces.filter((ns) => hit(ns.title)).map((ns) => ({
        key: ns.id,
        node: (
          <ListRow
            key={ns.id}
            icon="database"
            title={ns.title}
            subtitle={t('services.tap_keys')}
            onPress={() => router.push({ pathname: '/kv/[ns]' as any, params: { ns: ns.id, name: ns.title } })}
          />
        ),
      })),
    },
    {
      key: 'd1',
      title: 'D1 Databases',
      allowed: !!perms.d1,
      error: errors.d1,
      emptyIcon: 'database',
      emptyTitle: t('services.no_d1'),
      items: d1Dbs.filter((db) => hit(db.name)).map((db) => ({
        key: db.uuid,
        node: (
          <ListRow
            key={db.uuid}
            icon="database"
            title={db.name}
            subtitle={`${db.file_size ? `${(db.file_size / 1024).toFixed(0)} KB · ` : ''}${t('services.tap_query')}`}
            onPress={() => router.push({ pathname: '/d1/[db]' as any, params: { db: db.uuid, name: db.name } })}
          />
        ),
      })),
    },
    {
      key: 'r2',
      title: 'R2 Buckets',
      allowed: !!perms.r2,
      error: errors.r2,
      emptyIcon: 'cloud-upload',
      emptyTitle: t('services.no_r2'),
      items: r2Buckets.filter((b) => hit(b.name)).map((b) => ({
        key: b.name,
        node: (
          <ListRow
            key={b.name}
            icon="cloud-upload"
            title={b.name}
            subtitle={`${t('services.created')}: ${new Date(b.creation_date).toLocaleDateString()} · ${t('services.tap_browse')}`}
            trailing={b.location ? <Badge label={b.location} /> : undefined}
            chevron
            onPress={() => router.push({ pathname: '/r2/[bucket]' as any, params: { bucket: b.name } })}
          />
        ),
      })),
    },
    {
      key: 'pages',
      title: 'Pages Projects',
      allowed: !!perms.pages,
      error: errors.pages,
      emptyIcon: 'monitor',
      emptyTitle: t('services.no_pages'),
      items: pages.filter((pr) => hit(`${pr.name} ${pr.subdomain}`)).map((pr) => ({
        key: pr.id,
        node: (
          <ListRow
            key={pr.id}
            icon="monitor"
            title={pr.name}
            subtitle={`${pr.subdomain} · ${pr.production_branch}`}
            onPress={() => router.push({ pathname: '/pages/[project]' as any, params: { project: pr.name } })}
          />
        ),
      })),
    },
  ];

  const total = workers.length + kvNamespaces.length + d1Dbs.length + r2Buckets.length + pages.length;

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.content}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.primary} />}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      {/* Which account these resources belong to */}
      <Group>
        <ListRow
          icon="user"
          title="Account"
          subtitle={accountId ? accountId.slice(0, 4) + '••••••••' : '-'}
          mono
        />
      </Group>

      {/* Resource mix: one glance at what this account runs */}
      {resourceSlices.length > 0 && (
        <Card style={styles.overviewCard}>
          <View style={styles.overviewTop}>
            <View style={{ flex: 1 }}>
              <Text style={[styles.overviewNum, { color: colors.text }]}>{totalResources}</Text>
              <Text style={[styles.overviewLabel, { color: colors.textTertiary }]}>
                {t('services.total_resources')}
              </Text>
            </View>
            <Badge label={t('services.all_healthy')} variant="success" />
          </View>

          <ProportionBar slices={resourceSlices} height={8} />

          <View style={styles.legendRow}>
            {resourceSlices.map((s) => (
              <View key={s.label} style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: s.color }]} />
                <Text style={[styles.legendText, { color: colors.textSecondary }]}>
                  {s.label} {s.value}
                </Text>
              </View>
            ))}
          </View>
        </Card>
      )}

      {/* Per-service counts */}
      <View style={styles.grid}>
        {perms.workers && serviceTile('code', t('services.workers'), workers.length, errors.workers)}
        {perms.kv && serviceTile('database', 'KV', kvNamespaces.length, errors.kv)}
        {perms.r2 && serviceTile('cloud-upload', 'R2', r2Buckets.length, errors.r2)}
        {perms.pages && serviceTile('monitor', 'Pages', pages.length, errors.pages)}
        {perms.d1 && serviceTile('database', 'D1', d1Dbs.length, errors.d1)}
      </View>

      {/* The other ~30 account-level products, which have no browser of their own here. */}
      <Group style={{ marginTop: Spacing.md }}>
        <ListRow
          icon="grid"
          title={t('products.all')}
          subtitle={t('products.all_sub')}
          onPress={() => router.push('/products' as any)}
        />
      </Group>

      {/* One long scroll of five full lists was the old shape of this screen. */}
      {total > PREVIEW && (
        <SearchBar
          value={query}
          onChangeText={setQuery}
          placeholder={t('services.search')}
          style={{ marginTop: Spacing.md }}
        />
      )}

      {sections.map((section) => {
        if (!section.allowed) return null;
        // While searching, a section with no hits is noise.
        if (query && section.items.length === 0 && !section.error) return null;

        const open = !!query || expanded.has(section.key);
        const shown = open ? section.items : section.items.slice(0, PREVIEW);
        const rest = section.items.length - shown.length;

        return (
          <View key={section.key}>
            <SectionHeader title={section.title} />
            {section.error ? (
              <Banner message={section.error} />
            ) : section.items.length === 0 ? (
              <EmptyState icon={section.emptyIcon} title={section.emptyTitle} />
            ) : (
              <Group>
                {[
                  ...shown.map((item) => item.node),
                  rest > 0 ? (
                    <ListRow
                      key="more"
                      title={t('services.show_all', { count: section.items.length })}
                      onPress={() => setExpanded((prev) => new Set(prev).add(section.key))}
                    />
                  ) : null,
                ].filter(Boolean)}
              </Group>
            )}
          </View>
        );
      })}

      {!perms.workers && !perms.kv && !perms.r2 && !perms.pages && (
        <EmptyState icon="lock" title="No access" message="Your token does not have permission for any service. Create a new token with Account level permissions." />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: Spacing.lg, paddingBottom: Spacing.xxxl },

  overviewCard: { gap: Spacing.md, marginTop: Spacing.sm },
  overviewTop: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md },
  overviewNum: { fontSize: 26, fontWeight: '400', letterSpacing: -0.5 },
  overviewLabel: { fontSize: FontSize.xs, marginTop: 2 },
  legendRow: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.md },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  legendDot: { width: 8, height: 8, borderRadius: 4 },
  legendText: { fontSize: FontSize.xs },

  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm, marginTop: Spacing.sm },
  tile: {
    flexBasis: '47%',
    flexGrow: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    minHeight: 58,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: Radius.lg,
    borderWidth: 1,
  },
  tileBody: { flex: 1, gap: 2 },
  tileTitle: { fontSize: FontSize.md, fontWeight: '500' },
  tileCount: { fontSize: FontSize.sm },
});
