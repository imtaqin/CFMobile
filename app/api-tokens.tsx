import { useEffect, useState, useCallback } from 'react';
import { StyleSheet, View, ScrollView, RefreshControl, TouchableOpacity, Alert } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Icon } from '@/components/ui/icon';
import { useTheme } from '@/hooks/use-theme';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { SkeletonRows, SkeletonHeading } from '@/components/ui/skeleton';
import { EmptyState } from '@/components/ui/empty-state';
import { SectionHeader } from '@/components/ui/section-header';
import { Banner, Group, ListRow, ToggleRow } from '@/components/ui/kit';
import { Spacing } from '@/constants/theme';
import * as api from '@/services/cloudflare';
import { APIToken } from '@/services/cloudflare';

const statusVariant = (s: string) => (s === 'active' ? 'success' : s === 'expired' ? 'error' : 'default');

export default function APITokensScreen() {
  const { t } = useTranslation();
  const { colors } = useTheme();

  const [tokens, setTokens] = useState<APIToken[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const errMsg = (e: any) => e?.response?.data?.errors?.[0]?.message ?? e?.message ?? 'Error';

  const fetchAll = useCallback(async () => {
    setError(null);
    try {
      const res = await api.getAPITokens();
      setTokens(res.result ?? []);
    } catch (e: any) {
      setError(errMsg(e));
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  const toggleStatus = async (tok: APIToken, enabled: boolean) => {
    const nextStatus = enabled ? 'active' : 'disabled';
    const prev = tok.status;
    setTokens((prevList) => prevList.map((x) => (x.id === tok.id ? { ...x, status: nextStatus } : x)));
    try {
      await api.updateAPIToken(tok.id, { ...tok, status: nextStatus });
    } catch (e: any) {
      setTokens((prevList) => prevList.map((x) => (x.id === tok.id ? { ...x, status: prev } : x)));
      Alert.alert(t('common.error'), errMsg(e));
    }
  };

  const rollToken = (tok: APIToken) => {
    Alert.alert(t('api_tokens.roll_title'), t('api_tokens.roll_confirm', { name: tok.name }), [
      { text: t('common.cancel'), style: 'cancel' },
      {
        text: t('api_tokens.roll'),
        onPress: async () => {
          try {
            const res = await api.rollAPIToken(tok.id);
            if (res.result) {
              await Clipboard.setStringAsync(res.result);
              Alert.alert(t('api_tokens.new_value_title'), t('api_tokens.new_value_copied'));
            }
          } catch (e: any) {
            Alert.alert(t('common.error'), errMsg(e));
          }
        },
      },
    ]);
  };

  const deleteToken = (tok: APIToken) => {
    Alert.alert(t('api_tokens.delete_title'), t('api_tokens.delete_confirm', { name: tok.name }), [
      { text: t('common.cancel'), style: 'cancel' },
      {
        text: t('common.delete'),
        style: 'destructive',
        onPress: async () => {
          try {
            await api.deleteAPIToken(tok.id);
            setTokens((prev) => prev.filter((x) => x.id !== tok.id));
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
        <Stack.Screen options={{ title: t('api_tokens.title') }} />
        <View style={{ flex: 1, backgroundColor: colors.background, padding: Spacing.lg }} accessibilityLabel={t('common.loading')}>
          <SkeletonHeading />
          <SkeletonRows count={6} />
        </View>
      </>
    );
  }

  return (
    <>
      <Stack.Screen options={{ title: t('api_tokens.title') }} />
      <ScrollView
        style={[styles.container, { backgroundColor: colors.background }]}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); fetchAll(); }} tintColor={colors.primary} />}
      >
        {error && <Banner message={error} />}

        <SectionHeader title={t('api_tokens.tokens')} />
        {tokens.length === 0 && !error ? (
          <EmptyState icon="key" title={t('api_tokens.no_tokens')} message={t('api_tokens.no_tokens_message')} />
        ) : (
          tokens.map((tok) => (
            <Group key={tok.id} style={styles.token}>
              <ListRow
                icon="key"
                title={tok.name}
                subtitle={tok.last_used_on
                  ? `${t('api_tokens.last_used')}: ${new Date(tok.last_used_on).toLocaleDateString()}`
                  : undefined}
                meta={tok.expires_on
                  ? `${t('api_tokens.expires')}: ${new Date(tok.expires_on).toLocaleDateString()}`
                  : undefined}
                trailing={
                  <View>
                    <Badge
                      label={t(`api_tokens.status_${tok.status}`, { defaultValue: tok.status })}
                      variant={statusVariant(tok.status)}
                    />
                  </View>
                }
              />
              {tok.status !== 'expired' && (
                <ToggleRow
                  title={t('api_tokens.enabled')}
                  value={tok.status === 'active'}
                  onValueChange={(v) => toggleStatus(tok, v)}
                />
              )}
              <View style={styles.actionsRow}>
                <Button
                  title={t('api_tokens.roll')}
                  variant="secondary"
                  size="sm"
                  icon={<Icon name="refresh" size={14} color={colors.text} />}
                  onPress={() => rollToken(tok)}
                />
                <TouchableOpacity
                  onPress={() => deleteToken(tok)}
                  hitSlop={10}
                  accessibilityRole="button"
                  accessibilityLabel={t('common.delete')}
                >
                  <Icon name="trash" size={16} color={colors.textTertiary} />
                </TouchableOpacity>
              </View>
            </Group>
          ))
        )}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: Spacing.lg, paddingBottom: Spacing.xxxl },
  token: { marginBottom: Spacing.sm },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm + 2,
  },
});
