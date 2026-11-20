import { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';

import { useAuth } from '@/contexts/auth';
import { useTheme } from '@/hooks/use-theme';
import { Button } from '@/components/ui/button';
import { BrandMark } from '@/components/ui/brand';
import { Banner } from '@/components/ui/kit';
import { completeOAuth } from '@/services/oauth';
import { logError } from '@/services/error-log';
import { Spacing, FontSize } from '@/constants/theme';

/**
 * Landing route for `cfmobile://oauth/callback`. Cloudflare's consent page
 * redirects here (through the https hop) with a one-time code, which this
 * screen swaps for tokens and then signs the user in.
 */
export default function OAuthCallbackScreen() {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const { login } = useAuth();
  const { code, state, error, error_description } = useLocalSearchParams<{
    code?: string;
    state?: string;
    error?: string;
    error_description?: string;
  }>();
  const [failure, setFailure] = useState<string | null>(null);
  // The code is single use; a re-render must not try to redeem it twice.
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;

    (async () => {
      try {
        if (error) throw new Error(error_description || error);
        if (!code || !state) throw new Error(t('auth.oauth_failed'));
        // null means the login screen's openAuthSessionAsync result already
        // redeemed this code — the sign-in is done, just land on the app.
        const res = await completeOAuth(code, state);
        if (res) await login(res.config);
        if (router.canDismiss()) router.dismissAll();
        router.replace('/(tabs)');
      } catch (e: any) {
        const message = e?.response?.data?.errors?.[0]?.message ?? e?.message ?? t('auth.oauth_failed');
        logError('auth', message, 'oauth callback');
        setFailure(message);
      }
    })();
  }, [code, state, error, error_description, login, t]);

  const backToLogin = () => {
    if (router.canGoBack()) router.back();
    else router.replace('/login');
  };

  return (
    <SafeAreaView style={[styles.root, { backgroundColor: colors.background }]}>
      <BrandMark size={72} />
      {failure ? (
        <View style={styles.block}>
          <Text style={[styles.title, { color: colors.text }]}>{t('auth.oauth_failed')}</Text>
          <Banner message={failure} />
          <Button title={t('auth.oauth_retry')} onPress={backToLogin} size="lg" />
        </View>
      ) : (
        <View style={styles.block}>
          <ActivityIndicator color={colors.primary} />
          <Text style={[styles.title, { color: colors.text }]}>{t('auth.oauth_signing_in')}</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: Spacing.xxl, gap: Spacing.xxl },
  block: { alignSelf: 'stretch', gap: Spacing.lg },
  title: { fontSize: FontSize.lg, fontWeight: '500', textAlign: 'center' },
});
