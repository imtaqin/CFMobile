import { useCallback, useEffect, useMemo, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { EmptyState } from '@/components/ui/empty-state';
import { Loading } from '@/components/ui/loading';
import { SectionHeader } from '@/components/ui/section-header';
import { Banner, Group, ListRow, SearchBar, ToggleRow } from '@/components/ui/kit';
import { IconName } from '@/components/ui/icon';
import { PremiumPaywall } from '@/components/ui/premium-gate';
import { useTheme } from '@/hooks/use-theme';
import { useUnlocked } from '@/services/ad-reward';
import * as api from '@/services/cloudflare';
import * as history from '@/services/change-history';
import { Zone } from '@/services/types';
import { FontSize, Spacing } from '@/constants/theme';

/**
 * Run one action across many zones.
 *
 * Someone with thirty domains should not open thirty screens to turn Under
 * Attack Mode on. Every action here is one the app already has an endpoint
 * for; the only new thing is the fan-out, and the per-zone result list that
 * says plainly which ones did not take.
 */

type ActionId =
  | 'purge_cache'
  | 'under_attack_on'
  | 'under_attack_off'
  | 'dev_mode_on'
  | 'dev_mode_off'
  | 'always_https_on';

interface Action {
  id: ActionId;
  icon: IconName;
  title: string;
  subtitle: string;
  /** Needs a red confirm button: it is felt by visitors straight away. */
  destructive?: boolean;
  run: (zoneId: string) => Promise<unknown>;
  /** Zone setting written, so the change lands in the local history too. */
  logs?: { setting: string; value: string };
}

interface Outcome {
  zone: Zone;
  ok: boolean;
  error?: string;
}

export default function BulkScreen() {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const unlocked = useUnlocked('bulk');

  const [zones, setZones] = useState<Zone[]>([]);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [running, setRunning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<Outcome[] | null>(null);

  const fetchZones = useCallback(async () => {
    if (!unlocked) { setLoading(false); return; }
    try {
      // The picker needs every zone, not the first page.
      const first = await api.getZones(1);
      const all = [...(first.result ?? [])];
      const pages = first.result_info?.total_pages ?? 1;
      for (let page = 2; page <= pages; page++) {
        const next = await api.getZones(page);
        all.push(...(next.result ?? []));
      }
      setZones(all);
    } catch (e: any) {
      setError(e?.response?.data?.errors?.[0]?.message ?? e?.message ?? t('bulk.load_error'));
    } finally {
      setLoading(false);
    }
  }, [unlocked, t]);

  useEffect(() => { fetchZones(); }, [fetchZones]);

  const actions: Action[] = useMemo(() => [
    {
      id: 'purge_cache',
      icon: 'cached',
      title: t('bulk.purge_cache'),
      subtitle: t('bulk.purge_cache_sub'),
      destructive: true,
      run: (zoneId) => api.purgeAllCache(zoneId),
    },
    {
      id: 'under_attack_on',
      icon: 'shield',
      title: t('bulk.under_attack_on'),
      subtitle: t('bulk.under_attack_on_sub'),
      destructive: true,
      run: (zoneId) => api.updateSecurityLevel(zoneId, 'under_attack'),
      logs: { setting: 'security_level', value: 'under_attack' },
    },
    {
      id: 'under_attack_off',
      icon: 'shield-check',
      title: t('bulk.under_attack_off'),
      subtitle: t('bulk.under_attack_off_sub'),
      run: (zoneId) => api.updateSecurityLevel(zoneId, 'medium'),
      logs: { setting: 'security_level', value: 'medium' },
    },
    {
      id: 'dev_mode_on',
      icon: 'developer-mode',
      title: t('bulk.dev_mode_on'),
      subtitle: t('bulk.dev_mode_on_sub'),
      run: (zoneId) => api.toggleDevMode(zoneId, 'on'),
      logs: { setting: 'development_mode', value: 'on' },
    },
    {
      id: 'dev_mode_off',
      icon: 'developer-mode',
      title: t('bulk.dev_mode_off'),
      subtitle: t('bulk.dev_mode_off_sub'),
      run: (zoneId) => api.toggleDevMode(zoneId, 'off'),
      logs: { setting: 'development_mode', value: 'off' },
    },
    {
      id: 'always_https_on',
      icon: 'https',
      title: t('bulk.always_https_on'),
      subtitle: t('bulk.always_https_on_sub'),
      run: (zoneId) => api.updateZoneSetting(zoneId, 'always_use_https', 'on'),
      logs: { setting: 'always_use_https', value: 'on' },
    },
  ], [t]);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? zones.filter((z) => z.name.toLowerCase().includes(q)) : zones;
  }, [zones, query]);

  const toggle = (zoneId: string) =>
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(zoneId)) next.delete(zoneId);
      else next.add(zoneId);
      return next;
    });

  // Select-all works on what the search is showing, not the whole account.
  const allVisibleOn = visible.length > 0 && visible.every((z) => selected.has(z.id));
  const toggleAllVisible = () =>
    setSelected((prev) => {
      const next = new Set(prev);
      for (const z of visible) {
        if (allVisibleOn) next.delete(z.id);
        else next.add(z.id);
      }
      return next;
    });

  const start = (action: Action) => {
    const targets = zones.filter((z) => selected.has(z.id));
    if (targets.length === 0) {
      Alert.alert(t('bulk.pick_title'), t('bulk.pick_message'));
      return;
    }
    Alert.alert(
      action.title,
      t('bulk.confirm', { count: targets.length }),
      [
        { text: t('common.cancel'), style: 'cancel' },
        {
          text: t('bulk.run'),
          style: action.destructive ? 'destructive' : 'default',
          onPress: () => execute(action, targets),
        },
      ],
    );
  };

  const execute = async (action: Action, targets: Zone[]) => {
    setRunning(true);
    setError(null);
    setResults(null);
    // The API client's own limiter paces these, so firing them together is safe.
    const settled = await Promise.allSettled(targets.map((z) => action.run(z.id)));
    const outcomes: Outcome[] = targets.map((zone, i) => {
      const r = settled[i];
      if (r.status === 'fulfilled') return { zone, ok: true };
      const e: any = r.reason;
      return {
        zone,
        ok: false,
        error: e?.response?.data?.errors?.[0]?.message ?? e?.message ?? t('bulk.failed'),
      };
    });
    setResults(outcomes);

    // Log only what actually landed, so the history can be trusted.
    if (action.logs) {
      for (const o of outcomes.filter((x) => x.ok)) {
        await history.logSetting(o.zone.id, action.logs.setting, null, action.logs.value, o.zone.name);
      }
    }
    setRunning(false);
  };

  if (!unlocked) {
    return (
      <>
        <Stack.Screen options={{ title: t('bulk.title') }} />
        <PremiumPaywall feature="bulk" />
      </>
    );
  }

  if (loading) return <Loading message={t('common.loading')} />;

  const okCount = results?.filter((r) => r.ok).length ?? 0;

  return (
    <>
      <Stack.Screen options={{ title: t('bulk.title') }} />
      <ScrollView
        style={[styles.container, { backgroundColor: colors.background }]}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {error && <Banner message={error} />}

        <Text style={[styles.intro, { color: colors.textSecondary }]}>{t('bulk.intro')}</Text>

        <SectionHeader
          title={t('bulk.zones', { count: selected.size })}
          action={
            visible.length > 0 ? (
              <Text
                style={[styles.link, { color: colors.primary }]}
                onPress={toggleAllVisible}
                accessibilityRole="button"
              >
                {allVisibleOn ? t('bulk.clear_all') : t('bulk.select_all')}
              </Text>
            ) : undefined
          }
        />

        {zones.length > 8 && (
          <SearchBar
            value={query}
            onChangeText={setQuery}
            placeholder={t('bulk.search_zones')}
            style={{ marginBottom: Spacing.sm }}
          />
        )}

        {visible.length === 0 ? (
          <EmptyState icon="globe" title={t('bulk.no_zones')} />
        ) : (
          <Group>
            {visible.map((z) => (
              <ToggleRow
                key={z.id}
                icon="globe"
                title={z.name}
                subtitle={z.status !== 'active' ? z.status : undefined}
                value={selected.has(z.id)}
                onValueChange={() => toggle(z.id)}
              />
            ))}
          </Group>
        )}

        <SectionHeader title={t('bulk.action')} />
        <Group>
          {actions.map((a) => (
            <ListRow
              key={a.id}
              icon={a.icon}
              title={a.title}
              subtitle={a.subtitle}
              onPress={running ? undefined : () => start(a)}
            />
          ))}
        </Group>

        {running && (
          <View style={styles.running}>
            <Loading message={t('bulk.running')} />
          </View>
        )}

        {results && (
          <>
            <SectionHeader title={t('bulk.result', { ok: okCount, total: results.length })} />
            <Group>
              {results.map((r) => (
                <ListRow
                  key={r.zone.id}
                  icon={r.ok ? 'check-circle' : 'error-circle'}
                  iconTone={r.ok ? 'success' : 'error'}
                  title={r.zone.name}
                  subtitle={r.ok ? t('bulk.done') : r.error}
                />
              ))}
            </Group>
            <Button
              title={t('bulk.clear_result')}
              variant="secondary"
              onPress={() => setResults(null)}
              style={{ marginTop: Spacing.md }}
            />
          </>
        )}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: Spacing.lg, paddingBottom: Spacing.xxxl },
  intro: { fontSize: FontSize.sm, lineHeight: 19 },
  link: { fontSize: FontSize.sm, fontWeight: '500' },
  running: { paddingVertical: Spacing.xl },
});
