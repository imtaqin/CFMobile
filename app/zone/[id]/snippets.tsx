import { useEffect, useState, useCallback } from 'react';
import { StyleSheet, View, ScrollView, RefreshControl, TouchableOpacity, Alert, Switch } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Icon } from '@/components/ui/icon';
import { useTheme } from '@/hooks/use-theme';
import { SkeletonHeading, SkeletonRows } from '@/components/ui/skeleton';
import { EmptyState } from '@/components/ui/empty-state';
import { SectionHeader } from '@/components/ui/section-header';
import { Button } from '@/components/ui/button';
import { Sheet } from '@/components/ui/sheet';
import { Banner, ChipRow, Fab, Field, FieldLabel, Group, ListRow } from '@/components/ui/kit';
import { Spacing } from '@/constants/theme';
import * as api from '@/services/cloudflare';
import { ZoneSnippet, SnippetRule } from '@/services/cloudflare';

export default function SnippetsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { t } = useTranslation();
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  const [snippets, setSnippets] = useState<ZoneSnippet[]>([]);
  const [rules, setRules] = useState<SnippetRule[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const [showAdd, setShowAdd] = useState(false);
  const [snippetName, setSnippetName] = useState('');
  const [expression, setExpression] = useState('');
  const [description, setDescription] = useState('');

  const errMsg = (e: any) => e?.response?.data?.errors?.[0]?.message ?? e?.message ?? 'Error';

  const fetchAll = useCallback(async () => {
    setError(null);
    try {
      const [sRes, rRes] = await Promise.allSettled([
        api.getZoneSnippets(id),
        api.getSnippetRules(id),
      ]);
      if (sRes.status === 'fulfilled') setSnippets(sRes.value.result ?? []);
      else setError(errMsg(sRes.reason));
      if (rRes.status === 'fulfilled') setRules(rRes.value.result ?? []);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [id]);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  const deleteSnippet = (s: ZoneSnippet) => {
    Alert.alert(t('snippets.delete_snippet_title'), t('snippets.delete_snippet_confirm', { name: s.snippet_name }), [
      { text: t('common.cancel'), style: 'cancel' },
      {
        text: t('common.delete'),
        style: 'destructive',
        onPress: async () => {
          try {
            await api.deleteZoneSnippet(id, s.snippet_name);
            setSnippets((prev) => prev.filter((x) => x.snippet_name !== s.snippet_name));
            setRules((prev) => prev.filter((r) => r.snippet_name !== s.snippet_name));
          } catch (e: any) {
            Alert.alert(t('common.error'), errMsg(e));
          }
        },
      },
    ]);
  };

  const toggleRule = async (rule: SnippetRule, enabled: boolean) => {
    const prev = rules;
    const next = rules.map((r) => (r.id === rule.id ? { ...r, enabled } : r));
    setRules(next);
    try {
      const res = await api.putSnippetRules(id, next);
      if (res.result) setRules(res.result);
    } catch (e: any) {
      setRules(prev);
      Alert.alert(t('common.error'), errMsg(e));
    }
  };

  const deleteRule = (rule: SnippetRule) => {
    Alert.alert(t('snippets.delete_rule_title'), t('snippets.delete_rule_confirm'), [
      { text: t('common.cancel'), style: 'cancel' },
      {
        text: t('common.delete'),
        style: 'destructive',
        onPress: async () => {
          const next = rules.filter((r) => r.id !== rule.id);
          try {
            const res = await api.putSnippetRules(id, next);
            setRules(res.result ?? next);
          } catch (e: any) {
            Alert.alert(t('common.error'), errMsg(e));
          }
        },
      },
    ]);
  };

  const openAdd = () => {
    setSnippetName(snippets[0]?.snippet_name ?? '');
    setExpression('');
    setDescription('');
    setShowAdd(true);
  };

  const submitAdd = async () => {
    const name = snippetName.trim();
    const expr = expression.trim();
    if (!name || !expr) return;
    setSaving(true);
    try {
      const next = [...rules, { snippet_name: name, expression: expr, description: description.trim(), enabled: true }];
      const res = await api.putSnippetRules(id, next);
      setRules(res.result ?? next);
      setShowAdd(false);
    } catch (e: any) {
      Alert.alert(t('common.error'), errMsg(e));
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <>
        <Stack.Screen options={{ title: t('snippets.title') }} />
        <ScrollView
          style={[styles.container, { backgroundColor: colors.background }]}
          contentContainerStyle={styles.content}
          scrollEnabled={false}
          accessibilityLabel={t('common.loading')}
        >
          <SkeletonHeading />
          <SkeletonRows count={2} />
          <SkeletonHeading />
          <SkeletonRows count={4} />
        </ScrollView>
      </>
    );
  }

  // Rules route to an existing snippet, so there is nothing to add without one.
  const canAddRule = snippets.length > 0;

  return (
    <>
      <Stack.Screen options={{ title: t('snippets.title') }} />
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <ScrollView
          contentContainerStyle={[styles.content, { paddingBottom: canAddRule ? insets.bottom + 96 : Spacing.xxxl }]}
          showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); fetchAll(); }} tintColor={colors.primary} />}
        >
          {error && <Banner message={error} />}

          <SectionHeader title={t('snippets.snippets')} />
          {snippets.length === 0 ? (
            !error ? (
              <EmptyState icon="code" title={t('snippets.no_snippets')} message={t('snippets.no_snippets_message')} />
            ) : null
          ) : (
            <Group>
              {snippets.map((s) => (
                <ListRow
                  key={s.snippet_name}
                  icon="code"
                  title={s.snippet_name}
                  trailing={
                    <TouchableOpacity
                      onPress={() => deleteSnippet(s)}
                      hitSlop={10}
                      style={styles.iconButton}
                      accessibilityRole="button"
                      accessibilityLabel={t('common.delete')}
                    >
                      <Icon name="trash" size={16} color={colors.textTertiary} />
                    </TouchableOpacity>
                  }
                />
              ))}
            </Group>
          )}

          <SectionHeader title={t('snippets.rules')} />
          {rules.length === 0 ? (
            <EmptyState icon="rule" title={t('snippets.no_rules')} message={t('snippets.no_rules_message')} />
          ) : (
            <Group>
              {rules.map((r) => (
                <ListRow
                  key={r.id ?? r.expression}
                  title={r.snippet_name}
                  subtitle={r.expression}
                  mono
                  trailing={
                    <View style={styles.trailing}>
                      <Switch
                        value={r.enabled}
                        onValueChange={(v) => toggleRule(r, v)}
                        trackColor={{ true: colors.primary, false: colors.border }}
                        thumbColor="#FFF"
                      />
                      <TouchableOpacity
                        onPress={() => deleteRule(r)}
                        hitSlop={10}
                        style={styles.iconButton}
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

        {canAddRule && <Fab label={t('snippets.add_rule')} onPress={openAdd} />}
      </View>

      <Sheet
        visible={showAdd}
        onClose={() => setShowAdd(false)}
        title={t('snippets.add_rule')}
        footer={
          <Button
            title={t('common.save')}
            onPress={submitAdd}
            loading={saving}
            disabled={!snippetName.trim() || !expression.trim()}
          />
        }
      >
        <FieldLabel>{t('snippets.snippet')}</FieldLabel>
        <ChipRow
          wrap
          style={styles.chips}
          options={snippets.map((s) => ({ value: s.snippet_name, label: s.snippet_name }))}
          value={snippetName}
          onChange={setSnippetName}
        />

        <Field
          label={t('snippets.expression')}
          placeholder='(http.request.uri.path eq "/api")'
          value={expression}
          onChangeText={setExpression}
          multiline
          mono
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Field
          label={t('snippets.description')}
          placeholder={t('snippets.description_placeholder')}
          value={description}
          onChangeText={setDescription}
        />
      </Sheet>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: Spacing.lg },
  trailing: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  iconButton: { padding: 4 },
  chips: { marginTop: 6 },
});
