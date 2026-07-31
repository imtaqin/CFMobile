import { useEffect, useState } from 'react';
import {
  StyleSheet, View, Text, Modal, TouchableOpacity, ActivityIndicator, Alert, ScrollView,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { Icon } from '@/components/ui/icon';
import { useTheme } from '@/hooks/use-theme';
import * as aiSub from '@/services/ai-subscription';
import { track } from '@/services/analytics';
import { Spacing, FontSize, Radius, CF } from '@/constants/theme';

interface AiPaywallProps {
  visible: boolean;
  onClose: () => void;
  /** shown when the user hit the free limit rather than opening the plan directly */
  reason?: 'quota' | 'browse';
  onSubscribed?: () => void;
}

export function AiPaywall({ visible, onClose, reason = 'browse', onSubscribed }: AiPaywallProps) {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const { quota } = aiSub.useAiQuota();

  const [price, setPrice] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (visible) {
      track('paywall_shown');
      aiSub.getSubscriptionPrice().then(setPrice).catch(() => {});
    }
  }, [visible]);

  const buy = async () => {
    setBusy(true);
    try {
      track('subscribe_tapped');
      await aiSub.subscribeAi();
      // entitlement arrives through the purchase listener; refresh once the sheet closes
      setTimeout(async () => {
        await aiSub.refreshQuota();
        onSubscribed?.();
      }, 1500);
    } catch (e: any) {
      const msg = String(e?.message ?? '');
      if (!/cancel/i.test(msg)) {
        Alert.alert(t('common.error'), msg || t('ai_plan.purchase_error'));
      }
    } finally {
      setBusy(false);
    }
  };

  const restore = async () => {
    setBusy(true);
    try {
      const q = await aiSub.syncSubscription();
      Alert.alert(
        t('common.info'),
        q?.tier === 'pro' ? t('ai_plan.restored') : t('ai_plan.nothing_to_restore')
      );
      if (q?.tier === 'pro') onSubscribed?.();
    } finally {
      setBusy(false);
    }
  };

  const perks: { icon: 'shield-check' | 'chart-line' | 'dns' | 'code'; text: string }[] = [
    { icon: 'shield-check', text: t('ai_plan.perk_audit') },
    { icon: 'chart-line', text: t('ai_plan.perk_traffic') },
    { icon: 'dns', text: t('ai_plan.perk_dns') },
    { icon: 'code', text: t('ai_plan.perk_logs') },
  ];

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={[styles.sheet, { backgroundColor: colors.surface }]}>
          <TouchableOpacity style={styles.closeBtn} onPress={onClose} hitSlop={10}>
            <Icon name="close" size={22} color={colors.textSecondary} />
          </TouchableOpacity>

          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={[styles.badge, { backgroundColor: CF.orange + '18' }]}>
              <Icon name="zap" size={30} color={CF.orange} />
            </View>

            <Text style={[styles.title, { color: colors.text }]}>{t('ai_plan.title')}</Text>
            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
              {reason === 'quota' ? t('ai_plan.subtitle_quota') : t('ai_plan.subtitle')}
            </Text>

            {quota && (
              <View style={[styles.quotaBar, { backgroundColor: colors.surfaceSecondary }]}>
                <Text style={[styles.quotaText, { color: colors.textSecondary }]}>
                  {t('ai_plan.usage', { used: quota.used, limit: quota.limit })}
                </Text>
              </View>
            )}

            <View style={styles.perks}>
              {perks.map((p) => (
                <View key={p.text} style={styles.perkRow}>
                  <View style={[styles.perkIcon, { backgroundColor: CF.orange + '15' }]}>
                    <Icon name={p.icon} size={15} color={CF.orange} />
                  </View>
                  <Text style={[styles.perkText, { color: colors.text }]}>{p.text}</Text>
                </View>
              ))}
            </View>

            <View style={[styles.priceCard, { borderColor: CF.orange }]}>
              <View style={{ flex: 1 }}>
                <Text style={[styles.planName, { color: colors.text }]}>{t('ai_plan.plan_name')}</Text>
                <Text style={[styles.planDetail, { color: colors.textSecondary }]}>
                  {t('ai_plan.plan_detail')}
                </Text>
              </View>
              <Text style={[styles.price, { color: CF.orange }]}>{price ?? '—'}</Text>
            </View>

            <TouchableOpacity
              style={[styles.cta, { backgroundColor: CF.orange, opacity: busy ? 0.6 : 1 }]}
              onPress={buy}
              disabled={busy}
              activeOpacity={0.85}
            >
              {busy ? (
                <ActivityIndicator size="small" color="#FFF" />
              ) : (
                <Text style={styles.ctaText}>{t('ai_plan.subscribe')}</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity onPress={restore} disabled={busy} hitSlop={8}>
              <Text style={[styles.restore, { color: colors.textSecondary }]}>{t('ai_plan.restore')}</Text>
            </TouchableOpacity>

            <Text style={[styles.legal, { color: colors.textTertiary }]}>{t('ai_plan.legal')}</Text>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.55)', justifyContent: 'flex-end' },
  sheet: {
    borderTopLeftRadius: Radius.xl,
    borderTopRightRadius: Radius.xl,
    padding: Spacing.xl,
    paddingBottom: Spacing.xxxl,
    maxHeight: '90%',
  },
  closeBtn: { position: 'absolute', right: Spacing.lg, top: Spacing.lg, zIndex: 2, padding: 4 },
  badge: {
    alignSelf: 'center',
    width: 64, height: 64, borderRadius: 32,
    alignItems: 'center', justifyContent: 'center',
    marginBottom: Spacing.md,
  },
  title: { fontSize: FontSize.xxl, fontWeight: '800', textAlign: 'center' },
  subtitle: {
    fontSize: FontSize.sm,
    textAlign: 'center',
    lineHeight: 20,
    marginTop: Spacing.xs,
    paddingHorizontal: Spacing.sm,
  },
  quotaBar: {
    alignSelf: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: 6,
    borderRadius: Radius.full,
    marginTop: Spacing.md,
  },
  quotaText: { fontSize: FontSize.xs, fontWeight: '700' },
  perks: { gap: Spacing.sm, marginTop: Spacing.xl },
  perkRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md },
  perkIcon: {
    width: 30, height: 30, borderRadius: Radius.sm,
    alignItems: 'center', justifyContent: 'center',
  },
  perkText: { flex: 1, fontSize: FontSize.sm, lineHeight: 19 },
  priceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    borderWidth: 2,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    marginTop: Spacing.xl,
  },
  planName: { fontSize: FontSize.md, fontWeight: '800' },
  planDetail: { fontSize: FontSize.xs, marginTop: 2 },
  price: { fontSize: FontSize.lg, fontWeight: '900' },
  cta: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 52,
    borderRadius: Radius.full,
    marginTop: Spacing.lg,
  },
  ctaText: { color: '#FFF', fontSize: FontSize.md, fontWeight: '800' },
  restore: {
    fontSize: FontSize.sm,
    textAlign: 'center',
    textDecorationLine: 'underline',
    marginTop: Spacing.md,
  },
  legal: {
    fontSize: 10,
    textAlign: 'center',
    lineHeight: 15,
    marginTop: Spacing.md,
  },
});
