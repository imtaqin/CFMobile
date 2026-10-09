import { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView, Alert, TouchableOpacity, DevSettings } from 'react-native';
import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/contexts/auth';
import { useThemeContext, ThemeMode } from '@/contexts/theme';
import { Icon } from '@/components/ui/icon';
import { useTheme } from '@/hooks/use-theme';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MenuItem } from '@/components/ui/menu-item';
import { promptReport } from '@/components/ui/error-report';
import { SectionHeader } from '@/components/ui/section-header';
import { Badge } from '@/components/ui/badge';
import { ChipRow, Group, IconCircle, ListRow, ToggleRow, ValueRow } from '@/components/ui/kit';
import { Sheet } from '@/components/ui/sheet';
import { Spacing, FontSize, Radius } from '@/constants/theme';
import * as appLock from '@/services/app-lock';
import * as premiumService from '@/services/premium';
import { usePremium } from '@/services/premium';
import { DiceBearAvatar } from '@/components/ui/dicebear-avatar';
import { openReview } from '@/services/review-prompt';
import { startPlayUpdate } from '@/services/play-update';
import { AiPaywall } from '@/components/ui/ai-paywall';
import { useAiQuota } from '@/services/ai-subscription';
import { isAnalyticsEnabled, setAnalyticsEnabled } from '@/services/analytics';
import i18n, { setLanguage } from '@/i18n';

const LANGUAGES = [
  { code: 'en', name: 'English', flag: 'EN' },
  { code: 'id', name: 'Bahasa Indonesia', flag: 'ID' },
  { code: 'es', name: 'Español', flag: 'ES' },
  { code: 'pt', name: 'Português (Brasil)', flag: 'PT' },
  { code: 'de', name: 'Deutsch', flag: 'DE' },
  { code: 'fr', name: 'Français', flag: 'FR' },
  { code: 'ru', name: 'Русский', flag: 'RU' },
  { code: 'ja', name: '日本語', flag: 'JA' },
  { code: 'ko', name: '한국어', flag: 'KO' },
  { code: 'zh', name: '中文（简体）', flag: 'ZH' },
  { code: 'tr', name: 'Türkçe', flag: 'TR' },
  { code: 'vi', name: 'Tiếng Việt', flag: 'VI' },
];

const THEME_OPTIONS: { mode: ThemeMode; labelKey: string }[] = [
  { mode: 'light', labelKey: 'settings.theme_light' },
  { mode: 'dark', labelKey: 'settings.theme_dark' },
  { mode: 'system', labelKey: 'settings.theme_system' },
];

export default function SettingsScreen() {
  const { t } = useTranslation();

  const [demoMode, setDemoModeState] = useState(false);
  useEffect(() => {
    if (__DEV__) require('@/services/demo').loadDemoMode().then(setDemoModeState);
  }, []);
  const toggleDemo = async (value: boolean) => {
    setDemoModeState(value);
    await require('@/services/demo').setDemoMode(value);
    // Every screen holds data from the other mode, so start the app over.
    DevSettings.reload();
  };
  const { colors } = useTheme();
  const { mode: themeMode, setMode: setThemeMode } = useThemeContext();
  const { user, authConfig, logout, accounts, accountId, switchAccount, profiles } = useAuth();

  const currentLang = i18n.language;
  const [langOpen, setLangOpen] = useState(false);
  const [showSensitive, setShowSensitive] = useState(false);
  const [lockAvailable, setLockAvailable] = useState(false);
  const [lockEnabled, setLockEnabledState] = useState(false);
  const premium = usePremium();
  const [premiumPrice, setPremiumPrice] = useState<string | null>(null);
  const [premiumBusy, setPremiumBusy] = useState(false);
  const { quota: aiQuota } = useAiQuota();
  const [showAiPaywall, setShowAiPaywall] = useState(false);
  const [analyticsOn, setAnalyticsOn] = useState(true);

  useEffect(() => {
    isAnalyticsEnabled().then(setAnalyticsOn).catch(() => {});
  }, []);

  const toggleAnalytics = async (value: boolean) => {
    setAnalyticsOn(value);
    await setAnalyticsEnabled(value);
  };

  useEffect(() => {
    (async () => {
      setLockAvailable(await appLock.isLockAvailable());
      setLockEnabledState(await appLock.isLockEnabled());
    })();
  }, []);

  useEffect(() => {
    if (!premium) {
      premiumService.getPremiumPrice().then(setPremiumPrice).catch(() => {});
    }
  }, [premium]);

  const handleBuyPremium = async () => {
    setPremiumBusy(true);
    try {
      await premiumService.purchasePremium();
    } catch (e: any) {
      const msg = String(e?.message ?? '');
      if (msg === 'billing-unavailable') {
        Alert.alert(t('premium.unavailable_title'), t('premium.unavailable_body'));
      } else if (!msg.toLowerCase().includes('cancel')) {
        Alert.alert(t('common.error'), msg || t('premium.purchase_error'));
      }
    } finally {
      setPremiumBusy(false);
    }
  };

  const handleRestorePremium = async () => {
    setPremiumBusy(true);
    try {
      const owned = await premiumService.restorePremium();
      Alert.alert(
        t('common.info'),
        owned ? t('premium.restored') : t('premium.nothing_to_restore')
      );
    } catch (e: any) {
      Alert.alert(t('common.error'), e?.message ?? t('premium.purchase_error'));
    } finally {
      setPremiumBusy(false);
    }
  };

  const toggleLock = async (value: boolean) => {
    if (value) {
      // Verify biometric works before enabling
      const ok = await appLock.authenticate(t('lock.prompt'));
      if (!ok) return;
    }
    setLockEnabledState(value);
    await appLock.setLockEnabled(value);
  };

  const dots = '••••';
  const maskEmail = (email: string) => {
    const [local, domain] = email.split('@');
    if (!domain) return dots + dots;
    return local.slice(0, 2) + dots + '@' + domain;
  };

  const maskId = (id: string) => {
    if (id.length <= 8) return dots + dots;
    return id.slice(0, 4) + dots + id.slice(-4);
  };

  const switchLanguage = (code: string) => {
    setLanguage(code);
    setLangOpen(false);
  };

  const handleLogout = () => {
    Alert.alert(
      t('settings.logout'),
      t('settings.logout_confirm'),
      [
        { text: t('common.cancel'), style: 'cancel' },
        {
          text: t('settings.logout'),
          style: 'destructive',
          onPress: async () => {
            await logout();
            router.replace('/login');
          },
        },
      ]
    );
  };

  const aiPro = aiQuota?.tier === 'pro';

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* Who is signed in */}
      <Card style={styles.accountCard}>
        <DiceBearAvatar seed={user?.email || user?.username || 'cfmobile'} size={44} />
        <View style={{ flex: 1 }}>
          <Text style={[styles.accountName, { color: colors.text }]} numberOfLines={1}>
            {user?.first_name ? `${user.first_name} ${user.last_name ?? ''}`.trim() : (user?.email?.split('@')[0] ?? 'Admin')}
          </Text>
          <Text style={[styles.accountEmail, { color: colors.textSecondary }]} numberOfLines={1}>
            {showSensitive ? user?.email : maskEmail(user?.email ?? '')}
          </Text>
        </View>
        <Badge
          label={authConfig?.method === 'oauth' ? 'OAUTH' : authConfig?.method === 'token' ? 'TOKEN' : 'KEY'}
          variant="default"
        />
      </Card>

      {/* FOSS build: nothing is sold here, so the AI block only reports usage. */}
      {!!aiQuota && (
        <Group style={styles.planCard}>
          <ListRow
            icon="sparkles"
            title={t('ai_plan.title')}
            subtitle={t('ai_plan.usage', { used: aiQuota.used, limit: aiQuota.limit })}
          />
        </Group>
      )}

      {/* Stored Cloudflare logins */}
      <SectionHeader title={t('settings.accounts_section')} />
      <Group>
        <ListRow
          icon="users"
          title={t('settings.manage_accounts')}
          subtitle={t('settings.manage_accounts_sub', { count: profiles.length })}
          onPress={() => router.push('/accounts' as any)}
        />
      </Group>

      {/* Sub-accounts visible to the active login */}
      {accounts.length > 1 && (
        <>
          <SectionHeader title={t('settings.switch_account')} />
          <Group>
            {accounts.map((acc) => (
              <ListRow
                key={acc.id}
                icon="user"
                title={acc.name.includes('@') ? maskEmail(acc.name) : acc.name}
                subtitle={acc.id.slice(0, 4) + '••••'}
                mono
                onPress={() => switchAccount(acc.id)}
                trailing={
                  acc.id === accountId ? (
                    <Icon name="check-circle" size={20} color={colors.success} />
                  ) : undefined
                }
              />
            ))}
          </Group>
        </>
      )}

      {/* Theme */}
      <SectionHeader title={t('settings.appearance')} />
      <ChipRow
        wrap
        options={THEME_OPTIONS.map((opt) => ({ value: opt.mode, label: t(opt.labelKey) }))}
        value={themeMode}
        onChange={setThemeMode}
      />

      {/* Language */}
      <SectionHeader title={t('settings.language')} />
      <Group>
        <ListRow
          icon="languages"
          title={LANGUAGES.find((l) => l.code === currentLang)?.name ?? 'English'}
          onPress={() => setLangOpen(!langOpen)}
        />
      </Group>

      {/* Security */}
      <SectionHeader title={t('settings.security')} />
      <Group>
        <ToggleRow
          icon="enhanced-encryption"
          title={t('settings.biometric_lock')}
          subtitle={lockAvailable ? t('settings.biometric_lock_sub') : t('settings.biometric_unavailable')}
          value={lockEnabled}
          onValueChange={toggleLock}
          disabled={!lockAvailable}
        />
        <ListRow
          icon="activity"
          title={t('settings.audit_logs')}
          subtitle={t('settings.audit_logs_sub')}
          onPress={() => router.push('/audit-logs' as any)}
        />
        <ListRow
          icon="layers"
          title={t('settings.lists')}
          subtitle={t('settings.lists_sub')}
          onPress={() => router.push('/lists' as any)}
        />
        <ListRow
          icon="globe"
          title={t('settings.registrar')}
          subtitle={t('settings.registrar_sub')}
          onPress={() => router.push('/registrar' as any)}
        />
        <ListRow
          icon="shield-check"
          title={t('settings.turnstile')}
          subtitle={t('settings.turnstile_sub')}
          onPress={() => router.push('/turnstile' as any)}
        />
        <ListRow
          icon="users"
          title={t('settings.account_members')}
          subtitle={t('settings.account_members_sub')}
          onPress={() => router.push('/account-members' as any)}
        />
        <ListRow
          icon="key"
          title={t('settings.api_tokens')}
          subtitle={t('settings.api_tokens_sub')}
          onPress={() => router.push('/api-tokens' as any)}
        />
        <ListRow
          icon="bell"
          title={t('settings.notifications')}
          subtitle={t('settings.notifications_sub')}
          onPress={() => router.push('/notifications' as any)}
        />
        <ListRow
          icon="widgets"
          title={t('settings.durable_objects')}
          subtitle={t('settings.durable_objects_sub')}
          onPress={() => router.push('/durable-objects' as any)}
        />
        <ListRow
          icon="database"
          title={t('settings.hyperdrive')}
          subtitle={t('settings.hyperdrive_sub')}
          onPress={() => router.push('/hyperdrive' as any)}
        />
        <ListRow
          icon="database"
          title={t('settings.vectorize')}
          subtitle={t('settings.vectorize_sub')}
          onPress={() => router.push('/vectorize' as any)}
        />
        <ListRow
          icon="search"
          title={t('settings.autorag')}
          subtitle={t('settings.autorag_sub')}
          onPress={() => router.push('/autorag' as any)}
        />
        <ListRow
          icon="lock"
          title={t('settings.secrets_store')}
          subtitle={t('settings.secrets_store_sub')}
          onPress={() => router.push('/secrets-store' as any)}
        />
        <ListRow
          icon="code"
          title={t('settings.wfp')}
          subtitle={t('settings.wfp_sub')}
          onPress={() => router.push('/workers-for-platforms' as any)}
        />
        <ListRow
          icon="shield"
          title={t('settings.access_apps')}
          subtitle={t('settings.access_apps_sub')}
          onPress={() => router.push('/access-apps' as any)}
        />
        <ListRow
          icon="server"
          title={t('settings.infra_targets')}
          subtitle={t('settings.infra_targets_sub')}
          onPress={() => router.push('/infra-targets' as any)}
        />
        <ListRow
          icon="shield"
          title={t('settings.gateway_rules')}
          subtitle={t('settings.gateway_rules_sub')}
          onPress={() => router.push('/gateway-rules' as any)}
        />
        <ToggleRow
          icon="pageview"
          title={t('settings.share_usage')}
          subtitle={t('settings.share_usage_sub')}
          value={analyticsOn}
          onValueChange={toggleAnalytics}
        />
      </Group>

      {/* Monitoring */}
      <SectionHeader title={t('settings.monitoring_section')} />
      <Group>
        <ListRow
          icon="activity"
          title={t('settings.monitoring')}
          subtitle={t('settings.monitoring_sub')}
          onPress={() => router.push('/monitoring' as any)}
        />
      </Group>

      {/* Account Info */}
      <SectionHeader
        title={t('settings.account_info')}
        action={
          <TouchableOpacity onPress={() => setShowSensitive(!showSensitive)} hitSlop={10} accessibilityRole="button">
            <Icon name={showSensitive ? 'pageview' : 'lock-outline'} size={18} color={colors.textSecondary} />
          </TouchableOpacity>
        }
      />
      <Group>
        <ValueRow
          label={t('settings.email')}
          value={showSensitive ? (user?.email ?? '-') : maskEmail(user?.email ?? '-')}
        />
        <ValueRow
          label={t('settings.username')}
          value={showSensitive ? (user?.username ?? '-') : maskId(user?.username ?? '-')}
        />
        <ValueRow
          label={t('settings.auth_method')}
          value={authConfig?.method === 'oauth' ? 'Cloudflare OAuth' : authConfig?.method === 'token' ? 'API Token (Bearer)' : 'Global API Key'}
        />
      </Group>

      {/* API Info */}
      <SectionHeader title={t('settings.api_info')} />
      <Group>
        <ValueRow label={t('settings.rate_limit')} value="1,200 req / 5 min" />
        <ValueRow label={t('settings.api_version')} value="v4" />
      </Group>

      {/* About */}
      <SectionHeader title={t('settings.about_section')} />
      <Group>
        <ListRow
          icon="info"
          title={t('settings.about_app')}
          subtitle={t('settings.about_app_sub')}
          onPress={() => router.push('/about')}
        />
        <ListRow
          icon="clock"
          title={t('settings.changelog')}
          subtitle={t('settings.changelog_sub')}
          onPress={() => router.push('/changelog')}
        />
        <ListRow
          icon="download"
          title={t('settings.check_updates')}
          subtitle={t('settings.check_updates_sub')}
          onPress={() => startPlayUpdate()}
        />
        <ListRow
          icon="mail"
          title={t('report.menu_title')}
          subtitle={t('report.menu_sub')}
          onPress={() => promptReport(t)}
        />
        <ListRow
          icon="star"
          title={t('settings.rate_us')}
          subtitle={t('settings.rate_us_sub')}
          onPress={() => openReview()}
        />
      </Group>

      {/* Development builds only: sample data for screenshots. Not translated on purpose. */}
      {__DEV__ && (
        <>
          <SectionHeader title="Developer" />
          <Group>
            <ToggleRow
              icon="developer-mode"
              title="Demo data"
              subtitle="Show sample zones instead of the real account"
              value={demoMode}
              onValueChange={toggleDemo}
            />
          </Group>
        </>
      )}

      {/* Sign out */}
      <Group style={{ marginTop: Spacing.xl }}>
        <MenuItem
          icon="logout"
          title={t('settings.logout')}
          onPress={handleLogout}
          danger
          trailing={null}
        />
      </Group>

      <Text style={[styles.version, { color: colors.textTertiary }]}>
        CloudFlare Mobile v{require('@/services/version-check').CURRENT_VERSION}
      </Text>

      {/* Language picker */}
      <Sheet visible={langOpen} onClose={() => setLangOpen(false)} title={t('settings.language')}>
        <Group>
          {LANGUAGES.map((lang) => {
            const isSelected = currentLang === lang.code;
            return (
              <ListRow
                key={lang.code}
                title={lang.name}
                leading={
                  <View style={[styles.langCode, { backgroundColor: colors.surfaceSecondary }]}>
                    <Text style={[styles.langCodeText, { color: colors.text }]}>{lang.flag}</Text>
                  </View>
                }
                onPress={() => switchLanguage(lang.code)}
                chevron={false}
                trailing={isSelected ? <Icon name="check-circle" size={20} color={colors.primary} /> : undefined}
              />
            );
          })}
        </Group>
      </Sheet>

      <AiPaywall visible={showAiPaywall} onClose={() => setShowAiPaywall(false)} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: Spacing.lg, paddingBottom: Spacing.xxxl },

  accountCard: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md },
  accountName: { fontSize: FontSize.lg, fontWeight: '500' },
  accountEmail: { fontSize: FontSize.sm, marginTop: 2 },

  planCard: { marginTop: Spacing.sm },
  plan: { gap: Spacing.md },
  planTop: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md },
  planTitle: { flex: 1, fontSize: FontSize.md, fontWeight: '500', lineHeight: 20 },
  planActions: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: Spacing.md },
  planLinkWrap: { minHeight: 34, justifyContent: 'center' },
  planLink: { fontSize: FontSize.sm, textDecorationLine: 'underline' },
  planUsage: { flex: 1, fontSize: FontSize.xs, lineHeight: 15 },

  langCode: {
    width: 36,
    height: 36,
    borderRadius: Radius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  langCodeText: { fontSize: FontSize.xs, fontWeight: '600', letterSpacing: 0.3 },

  version: { textAlign: 'center', fontSize: FontSize.xs, marginTop: Spacing.xxl },
});
