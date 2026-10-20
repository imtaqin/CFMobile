import { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { router, Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Icon, IconName } from '@/components/ui/icon';
import { EmptyState } from '@/components/ui/empty-state';
import { SectionHeader } from '@/components/ui/section-header';
import { Group, ListRow, SearchBar } from '@/components/ui/kit';
import { useTheme } from '@/hooks/use-theme';
import { useUnlockedMap } from '@/services/ad-reward';
import { Spacing } from '@/constants/theme';

/**
 * One index for every account-level product.
 *
 * These screens used to be reached from a 22-row list under Settings →
 * Security, and eleven of them were reachable from nowhere at all. Products
 * that belong to a single zone (Web3, Spectrum) are tiles on the zone screen
 * instead, so this list is account-scoped throughout.
 */

interface Product {
  /** Route under `app/`, also the key for the search filter. */
  route: string;
  icon: IconName;
  /** Brand names stay in English; only the group titles and blurbs translate. */
  title: string;
  subtitle: string;
  /** Premium feature key, when the screen is gated. */
  feature?: string;
}

interface ProductGroup {
  title: string;
  products: Product[];
}

/** Every gated key on this screen, so one subscription covers the whole list. */
const GATED_FEATURES = [
  'durable-objects', 'workers-for-platforms', 'workflows', 'pipelines',
  'workers-ai', 'ai-gateway', 'autorag', 'vectorize', 'hyperdrive',
  'secrets-store', 'stream', 'images', 'dns-firewall', 'address-maps',
  'access', 'gateway-rules', 'infra-targets',
];

export default function ProductsScreen() {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const [query, setQuery] = useState('');
  const unlocked = useUnlockedMap(GATED_FEATURES);

  const groups: ProductGroup[] = useMemo(() => [
    {
      title: t('products.group_compute'),
      products: [
        { route: 'queues', icon: 'layers', title: t('queues.title'), subtitle: t('products.queues_sub') },
        { route: 'workflows', icon: 'route', title: t('wf.title'), subtitle: t('products.workflows_sub'), feature: 'workflows' },
        { route: 'durable-objects', icon: 'database', title: t('settings.durable_objects'), subtitle: t('settings.durable_objects_sub'), feature: 'durable-objects' },
        { route: 'workers-for-platforms', icon: 'code', title: t('settings.wfp'), subtitle: t('settings.wfp_sub'), feature: 'workers-for-platforms' },
      ],
    },
    {
      title: t('products.group_ai'),
      products: [
        { route: 'workers-ai', icon: 'sparkles', title: t('ai_models.title'), subtitle: t('products.workers_ai_sub'), feature: 'workers-ai' },
        { route: 'ai-gateway', icon: 'route', title: t('aigw.title'), subtitle: t('products.ai_gateway_sub'), feature: 'ai-gateway' },
        { route: 'autorag', icon: 'search', title: t('settings.autorag'), subtitle: t('settings.autorag_sub'), feature: 'autorag' },
        { route: 'vectorize', icon: 'grid', title: t('settings.vectorize'), subtitle: t('settings.vectorize_sub'), feature: 'vectorize' },
      ],
    },
    {
      title: t('products.group_data'),
      products: [
        { route: 'hyperdrive', icon: 'database', title: t('settings.hyperdrive'), subtitle: t('settings.hyperdrive_sub'), feature: 'hyperdrive' },
        { route: 'pipelines', icon: 'cloud-upload', title: t('pipelines.title'), subtitle: t('products.pipelines_sub'), feature: 'pipelines' },
        { route: 'secrets-store', icon: 'key', title: t('settings.secrets_store'), subtitle: t('settings.secrets_store_sub'), feature: 'secrets-store' },
      ],
    },
    {
      title: t('products.group_media'),
      products: [
        { route: 'stream', icon: 'monitor', title: t('stream.title'), subtitle: t('products.stream_sub'), feature: 'stream' },
        { route: 'images', icon: 'pageview', title: t('images.title'), subtitle: t('products.images_sub'), feature: 'images' },
      ],
    },
    {
      title: t('products.group_network'),
      products: [
        { route: 'load-balancers', icon: 'network', title: t('lb.title'), subtitle: t('products.load_balancers_sub') },
        { route: 'dns-firewall', icon: 'dns', title: t('dns_fw.title'), subtitle: t('products.dns_firewall_sub'), feature: 'dns-firewall' },
        { route: 'address-maps', icon: 'globe', title: t('addr.title'), subtitle: t('products.address_maps_sub'), feature: 'address-maps' },
      ],
    },
    {
      title: t('products.group_security'),
      products: [
        { route: 'lists', icon: 'layers', title: t('settings.lists'), subtitle: t('settings.lists_sub') },
        { route: 'turnstile', icon: 'shield-check', title: t('settings.turnstile'), subtitle: t('settings.turnstile_sub') },
      ],
    },
    {
      title: t('products.group_zero_trust'),
      products: [
        { route: 'access-apps', icon: 'shield', title: t('settings.access_apps'), subtitle: t('settings.access_apps_sub'), feature: 'access' },
        { route: 'access-idps', icon: 'user', title: t('settings.access_idps'), subtitle: t('settings.access_idps_sub'), feature: 'access' },
        { route: 'access-service-tokens', icon: 'key', title: t('settings.access_tokens'), subtitle: t('settings.access_tokens_sub'), feature: 'access' },
        { route: 'access-mtls', icon: 'enhanced-encryption', title: t('settings.access_mtls'), subtitle: t('settings.access_mtls_sub'), feature: 'access' },
        { route: 'gateway-rules', icon: 'rule', title: t('settings.gateway_rules'), subtitle: t('settings.gateway_rules_sub'), feature: 'gateway-rules' },
        { route: 'infra-targets', icon: 'server', title: t('settings.infra_targets'), subtitle: t('settings.infra_targets_sub'), feature: 'infra-targets' },
      ],
    },
    {
      title: t('products.group_insights'),
      products: [
        { route: 'web-analytics', icon: 'chart-line', title: t('wa.title'), subtitle: t('products.web_analytics_sub') },
        { route: 'audit-logs', icon: 'pageview', title: t('settings.audit_logs'), subtitle: t('settings.audit_logs_sub') },
        { route: 'notifications', icon: 'bell', title: t('settings.notifications'), subtitle: t('settings.notifications_sub') },
      ],
    },
    {
      title: t('products.group_account'),
      products: [
        { route: 'registrar', icon: 'globe', title: t('settings.registrar'), subtitle: t('settings.registrar_sub') },
        { route: 'account-members', icon: 'users', title: t('settings.account_members'), subtitle: t('settings.account_members_sub') },
        { route: 'api-tokens', icon: 'key', title: t('settings.api_tokens'), subtitle: t('settings.api_tokens_sub') },
      ],
    },
  ], [t]);

  // Match on the visible text and on the route, so "wfp" style guesses still land.
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return groups;
    return groups
      .map((g) => ({
        title: g.title,
        products: g.products.filter(
          (p) => `${p.title} ${p.subtitle} ${p.route}`.toLowerCase().includes(q),
        ),
      }))
      .filter((g) => g.products.length > 0);
  }, [groups, query]);

  return (
    <>
      <Stack.Screen options={{ title: t('products.title'), headerShown: true }} />
      <ScrollView
        style={[styles.container, { backgroundColor: colors.background }]}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <SearchBar value={query} onChangeText={setQuery} placeholder={t('products.search')} />

        {filtered.length === 0 ? (
          <View style={styles.empty}>
            <EmptyState icon="search" title={t('products.none')} message={t('products.none_message')} />
          </View>
        ) : (
          filtered.map((group) => (
            <View key={group.title}>
              <SectionHeader title={group.title} />
              <Group>
                {group.products.map((p) => (
                  <ListRow
                    key={p.route}
                    icon={p.icon}
                    title={p.title}
                    subtitle={p.subtitle}
                    onPress={() => router.push(`/${p.route}` as any)}
                    trailing={
                      p.feature && !unlocked[p.feature]
                        ? <Icon name="lock-outline" size={16} color={colors.textTertiary} />
                        : undefined
                    }
                  />
                ))}
              </Group>
            </View>
          ))
        )}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: Spacing.lg, paddingBottom: Spacing.xxxl },
  empty: { paddingTop: Spacing.xxl },
});
