import { useState } from 'react';
import {
  StyleSheet, View, Text, ScrollView, TouchableOpacity, KeyboardAvoidingView,
  Platform, Alert, Modal, Linking,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useVideoPlayer, VideoView } from 'expo-video';
import { useAuth } from '@/contexts/auth';
import { Icon, IconName } from '@/components/ui/icon';
import { useTheme } from '@/hooks/use-theme';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { CF, Spacing, FontSize, Radius } from '@/constants/theme';
import { AuthMethod } from '@/services/types';

const VIDEO_TOKEN = require('@/assets/video/generate-api-token.mp4');
const VIDEO_GLOBAL = require('@/assets/video/get-global-api-key.mp4');

interface FeaturePoint {
  icon: IconName;
  text: string;
}

export default function LoginScreen() {
  const { t } = useTranslation();
  const { colors, isDark } = useTheme();
  const { login } = useAuth();
  const { add } = useLocalSearchParams<{ add?: string }>();
  const isAddMode = add === '1';

  const [method, setMethod] = useState<AuthMethod>('token');
  const [apiToken, setApiToken] = useState('');
  const [globalKey, setGlobalKey] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  const player = useVideoPlayer(method === 'token' ? VIDEO_TOKEN : VIDEO_GLOBAL, (p) => {
    p.loop = true;
    p.muted = false;
  });

  const openVideo = () => {
    setShowVideo(true);
    player.play();
  };

  const closeVideo = () => {
    player.pause();
    setShowVideo(false);
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
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }} edges={['bottom']}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Hero Section */}
          <View style={[styles.hero, { backgroundColor: isDark ? '#1A1F2E' : CF.orange }]}>
            <View style={styles.heroContent}>
              <View style={[styles.logoBadge, { backgroundColor: 'rgba(255,255,255,0.2)' }]}>
                <Icon name="cloudflare" size={36} color="#FFFFFF" />
              </View>
              <Text style={styles.heroTitle}>CloudFlare</Text>
              <Text style={styles.heroSubtitle}>Mobile</Text>
              <Text style={styles.heroTagline}>{t('auth.tagline')}</Text>
            </View>

            {/* Feature pills inside hero */}
            <View style={styles.featureRow}>
              {features.map((f, i) => (
                <View key={i} style={styles.featurePill}>
                  <Icon name={f.icon} size={12} color="rgba(255,255,255,0.95)" />
                  <Text style={styles.featureText}>{f.text}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Form Card */}
          <View style={[styles.formCard, { backgroundColor: colors.surface, borderColor: colors.borderLight }]}>
            <Text style={[styles.formTitle, { color: colors.text }]}>{t('auth.sign_in')}</Text>
            <Text style={[styles.formSubtitle, { color: colors.textSecondary }]}>
              {t('auth.choose_method')}
            </Text>

            {/* Method Toggle — segmented control */}
            <View style={[styles.segmented, { backgroundColor: colors.surfaceSecondary }]}>
              <TouchableOpacity
                onPress={() => setMethod('token')}
                style={[
                  styles.segmentBtn,
                  method === 'token' && { backgroundColor: colors.surface, shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 4, shadowOffset: { width: 0, height: 1 }, elevation: 2 },
                ]}
                activeOpacity={0.7}
              >
                <Icon name="key" size={14} color={method === 'token' ? colors.primary : colors.textTertiary} />
                <Text style={[styles.segmentText, { color: method === 'token' ? colors.primary : colors.textSecondary }]}>
                  API Token
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setMethod('global_key')}
                style={[
                  styles.segmentBtn,
                  method === 'global_key' && { backgroundColor: colors.surface, shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 4, shadowOffset: { width: 0, height: 1 }, elevation: 2 },
                ]}
                activeOpacity={0.7}
              >
                <Icon name="lock" size={14} color={method === 'global_key' ? colors.primary : colors.textTertiary} />
                <Text style={[styles.segmentText, { color: method === 'global_key' ? colors.primary : colors.textSecondary }]}>
                  Global Key
                </Text>
              </TouchableOpacity>
            </View>

            {/* Recommended Badge */}
            {method === 'token' && (
              <View style={[styles.recommendedBadge, { backgroundColor: colors.success + '15' }]}>
                <Icon name="check-circle" size={12} color={colors.success} />
                <Text style={[styles.recommendedText, { color: colors.success }]}>
                  {t('auth.recommended')}
                </Text>
              </View>
            )}
            {method === 'global_key' && (
              <View style={[styles.warningBadge, { backgroundColor: colors.warning + '15' }]}>
                <Icon name="warning" size={12} color={colors.warning} />
                <Text style={[styles.recommendedText, { color: colors.warning }]}>
                  {t('auth.full_access_warning')}
                </Text>
              </View>
            )}

            {/* Inputs */}
            {method === 'token' ? (
              <Input
                label={t('auth.api_token')}
                placeholder={t('auth.token_placeholder')}
                value={apiToken}
                onChangeText={setApiToken}
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
              />
            ) : (
              <View style={{ gap: Spacing.md }}>
                <Input
                  label={t('auth.email')}
                  placeholder="user@example.com"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
                <Input
                  label={t('auth.global_key')}
                  placeholder={t('auth.global_key_placeholder')}
                  value={globalKey}
                  onChangeText={setGlobalKey}
                  secureTextEntry
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>
            )}

            <Button
              title={loading ? t('auth.verifying') : t('auth.login')}
              onPress={handleLogin}
              loading={loading}
              size="lg"
              style={{ marginTop: Spacing.xs }}
            />

            {/* Help row */}
            <View style={styles.helpRow}>
              <View style={[styles.divider, { backgroundColor: colors.borderLight }]} />
              <Text style={[styles.helpLabel, { color: colors.textTertiary }]}>{t('auth.need_help')}</Text>
              <View style={[styles.divider, { backgroundColor: colors.borderLight }]} />
            </View>

            {/* Help cards */}
            <View style={styles.helpCardRow}>
              <TouchableOpacity
                style={[styles.helpCard, { backgroundColor: colors.primary + '10', borderColor: colors.primary + '30' }]}
                onPress={openVideo}
                activeOpacity={0.7}
              >
                <View style={[styles.helpCardIcon, { backgroundColor: colors.primary }]}>
                  <Icon name="pageview" size={18} color="#FFF" />
                </View>
                <Text style={[styles.helpCardTitle, { color: colors.primary }]}>
                  {t('auth.watch_tutorial')}
                </Text>
                <Text style={[styles.helpCardSub, { color: colors.textSecondary }]}>
                  {t('auth.tutorial_hint')}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.helpCard, { backgroundColor: colors.info + '10', borderColor: colors.info + '30' }]}
                onPress={() => Linking.openURL(dashboardUrl)}
                activeOpacity={0.7}
              >
                <View style={[styles.helpCardIcon, { backgroundColor: colors.info }]}>
                  <Icon name="link" size={18} color="#FFF" />
                </View>
                <Text style={[styles.helpCardTitle, { color: colors.info }]}>
                  {t('auth.open_dashboard')}
                </Text>
                <Text style={[styles.helpCardSub, { color: colors.textSecondary }]}>
                  {t('auth.dashboard_hint')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Privacy / Open Source Notice */}
          <TouchableOpacity
            style={[styles.privacyNotice, { backgroundColor: colors.success + '10', borderColor: colors.success + '30' }]}
            onPress={() => Linking.openURL('https://github.com/imtaqin/CFMobile')}
            activeOpacity={0.7}
          >
            <Icon name="shield" size={16} color={colors.success} />
            <Text style={[styles.privacyNoticeText, { color: colors.textSecondary }]}>
              {t('auth.privacy_notice')}
            </Text>
          </TouchableOpacity>

          <Text style={[styles.footerText, { color: colors.textTertiary }]}>
            {t('auth.unofficial_notice')}
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Video Tutorial Modal */}
      <Modal
        visible={showVideo}
        animationType="slide"
        onRequestClose={closeVideo}
        transparent={false}
      >
        <SafeAreaView style={{ flex: 1, backgroundColor: '#000' }}>
          <View style={styles.videoHeader}>
            <Text style={styles.videoTitle}>
              {method === 'token' ? t('auth.tutorial_token') : t('auth.tutorial_global')}
            </Text>
            <TouchableOpacity onPress={closeVideo} style={styles.videoClose} hitSlop={10}>
              <Icon name="close" size={28} color="#FFF" />
            </TouchableOpacity>
          </View>
          <VideoView
            player={player}
            style={styles.video}
            contentFit="contain"
            allowsFullscreen
            allowsPictureInPicture
          />
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flexGrow: 1,
  },

  // Hero
  hero: {
    paddingTop: 56,
    paddingBottom: Spacing.xxl,
    paddingHorizontal: Spacing.xxl,
    borderBottomLeftRadius: Radius.xl * 1.5,
    borderBottomRightRadius: Radius.xl * 1.5,
  },
  heroContent: {
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  logoBadge: {
    width: 76,
    height: 76,
    borderRadius: Radius.xl,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.md,
  },
  heroTitle: {
    color: '#FFFFFF',
    fontSize: 30,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  heroSubtitle: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 22,
    fontWeight: '300',
    letterSpacing: 0.5,
    marginTop: -4,
  },
  heroTagline: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: FontSize.sm,
    marginTop: Spacing.sm,
    textAlign: 'center',
    paddingHorizontal: Spacing.lg,
  },
  featureRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: Spacing.xs,
  },
  featurePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: Radius.full,
    backgroundColor: 'rgba(255,255,255,0.18)',
  },
  featureText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '600',
  },

  // Form
  formCard: {
    margin: Spacing.lg,
    marginTop: -Spacing.xl,
    padding: Spacing.xxl,
    borderRadius: Radius.xl,
    borderWidth: 1,
    gap: Spacing.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 6,
  },
  formTitle: {
    fontSize: FontSize.xxl,
    fontWeight: '700',
  },
  formSubtitle: {
    fontSize: FontSize.sm,
    marginTop: -Spacing.sm,
  },
  segmented: {
    flexDirection: 'row',
    padding: 4,
    borderRadius: Radius.md,
  },
  segmentBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: Spacing.sm + 2,
    borderRadius: Radius.sm,
  },
  segmentText: {
    fontSize: FontSize.sm,
    fontWeight: '600',
  },
  recommendedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 4,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: Radius.full,
    marginTop: -Spacing.sm,
  },
  warningBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 4,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: Radius.full,
    marginTop: -Spacing.sm,
  },
  recommendedText: {
    fontSize: 11,
    fontWeight: '700',
  },

  // Help
  helpRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginTop: Spacing.sm,
  },
  divider: {
    flex: 1,
    height: 1,
  },
  helpLabel: {
    fontSize: FontSize.xs,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  helpCardRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  helpCard: {
    flex: 1,
    padding: Spacing.md,
    borderRadius: Radius.md,
    borderWidth: 1,
    gap: 6,
  },
  helpCardIcon: {
    width: 36,
    height: 36,
    borderRadius: Radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 2,
  },
  helpCardTitle: {
    fontSize: FontSize.sm,
    fontWeight: '700',
  },
  helpCardSub: {
    fontSize: 11,
    lineHeight: 14,
  },

  privacyNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginHorizontal: Spacing.lg,
    padding: Spacing.md,
    borderRadius: Radius.md,
    borderWidth: 1,
  },
  privacyNoticeText: {
    flex: 1,
    fontSize: FontSize.xs,
    lineHeight: 16,
  },

  footerText: {
    textAlign: 'center',
    fontSize: FontSize.xs,
    paddingHorizontal: Spacing.xxl,
    paddingVertical: Spacing.lg,
    lineHeight: 16,
  },

  // Video modal
  videoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
  },
  videoTitle: {
    flex: 1,
    color: '#FFF',
    fontSize: FontSize.lg,
    fontWeight: '700',
  },
  videoClose: {
    padding: Spacing.sm,
  },
  video: {
    flex: 1,
    width: '100%',
  },
});
