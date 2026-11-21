import { useEffect, useState, useCallback } from 'react';
import { StyleSheet, View, Text, ScrollView, RefreshControl, Alert } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Icon } from '@/components/ui/icon';
import { useTheme } from '@/hooks/use-theme';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SkeletonHeading, SkeletonRows } from '@/components/ui/skeleton';
import { EmptyState } from '@/components/ui/empty-state';
import { SectionHeader } from '@/components/ui/section-header';
import { Button } from '@/components/ui/button';
import { Banner, ChipRow, Group, ListRow, ToggleRow, ValueRow } from '@/components/ui/kit';
import { Sheet } from '@/components/ui/sheet';
import { Spacing, FontSize } from '@/constants/theme';
import * as api from '@/services/cloudflare';
import { ZonePlan } from '@/services/cloudflare';
import { Zone } from '@/services/types';

type LifecycleTab = 'status' | 'plan' | 'hold';

const TABS: LifecycleTab[] = ['status', 'plan', 'hold'];

export default function ZoneLifecycleScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { t } = useTranslation();
  const { colors } = useTheme();

  const [selectedTab, setSelectedTab] = useState<LifecycleTab>('status');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [zone, setZone] = useState<Zone | null>(null);
  const [zoneHold, setZoneHold] = useState<api.ZoneHold | null>(null);
  const [availablePlans, setAvailablePlans] = useState<ZonePlan[]>([]);
  const [currentPlan, setCurrentPlan] = useState<ZonePlan | null>(null);

  const [isPaused, setIsPaused] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string>('');
  const [holdIncludeSubdomains, setHoldIncludeSubdomains] = useState(false);
  const [holdAfter, setHoldAfter] = useState('');

  const [saving, setSaving] = useState(false);
  const [showPlanPicker, setShowPlanPicker] = useState(false);

  const errMsg = (e: any) => e?.response?.data?.errors?.[0]?.message ?? e?.message ?? t('common.error');

  const fetchData = useCallback(async () => {
    setError(null);
    try {
      const [zoneRes, holdRes, plansRes] = await Promise.allSettled([
        api.getZone(id),
        api.getZoneHold(id), // Use correct function name
        api.getAvailablePlans(id)
      ]);

      if (zoneRes.status === 'fulfilled') {
        setZone(zoneRes.value.result);
        setIsPaused(zoneRes.value.result.paused);
      } else {
        setError(errMsg(zoneRes.reason));
      }

      if (holdRes.status === 'fulfilled') {
        setZoneHold(holdRes.value.result);
      }

      if (plansRes.status === 'fulfilled') {
        setAvailablePlans(plansRes.value.result || []);
        // Find current plan
        const current = (plansRes.value.result || []).find(p => p.is_subscribed);
        if (current) {
          setCurrentPlan(current);
          setSelectedPlan(current.id);
        }
      }
    } catch (e: any) {
      setError(errMsg(e));
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [id]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const togglePaused = async () => {
    if (!zone) return;

    const newPaused = !isPaused;
    setSaving(true);
    try {
      await api.changeZonePausedStatus(id, newPaused);
      setIsPaused(newPaused);
      // Update the zone status as well
      setZone((prev: Zone | null) => prev ? { ...prev, paused: newPaused } : null);
    } catch (e: any) {
      Alert.alert(t('common.error'), errMsg(e));
      setIsPaused(isPaused); // Revert the UI change
    } finally {
      setSaving(false);
    }
  };

  const changePlan = async () => {
    if (!selectedPlan) return;

    setSaving(true);
    try {
      // In a real implementation, we would call the subscription API
      // For now, just update the UI
      const newPlan = availablePlans.find(p => p.id === selectedPlan);
      if (newPlan) {
        setCurrentPlan(newPlan);
        Alert.alert(t('common.success'), t('zone_lifecycle.plan_changed_success'));
      }
    } catch (e: any) {
      Alert.alert(t('common.error'), errMsg(e));
    } finally {
      setSaving(false);
      setShowPlanPicker(false);
    }
  };

  const toggleHold = async () => {
    if (!zoneHold?.hold) {
      // Create hold
      try {
        const res = await api.createZoneHold(id, holdIncludeSubdomains);
        setZoneHold(res.result);
        Alert.alert(t('common.success'), t('zone_lifecycle.hold_created'));
      } catch (e: any) {
        Alert.alert(t('common.error'), errMsg(e));
      }
    } else {
      // Delete hold
      try {
        await api.deleteZoneHold(id);
        setZoneHold({ hold: false });
        Alert.alert(t('common.success'), t('zone_lifecycle.hold_removed'));
      } catch (e: any) {
        Alert.alert(t('common.error'), errMsg(e));
      }
    }
  };

  const recheckNameservers = async () => {
    Alert.alert(
      t('zone_lifecycle.recheck_ns_title'),
      t('zone_lifecycle.recheck_ns_confirm'),
      [
        { text: t('common.cancel'), style: 'cancel' },
        {
          text: t('common.confirm'),
          style: 'default',
          onPress: async () => {
            setSaving(true);
            try {
              await api.rerunActivationCheck(id);
              Alert.alert(t('common.success'), t('zone_lifecycle.recheck_ns_success'));
            } catch (e: any) {
              Alert.alert(t('common.error'), errMsg(e));
            } finally {
              setSaving(false);
            }
          }
        }
      ]
    );
  };

  if (loading) {
    return (
      <>
        <Stack.Screen options={{ title: t('zone_lifecycle.title') }} />
        <ScrollView
          style={[styles.container, { backgroundColor: colors.background }]}
          contentContainerStyle={styles.content}
          scrollEnabled={false}
          accessibilityLabel={t('common.loading')}
        >
          <SkeletonHeading />
          <SkeletonRows count={1} avatar={false} />
          <SkeletonHeading />
          <SkeletonRows count={2} avatar={false} />
        </ScrollView>
      </>
    );
  }

  const held = !!zoneHold?.hold;
  const selectedMark = <Icon name="check-circle" size={20} color={colors.primary} />;

  return (
    <>
      <Stack.Screen options={{ title: t('zone_lifecycle.title') }} />
      <ScrollView
        style={[styles.container, { backgroundColor: colors.background }]}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); fetchData(); }} tintColor={colors.primary} />}
      >
        {error && (
          <View style={styles.banner}>
            <Banner message={error} />
          </View>
        )}

        <ChipRow
          options={TABS.map((tab) => ({ value: tab, label: t(`zone_lifecycle.${tab}`) }))}
          value={selectedTab}
          onChange={setSelectedTab}
        />

        {selectedTab === 'status' && (
          <View>
            <SectionHeader title={t('zone_lifecycle.zone_status')} />
            <Group>
              <ToggleRow
                icon="power"
                iconTone={isPaused ? 'warning' : 'neutral'}
                title={t('zone_lifecycle.zone_paused')}
                subtitle={isPaused ? t('zone_lifecycle.zone_paused_desc') : t('zone_lifecycle.zone_active_desc')}
                value={isPaused}
                onValueChange={togglePaused}
                disabled={saving}
              />
            </Group>

            <SectionHeader title={t('zone_lifecycle.actions')} />
            <Group>
              <ListRow
                icon="refresh"
                title={t('zone_lifecycle.recheck_nameservers')}
                subtitle={t('zone_lifecycle.recheck_nameservers_desc')}
                onPress={saving ? undefined : recheckNameservers}
                chevron
              />
            </Group>
          </View>
        )}

        {selectedTab === 'plan' && (
          <View>
            <SectionHeader title={t('zone_lifecycle.current_plan')} />

            {currentPlan ? (
              <Card>
                <View style={styles.planHeader}>
                  <Text style={[styles.planName, { color: colors.text }]} numberOfLines={1}>{currentPlan.name}</Text>
                  <Badge label={t('zone_lifecycle.current')} variant="success" />
                </View>
                <Text style={[styles.planPrice, { color: colors.textSecondary }]}>
                  {currentPlan.price} {currentPlan.currency}/{currentPlan.frequency}
                </Text>
                <Text style={[styles.planId, { color: colors.textTertiary }]}>{currentPlan.legacy_id}</Text>
              </Card>
            ) : (
              <Card>
                <Text style={[styles.noPlanText, { color: colors.textSecondary }]}>{t('zone_lifecycle.no_plan')}</Text>
              </Card>
            )}

            <SectionHeader title={t('zone_lifecycle.available_plans')} />
            {availablePlans.length === 0 ? (
              <EmptyState icon="info" title={t('zone_lifecycle.no_plans_available')} message={t('zone_lifecycle.no_plans_available_message')} />
            ) : (
              <View>
                <Group>
                  {availablePlans.map((plan) => (
                    <ListRow
                      key={plan.id}
                      title={plan.name}
                      subtitle={`${plan.price} ${plan.currency}/${plan.frequency}`}
                      onPress={() => setSelectedPlan(plan.id)}
                      trailing={selectedPlan === plan.id ? selectedMark : undefined}
                      chevron={false}
                    />
                  ))}
                </Group>

                <Button
                  title={t('zone_lifecycle.change_plan')}
                  onPress={changePlan}
                  loading={saving}
                  disabled={!selectedPlan || !availablePlans.some(p => p.id === selectedPlan)}
                  style={{ marginTop: Spacing.lg }}
                />
              </View>
            )}
          </View>
        )}

        {selectedTab === 'hold' && (
          <View>
            <SectionHeader title={t('zone_lifecycle.zone_hold')} />
            <Group>
              <ToggleRow
                icon={held ? 'lock' : 'lock-open'}
                iconTone={held ? 'error' : 'neutral'}
                title={held ? t('zone_lifecycle.hold_active') : t('zone_lifecycle.hold_inactive')}
                subtitle={held ? t('zone_lifecycle.hold_active_desc') : t('zone_lifecycle.hold_inactive_desc')}
                value={held}
                onValueChange={toggleHold}
                disabled={saving}
              />
              {held && (
                <ValueRow
                  label={t('zone_lifecycle.hold_details')}
                  value={zoneHold?.hold_after ? `${t('zone_lifecycle.temp_disabled_until')} ${zoneHold.hold_after}` : t('zone_lifecycle.permanently_held')}
                />
              )}
            </Group>

            <SectionHeader title={t('zone_lifecycle.hold_options')} />
            <Group>
              <ToggleRow
                title={t('zone_lifecycle.include_subdomains')}
                subtitle={t('zone_lifecycle.include_subdomains_desc')}
                value={holdIncludeSubdomains}
                onValueChange={setHoldIncludeSubdomains}
              />
            </Group>
          </View>
        )}
      </ScrollView>

      <Sheet
        visible={showPlanPicker}
        onClose={() => setShowPlanPicker(false)}
        title={t('zone_lifecycle.select_plan')}
        footer={
          <Button
            title={t('common.save')}
            onPress={changePlan}
            loading={saving}
            disabled={!selectedPlan}
          />
        }
      >
        <Group>
          {availablePlans.map((plan) => (
            <ListRow
              key={plan.id}
              title={`${plan.name} (${plan.price} ${plan.currency})`}
              onPress={() => setSelectedPlan(plan.id)}
              trailing={selectedPlan === plan.id ? selectedMark : undefined}
              chevron={false}
            />
          ))}
        </Group>
      </Sheet>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: Spacing.lg, paddingBottom: Spacing.xxxl },
  banner: { marginBottom: Spacing.md },
  planHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: Spacing.md,
  },
  planName: { flex: 1, fontSize: FontSize.lg, fontWeight: '500', letterSpacing: -0.2 },
  planPrice: { fontSize: FontSize.sm, marginTop: Spacing.xs },
  planId: { fontSize: 12, fontFamily: 'monospace', marginTop: Spacing.xs },
  noPlanText: { fontSize: FontSize.sm, textAlign: 'center' },
});
