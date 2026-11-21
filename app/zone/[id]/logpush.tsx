import { useEffect, useState, useCallback } from 'react';
import { StyleSheet, View, Text, ScrollView, RefreshControl, TouchableOpacity, Alert } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Icon } from '@/components/ui/icon';
import { useTheme } from '@/hooks/use-theme';
import { Badge } from '@/components/ui/badge';
import { SkeletonRows, SkeletonHeading } from '@/components/ui/skeleton';
import { EmptyState } from '@/components/ui/empty-state';
import { SectionHeader } from '@/components/ui/section-header';
import { Banner, Group, ListRow, ToggleRow } from '@/components/ui/kit';
import { Spacing, FontSize } from '@/constants/theme';
import * as api from '@/services/cloudflare';
import { LogpushJob } from '@/services/cloudflare';

export default function LogpushScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { t } = useTranslation();
  const { colors } = useTheme();

  const [jobs, setJobs] = useState<LogpushJob[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const errMsg = (e: any) => e?.response?.data?.errors?.[0]?.message ?? e?.message ?? 'Error';

  const fetchAll = useCallback(async () => {
    setError(null);
    try {
      const res = await api.getLogpushJobs(id);
      setJobs(res.result ?? []);
    } catch (e: any) {
      setError(errMsg(e));
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [id]);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  const toggleJob = async (job: LogpushJob, enabled: boolean) => {
    const prev = jobs;
    setJobs((list) => list.map((j) => (j.id === job.id ? { ...j, enabled } : j)));
    try {
      await api.updateLogpushJob(id, job.id, { enabled });
    } catch (e: any) {
      setJobs(prev);
      Alert.alert(t('common.error'), errMsg(e));
    }
  };

  const deleteJob = (job: LogpushJob) => {
    Alert.alert(t('logpush.delete_title'), t('logpush.delete_confirm', { name: job.name ?? job.destination_conf }), [
      { text: t('common.cancel'), style: 'cancel' },
      {
        text: t('common.delete'),
        style: 'destructive',
        onPress: async () => {
          try {
            await api.deleteLogpushJob(id, job.id);
            setJobs((list) => list.filter((j) => j.id !== job.id));
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
        <Stack.Screen options={{ title: t('logpush.title') }} />
        <View style={[styles.container, { backgroundColor: colors.background }]} accessibilityLabel={t('common.loading')}>
          <View style={styles.content}>
            <SkeletonHeading />
            <SkeletonRows count={5} />
          </View>
        </View>
      </>
    );
  }

  return (
    <>
      <Stack.Screen options={{ title: t('logpush.title') }} />
      <ScrollView
        style={[styles.container, { backgroundColor: colors.background }]}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); fetchAll(); }} tintColor={colors.primary} />}
      >
        {error && <Banner message={error} />}

        <SectionHeader title={t('logpush.jobs')} />
        {jobs.length === 0 && !error ? (
          <EmptyState icon="cloud-upload" title={t('logpush.no_jobs')} message={t('logpush.no_jobs_message')} />
        ) : (
          jobs.map((j) => (
            <Group key={j.id} style={styles.item}>
              <ListRow
                icon="cloud-upload"
                iconTone={j.error_message ? 'error' : 'neutral'}
                title={j.name || j.dataset || t('logpush.untitled_job')}
                subtitle={j.destination_conf}
                mono
                meta={j.dataset}
                trailing={
                  <View style={styles.trailing}>
                    {j.error_message ? <Badge label={t('logpush.failing')} variant="error" /> : null}
                    <TouchableOpacity
                      onPress={() => deleteJob(j)}
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
              {j.error_message ? (
                <Text style={[styles.jobError, { color: colors.error }]} numberOfLines={2}>{j.error_message}</Text>
              ) : null}
              <ToggleRow
                title={t('logpush.enabled')}
                value={j.enabled}
                onValueChange={(v) => toggleJob(j, v)}
              />
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
  item: { marginBottom: Spacing.sm },
  trailing: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  iconButton: { padding: 4 },
  jobError: { fontSize: FontSize.sm, lineHeight: 18, paddingHorizontal: Spacing.lg, paddingVertical: Spacing.md },
});
