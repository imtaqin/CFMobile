import { useState } from 'react';
import {
  StyleSheet, View, Text, ScrollView, TouchableOpacity, KeyboardAvoidingView,
  Platform, Alert, Linking,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useTranslation } from 'react-i18next';
import * as WebBrowser from 'expo-web-browser';
import { beginOAuth, OAUTH_APP_RETURN } from '@/services/oauth';
import { useAuth } from '@/contexts/auth';
import { Icon, IconName } from '@/components/ui/icon';
import { useTheme } from '@/hooks/use-theme';
import { Button } from '@/components/ui/button';
import { BrandGradient, BrandMark } from '@/components/ui/brand';
import { SectionHeader } from '@/components/ui/section-header';
import { Banner, Field, Group, ListRow } from '@/components/ui/kit';
import { Spacing, FontSize, Radius } from '@/constants/theme';
import { AuthMethod } from '@/services/types';


interface FeaturePoint {
  icon: IconName;
  text: string;
}

const METHODS: { value: AuthMethod; label: string }[] = [
  { value: 'token', label: 'API Token' },
  { value: 'global_key', label: 'Global Key' },
];

// Cloudflare's own guides for the two manual sign-in methods.
const GUIDE_TOKEN = 'https://developers.cloudflare.com/fundamentals/api/get-started/create-token/';
const GUIDE_GLOBAL = 'https://developers.cloudflare.com/fundamentals/api/get-started/keys/';

export default function LoginScreen() {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const { login } = useAuth();
  const { add } = useLocalSearchParams<{ add?: string }>();
  const isAddMode = add === '1';

  const [method, setMethod] = useState<AuthMethod>('token');
  const [apiToken, setApiToken] = useState('');
  const [globalKey, setGlobalKey] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [oauthLoading, setOauthLoading] = useState(false);
  // Token and Global Key sign-in stay available, folded away behind "Advanced".
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Opens Cloudflare's consent page. The redirect lands on app/oauth/callback, which finishes the login.
  const startOAuth = async () => {
    setOauthLoading(true);
    try {
      const url = await beginOAuth(isAddMode);
      await WebBrowser.openAuthSessionAsync(url, OAUTH_APP_RETURN);
    } catch (e: any) {
      Alert.alert(t('common.error'), e?.message ?? t('auth.oauth_failed'));
    } finally {
      setOauthLoading(false);
    }
  };

  const handleLogin = async () => {
    setLoading(true);
    try {
      if (method === 'token') {
        if (!apiToken.trim()) {
          Alert.alert(t('common.error'), t('auth.token_required'));
          return;
        }
        await login({ method: 'token', apiToken: apiToken.replace(/\s+/g, '') });
      } else {
        if (!email.trim() || !globalKey.trim()) {
          Alert.alert(t('common.error'), t('auth.fields_required'));
          return;
        }
        await login({ method: 'global_key', globalKey: globalKey.replace(/\s+/g, ''), email: email.trim() });
      }
      if (isAddMode && router.canGoBack()) router.back();
      else router.replace('/(tabs)');
    } catch (e: any) {
      const msg = e?.response?.data?.errors?.[0]?.message ?? e?.message ?? t('auth.error');
      Alert.alert(t('common.error'), msg);
    } finally {
      setLoading(false);
    }
  };

  const dashboardUrl = 'https://dash.cloudflare.com/profile/api-tokens';

  const features: FeaturePoint[] = [
    { icon: 'lock', text: t('auth.feature_secure') },
    { icon: 'zap', text: t('auth.feature_fast') },
    { icon: 'shield', text: t('auth.feature_private') },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar style="light" />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, paddingBottom: insets.bottom + Spacing.xxxl }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          {/* Hero */}
          <View style={[styles.hero, { paddingTop: insets.top + Spacing.xl }]}>
            <BrandGradient />
            {isAddMode && router.canGoBack() && (
              <TouchableOpacity
                onPress={() => router.back()}
                style={[styles.back, { top: insets.top + Spacing.md }]}
                hitSlop={8}
                accessibilityRole="button"
                accessibilityLabel="Back"
              >
                <Icon name="arrow-left" size={18} color="#FFFFFF" />
              </TouchableOpacity>
            )}
            <View style={styles.mark}>
              <BrandMark bare size={46} />
            </View>
            <Text style={styles.heroTitle}>CloudFlare Mobile</Text>
            <Text style={styles.heroTagline}>{t('auth.tagline')}</Text>

            <View style={styles.featureRow}>
              {features.map((f) => (
                <View key={f.icon} style={styles.feature}>
                  <Icon name={f.icon} size={12} color="#FFFFFF" />
                  <Text style={styles.featureText}>{f.text}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.body}>
            {/* Sign in card, pulled up over the hero */}
            <View style={[styles.form, { backgroundColor: colors.surface, borderColor: colors.borderLight }]}>
              <Text style={[styles.formTitle, { color: colors.text }]}>{t('auth.sign_in')}</Text>
              <Text style={[styles.formSubtitle, { color: colors.textSecondary }]}>{t('auth.oauth_hint')}</Text>

              <Button
                title={t('auth.oauth_button')}
                onPress={startOAuth}
                loading={oauthLoading}
                size="lg"
                icon={<BrandMark bare size={22} />}
                style={styles.oauth}
              />

              <TouchableOpacity
                onPress={() => setShowAdvanced((v) => !v)}
                activeOpacity={0.7}
                accessibilityRole="button"
                accessibilityState={{ expanded: showAdvanced }}
                style={[styles.advanced, { borderTopColor: colors.border }]}
              >
                <View style={styles.advancedText}>
                  <Text style={[styles.advancedTitle, { color: colors.text }]}>{t('auth.advanced')}</Text>
                  <Text style={[styles.advancedHint, { color: colors.textSecondary }]}>{t('auth.advanced_hint')}</Text>
                </View>
                <Icon name={showAdvanced ? 'chevron-up' : 'chevron-down'} size={18} color={colors.textSecondary} />
              </TouchableOpacity>

              {showAdvanced && (
              <>
              <View style={[styles.segment, { backgroundColor: colors.surfaceSecondary }]}>
                {METHODS.map((m) => {
                  const active = m.value === method;
                  return (
                    <TouchableOpacity
                      key={m.value}
                      onPress={() => setMethod(m.value)}
                      activeOpacity={0.8}
                      accessibilityRole="button"
                      accessibilityState={{ selected: active }}
                      style={[styles.segmentItem, active && { backgroundColor: colors.primary }]}
                    >
                      <Text style={[styles.segmentText, { color: active ? '#FFFFFF' : colors.textSecondary }]}>
                        {m.label}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>

              {method === 'token' ? (
                <View style={styles.hint}>
                  <Icon name="check-circle" size={14} color={colors.success} />
                  <Text style={[styles.hintText, { color: colors.textSecondary }]}>{t('auth.recommended')}</Text>
                </View>
              ) : (
                <View style={styles.warning}>
                  <Banner tone="warning" message={t('auth.full_access_warning')} />
                </View>
              )}

              {method === 'token' ? (
                <Field
                  label={t('auth.api_token')}
                  placeholder={t('auth.token_placeholder')}
                  value={apiToken}
                  onChangeText={setApiToken}
                  secureTextEntry
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              ) : (
                <>
                  <Field
                    label={t('auth.email')}
                    placeholder="user@example.com"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                  <Field
                    label={t('auth.global_key')}
                    placeholder={t('auth.global_key_placeholder')}
                    value={globalKey}
                    onChangeText={setGlobalKey}
                    secureTextEntry
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                </>
              )}

              <Button
                title={loading ? t('auth.verifying') : t('auth.login')}
                onPress={handleLogin}
                loading={loading}
                size="lg"
                variant="secondary"
                style={styles.submit}
              />
              </>
              )}
            </View>

            {/* Help with finding a token: only relevant to the advanced path */}
            {showAdvanced && (
            <>
            <SectionHeader title={t('auth.need_help')} />
            <Group>
              <ListRow
                icon="pageview"
                title={method === 'token' ? t('auth.tutorial_token') : t('auth.tutorial_global')}
                subtitle={t('auth.guide_hint')}
                onPress={() => Linking.openURL(method === 'token' ? GUIDE_TOKEN : GUIDE_GLOBAL)}
              />
              <ListRow
                icon="link"
                title={t('auth.open_dashboard')}
                subtitle={t('auth.dashboard_hint')}
                onPress={() => Linking.openURL(dashboardUrl)}
              />
            </Group>
            </>
            )}

            {/* Privacy / open source notice */}
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.privacy}
              onPress={() => Linking.openURL('https://github.com/imtaqin/CFMobile')}
            >
              <Icon name="shield" size={14} color={colors.textTertiary} />
              <Text style={[styles.privacyText, { color: colors.textSecondary }]}>{t('auth.privacy_notice')}</Text>
            </TouchableOpacity>

            <Text style={[styles.footerText, { color: colors.textTertiary }]}>
              {t('auth.unofficial_notice')}
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

// How far the sign-in card overlaps the hero.
const OVERLAP = 40;

const styles = StyleSheet.create({
  // Hero
  hero: {
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
    paddingBottom: OVERLAP + Spacing.xxl,
    backgroundColor: '#F6821F',
    overflow: 'hidden',
  },
  back: {
    position: 'absolute',
    left: Spacing.lg,
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    zIndex: 1,
  },
  mark: {
    width: 76,
    height: 76,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.35)',
    marginBottom: Spacing.lg,
  },
  heroTitle: { color: '#FFFFFF', fontSize: 26, fontWeight: '600', letterSpacing: -0.6 },
  heroTagline: {
    color: 'rgba(255,255,255,0.92)',
    fontSize: FontSize.md,
    marginTop: Spacing.xs,
    textAlign: 'center',
  },
  featureRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: Spacing.sm,
    marginTop: Spacing.lg,
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    height: 28,
    paddingHorizontal: Spacing.md,
    borderRadius: Radius.full,
    backgroundColor: 'rgba(255,255,255,0.18)',
  },
  featureText: { color: '#FFFFFF', fontSize: FontSize.xs, fontWeight: '500' },

  // Form
  body: { paddingHorizontal: Spacing.lg },
  form: {
    marginTop: -OVERLAP,
    borderRadius: Radius.xl,
    borderWidth: 1,
    padding: Spacing.xl,
    marginBottom: Spacing.sm,
  },
  formTitle: { fontSize: FontSize.xl, fontWeight: '600', letterSpacing: -0.3 },
  formSubtitle: { fontSize: FontSize.sm, marginTop: 2 },
  oauth: { marginTop: Spacing.lg },
  advanced: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    marginTop: Spacing.xl,
    paddingTop: Spacing.lg,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  advancedText: { flex: 1 },
  advancedTitle: { fontSize: FontSize.md, fontWeight: '500' },
  advancedHint: { fontSize: FontSize.sm, marginTop: 2 },
  segment: {
    flexDirection: 'row',
    borderRadius: Radius.full,
    padding: 4,
    marginTop: Spacing.lg,
  },
  segmentItem: {
    flex: 1,
    height: 38,
    borderRadius: Radius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  segmentText: { fontSize: FontSize.sm, fontWeight: '600' },
  hint: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: Spacing.md },
  hintText: { flex: 1, fontSize: FontSize.sm },
  warning: { marginTop: Spacing.md },
  submit: { marginTop: Spacing.xl },

  // Notices
  privacy: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.sm,
    marginTop: Spacing.lg,
    paddingHorizontal: Spacing.xs,
  },
  privacyText: { flex: 1, fontSize: FontSize.xs, lineHeight: 16 },
  footerText: {
    textAlign: 'center',
    fontSize: FontSize.xs,
    lineHeight: 16,
    paddingHorizontal: Spacing.xl,
    marginTop: Spacing.lg,
  },
});
