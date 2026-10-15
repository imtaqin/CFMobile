import { useCallback, useEffect, useState } from 'react';
import { Alert, Platform, ScrollView, StyleSheet, Text } from 'react-native';
import { Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { requestPinWidget } from 'react-native-android-widget';

import { useTheme } from '@/hooks/use-theme';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Loading } from '@/components/ui/loading';
import { SectionHeader } from '@/components/ui/section-header';
import { Banner, Group, ListRow, SearchBar } from '@/components/ui/kit';
import { FontSize, Spacing } from '@/constants/theme';
import * as api from '@/services/cloudflare';
import { getShortcutZone, setShortcutZone, ShortcutZone } from '@/services/shortcuts';
import { refreshShortcuts } from '@/widgets/sync';

/** Pick the zone the home-screen widget and the Quick Settings tile work on. */
export default function ShortcutsScreen() {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const [current, setCurrent] = useState<ShortcutZone | null>(null);
  const [zones, setZones] = useState<ShortcutZone[] | null>(null);
  const [search, setSearch] = useState('');
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async (q?: string) => {
    try {
      const res = await api.getZones(1, q || undefined);
      setZones((res.result ?? []).map((z) => ({ id: z.id, name: z.name })));
      setError(null);
    } catch (e: any) {
      setError(e?.response?.data?.errors?.[0]?.message ?? e?.message);
      setZones([]);
    }
  }, []);

  useEffect(() => {
    getShortcutZone().then(setCurrent);
    load();
  }, [load]);

  // Search as the user types, a moment after they stop.
  useEffect(() => {
    const timer = setTimeout(() => load(search.trim()), 350);
    return () => clearTimeout(timer);
  }, [search, load]);

  const choose = async (zone: ShortcutZone) => {
    await setShortcutZone(zone);
    setCurrent(zone);
    refreshShortcuts();
  };

  const addWidget = async () => {
    const ok = await requestPinWidget({ widgetName: 'ZoneStatus' }).catch(() => false);
    if (!ok) Alert.alert(t('shortcuts.add_widget'), t('shortcuts.add_widget_manual'));
  };

  return (
    <ScrollView style={{ backgroundColor: colors.background }} contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
      <Stack.Screen options={{ title: t('shortcuts.title') }} />

      <Text style={[styles.intro, { color: colors.textSecondary }]}>{t('shortcuts.intro')}</Text>

      {Platform.OS === 'android' && (
        <Button title={t('shortcuts.add_widget')} onPress={addWidget} style={styles.add} />
      )}

      <SectionHeader title={t('shortcuts.tile_title')} />
      <Text style={[styles.intro, { color: colors.textSecondary }]}>{t('shortcuts.tile_how')}</Text>

      <SectionHeader title={t('shortcuts.zone')} />
      {!!error && <Banner message={error} />}
      <SearchBar value={search} onChangeText={setSearch} placeholder={t('shortcuts.search')} style={styles.search} />
      {zones === null ? (
        <Loading />
      ) : (
        <Group>
          {zones.map((z) => (
            <ListRow
              key={z.id}
              icon="globe"
              title={z.name}
              onPress={() => choose(z)}
              trailing={current?.id === z.id ? <Icon name="check-circle" size={20} color={colors.primary} /> : null}
            />
          ))}
        </Group>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: { padding: Spacing.lg, paddingBottom: Spacing.xxxl },
  intro: { fontSize: FontSize.sm, lineHeight: 20, marginBottom: Spacing.sm },
  add: { marginTop: Spacing.sm, marginBottom: Spacing.md },
  search: { marginBottom: Spacing.md },
});
