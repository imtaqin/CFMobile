import { useState, useCallback } from 'react';
import {
  StyleSheet, View, Text, ScrollView, TouchableOpacity, ActivityIndicator,
} from 'react-native';
import { useLocalSearchParams, Stack, router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Icon, IconName } from '@/components/ui/icon';
import { useTheme } from '@/hooks/use-theme';
import { Card } from '@/components/ui/card';
import { Spacing, FontSize, Radius, CF } from '@/constants/theme';
import * as api from '@/services/cloudflare';
import * as ai from '@/services/ai';
import { AuditResult, AuditFinding, AiError } from '@/services/ai';
import { recordHappyMoment } from '@/services/review-prompt';
import { AiPaywall } from '@/components/ui/ai-paywall';
import i18n from '@/i18n';

export default function AiAuditScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { t } = useTranslation();
  const { colors } = useTheme();

  const [result, setResult] = useState<AuditResult | null>(null);
  const [running, setRunning] = useState(false);
  const [error, setError] = useState<{ code: string; message: string } | null>(null);
  const [showPaywall, setShowPaywall] = useState(false);

  const runAudit = useCallback(async () => {
    setRunning(true);
    setError(null);
    try {
      // Gather zone facts locally, then let the worker do the reasoning.
      const [zoneRes, settingsRes, dnsRes] = await Promise.all([
        api.getZone(id),
        api.getZoneSettings(id).catch(() => ({ result: [] as any[] })),
        api.getDnsRecords(id, 1).catch(() => ({ result: [] as any[] })),
      ]);

      const settings: Record<string, unknown> = {};
      for (const s of settingsRes.result ?? []) settings[s.id] = s.value;

      const records = dnsRes.result ?? [];
      const dnsSummary = records.slice(0, 60).map((r: any) => ({
        type: r.type,
        proxied: !!r.proxied,
        name: r.name,
      }));
      const txt = records.filter((r: any) => r.type === 'TXT');
      const hasSpf = txt.some((r: any) => String(r.content).toLowerCase().includes('v=spf1'));
      const hasDmarc = txt.some((r: any) => String(r.name).toLowerCase().startsWith('_dmarc'));

      let threats24h = 0;
      try {
        const end = new Date();
        const start = new Date(end.getTime() - 24 * 60 * 60 * 1000);
        const a = await api.getZoneAnalytics(
          id,
          start.toISOString().split('T')[0],
          end.toISOString().split('T')[0]
        );
        threats24h = a.totals.threats.all;
      } catch {
        // analytics optional
      }

      const res = await ai.auditZone({
        zoneName: zoneRes.result?.name ?? id,
        settings,
        dnsSummary,
        hasDmarc,
        hasSpf,
        threats24h,
        language: i18n.language,
      });
      setResult(res);
      recordHappyMoment();
    } catch (e: any) {
      if (e instanceof AiError) {
        setError({ code: e.code, message: e.message });
        if (e.code === 'quota' || e.code === 'auth') setShowPaywall(true);
      } else {
        setError({ code: 'server', message: e?.message ?? 'Audit failed' });
      }
    } finally {
      setRunning(false);
    }
  }, [id]);

  const sevColor = (s: AuditFinding['severity']) =>
    s === 'critical' ? colors.error : s === 'warning' ? colors.warning : s === 'ok' ? colors.success : colors.info;
  const sevIcon = (s: AuditFinding['severity']): IconName =>
    s === 'critical' ? 'error-circle' : s === 'warning' ? 'warning' : s === 'ok' ? 'check-circle' : 'info';

  const scoreColor = (score: number) =>
    score >= 80 ? colors.success : score >= 55 ? colors.warning : colors.error;

  return (
    <>
      <Stack.Screen options={{ title: t('ai.audit_title') }} />
      <ScrollView
        style={[styles.container, { backgroundColor: colors.background }]}
        contentContainerStyle={styles.content}
      >
        {!result && !running && !error && (
          <View style={styles.intro}>
            <View style={[styles.introIcon, { backgroundColor: CF.orange + '18' }]}>
              <Icon name="shield-check" size={40} color={CF.orange} />
            </View>
            <Text style={[styles.introTitle, { color: colors.text }]}>{t('ai.audit_intro_title')}</Text>
            <Text style={[styles.introBody, { color: colors.textSecondary }]}>{t('ai.audit_intro_body')}</Text>
            <TouchableOpacity
              style={[styles.runBtn, { backgroundColor: CF.orange }]}
              onPress={runAudit}
              activeOpacity={0.85}
            >
              <Icon name="zap" size={18} color="#FFF" />
              <Text style={styles.runBtnText}>{t('ai.run_audit')}</Text>
            </TouchableOpacity>
            <Text style={[styles.privacyNote, { color: colors.textTertiary }]}>{t('ai.privacy_note')}</Text>
          </View>
        )}

        {running && (
          <View style={styles.intro}>
            <ActivityIndicator size="large" color={CF.orange} />
            <Text style={[styles.introTitle, { color: colors.text, marginTop: Spacing.lg }]}>
              {t('ai.analyzing')}
            </Text>
            <Text style={[styles.introBody, { color: colors.textSecondary }]}>{t('ai.analyzing_sub')}</Text>
          </View>
        )}

        {error && (
          <Card style={[styles.errorCard, { borderColor: colors.error }]}>
            <Icon name="error-circle" size={22} color={colors.error} />
            <View style={{ flex: 1 }}>
              <Text style={[styles.errorTitle, { color: colors.text }]}>
                {error.code === 'quota' ? t('ai.quota_title') : error.code === 'auth' ? t('ai.sub_title') : t('common.error')}
              </Text>
              <Text style={[styles.errorBody, { color: colors.textSecondary }]}>
                {error.code === 'quota' ? t('ai.quota_body') : error.code === 'auth' ? t('ai.sub_body') : error.message}
              </Text>
              {(error.code === 'quota' || error.code === 'auth') && (
                <TouchableOpacity
                  style={[styles.smallBtn, { backgroundColor: CF.orange }]}
                  onPress={() => setShowPaywall(true)}
                >
                  <Text style={styles.smallBtnText}>{t('ai.see_plans')}</Text>
                </TouchableOpacity>
              )}
              {error.code !== 'quota' && error.code !== 'auth' && (
                <TouchableOpacity style={[styles.smallBtn, { backgroundColor: colors.primary }]} onPress={runAudit}>
                  <Text style={styles.smallBtnText}>{t('common.retry')}</Text>
                </TouchableOpacity>
              )}
            </View>
          </Card>
        )}

        {result && (
          <>
            <View style={[styles.scoreCard, { backgroundColor: colors.surface, borderColor: scoreColor(result.score) + '50' }]}>
              <View style={[styles.scoreRing, { borderColor: scoreColor(result.score) }]}>
                <Text style={[styles.scoreNum, { color: scoreColor(result.score) }]}>{result.score}</Text>
                <Text style={[styles.scoreMax, { color: colors.textTertiary }]}>/100</Text>
              </View>
              <Text style={[styles.summary, { color: colors.text }]}>{result.summary}</Text>
            </View>

            {result.findings.map((f, i) => (
              <Card key={i} style={styles.findingCard}>
                <View style={[styles.findingIcon, { backgroundColor: sevColor(f.severity) + '15' }]}>
                  <Icon name={sevIcon(f.severity)} size={18} color={sevColor(f.severity)} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.findingTitle, { color: colors.text }]}>{f.title}</Text>
                  <Text style={[styles.findingDetail, { color: colors.textSecondary }]}>{f.detail}</Text>
                  {!!f.action && (
                    <View style={[styles.actionBox, { backgroundColor: colors.surfaceSecondary }]}>
                      <Icon name="zap" size={12} color={CF.orange} />
                      <Text style={[styles.actionText, { color: colors.text }]}>{f.action}</Text>
                    </View>
                  )}
                </View>
              </Card>
            ))}

            <TouchableOpacity
              style={[styles.runBtn, { backgroundColor: colors.primary, alignSelf: 'stretch' }]}
              onPress={runAudit}
              activeOpacity={0.85}
            >
              <Icon name="refresh" size={18} color="#FFF" />
              <Text style={styles.runBtnText}>{t('ai.rerun')}</Text>
            </TouchableOpacity>
            <Text style={[styles.privacyNote, { color: colors.textTertiary }]}>{t('ai.disclaimer')}</Text>
          </>
        )}
      </ScrollView>

      <AiPaywall
        visible={showPaywall}
        reason="quota"
        onClose={() => setShowPaywall(false)}
        onSubscribed={() => { setShowPaywall(false); runAudit(); }}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: Spacing.lg, paddingBottom: Spacing.xxxl },
  intro: { alignItems: 'center', paddingVertical: Spacing.xxxl, gap: Spacing.sm },
  introIcon: {
    width: 88,
    height: 88,
    borderRadius: 44,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.sm,
  },
  introTitle: { fontSize: FontSize.xl, fontWeight: '800', textAlign: 'center' },
  introBody: { fontSize: FontSize.sm, textAlign: 'center', lineHeight: 20, paddingHorizontal: Spacing.md },
  runBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    paddingHorizontal: Spacing.xxl,
    height: 52,
    borderRadius: Radius.full,
    marginTop: Spacing.lg,
  },
  runBtnText: { color: '#FFF', fontSize: FontSize.md, fontWeight: '800' },
  privacyNote: { fontSize: FontSize.xs, textAlign: 'center', lineHeight: 16, marginTop: Spacing.md },
  errorCard: { flexDirection: 'row', gap: Spacing.md, borderWidth: 1 },
  errorTitle: { fontSize: FontSize.md, fontWeight: '700' },
  errorBody: { fontSize: FontSize.sm, marginTop: 4, lineHeight: 18 },
  smallBtn: {
    alignSelf: 'flex-start',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: Radius.full,
    marginTop: Spacing.md,
  },
  smallBtnText: { color: '#FFF', fontSize: FontSize.sm, fontWeight: '700' },
  scoreCard: {
    alignItems: 'center',
    gap: Spacing.md,
    padding: Spacing.xl,
    borderRadius: Radius.xl,
    borderWidth: 1,
    marginBottom: Spacing.md,
  },
  scoreRing: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreNum: { fontSize: 44, fontWeight: '900' },
  scoreMax: { fontSize: FontSize.xs, marginTop: -4 },
  summary: { fontSize: FontSize.sm, textAlign: 'center', lineHeight: 20 },
  findingCard: { flexDirection: 'row', gap: Spacing.md, marginBottom: Spacing.sm },
  findingIcon: {
    width: 36,
    height: 36,
    borderRadius: Radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  findingTitle: { fontSize: FontSize.sm, fontWeight: '700' },
  findingDetail: { fontSize: FontSize.xs, marginTop: 3, lineHeight: 17 },
  actionBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    padding: Spacing.sm,
    borderRadius: Radius.sm,
    marginTop: Spacing.sm,
  },
  actionText: { flex: 1, fontSize: FontSize.xs, fontWeight: '600', lineHeight: 16 },
});
