import { useState } from 'react';
import {
  StyleSheet, View, Text, ScrollView, TouchableOpacity, KeyboardAvoidingView,
  Platform, Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/contexts/auth';
import { Icon } from '@/components/ui/icon';
import { useTheme } from '@/hooks/use-theme';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { CF, Spacing, FontSize, Radius } from '@/constants/theme';
import { AuthMethod } from '@/services/types';

export default function LoginScreen() {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const { login } = useAuth();

  const [method, setMethod] = useState<AuthMethod>('token');
  const [apiToken, setApiToken] = useState('');
  const [globalKey, setGlobalKey] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

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
      router.replace('/(tabs)');
    } catch (e: any) {
      const msg = e?.response?.data?.errors?.[0]?.message ?? e?.message ?? t('auth.error');
      Alert.alert(t('common.error'), msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <View style={[styles.logoWrap, { backgroundColor: CF.orange }]}>
            <Icon name="cloudflare" size={40} color="#FFFFFF" />
          </View>
          <Text style={[styles.appName, { color: colors.text }]}>CloudFlare Mobile</Text>
          <Text style={[styles.tagline, { color: colors.textSecondary }]}>
            {t('auth.tagline')}
          </Text>
        </View>

        <View style={[styles.card, { backgroundColor: colors.surface }]}>
          {/* Auth method toggle */}
          <View style={[styles.toggle, { backgroundColor: colors.surfaceSecondary }]}>
            <TouchableOpacity
              onPress={() => setMethod('token')}
              style={[
                styles.toggleBtn,
                method === 'token' && { backgroundColor: colors.surface },
              ]}
            >
              <Text style={[styles.toggleText, { color: method === 'token' ? colors.primary : colors.textSecondary }]}>
                API Token
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setMethod('global_key')}
              style={[
                styles.toggleBtn,
                method === 'global_key' && { backgroundColor: colors.surface },
              ]}
            >
              <Text style={[styles.toggleText, { color: method === 'global_key' ? colors.primary : colors.textSecondary }]}>
                Global Key
              </Text>
            </TouchableOpacity>
          </View>

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
          />

          <View style={styles.infoBox}>
            <Icon name="info" size={16} color={colors.info} />
            <Text style={[styles.infoText, { color: colors.textSecondary }]}>
              {method === 'token' ? t('auth.token_info') : t('auth.global_key_info')}
            </Text>
          </View>

          <View style={[styles.stepsBox, { backgroundColor: colors.surfaceSecondary }]}>
            <Text style={[styles.stepsText, { color: colors.textSecondary }]}>
              {method === 'token' ? t('auth.token_steps') : t('auth.global_key_steps')}
            </Text>
          </View>
        </View>

        <Text style={[styles.rateLimit, { color: colors.textTertiary }]}>
          {t('auth.rate_limit_notice')}
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: Spacing.xxl,
  },
  header: {
    alignItems: 'center',
    marginBottom: Spacing.xxxl,
  },
  logoWrap: {
    width: 72,
    height: 72,
    borderRadius: Radius.xl,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.lg,
  },
  appName: {
    fontSize: FontSize.xxl,
    fontWeight: '700',
  },
  tagline: {
    fontSize: FontSize.md,
    marginTop: Spacing.xs,
  },
  card: {
    borderRadius: Radius.lg,
    padding: Spacing.xxl,
    gap: Spacing.lg,
    shadowColor: 'rgba(0,0,0,0.08)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 3,
  },
  toggle: {
    flexDirection: 'row',
    borderRadius: Radius.md,
    padding: 3,
  },
  toggleBtn: {
    flex: 1,
    paddingVertical: Spacing.sm,
    borderRadius: Radius.sm,
    alignItems: 'center',
  },
  toggleText: {
    fontSize: FontSize.sm,
    fontWeight: '600',
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.sm,
  },
  infoText: {
    flex: 1,
    fontSize: FontSize.xs,
    lineHeight: 16,
  },
  stepsBox: {
    borderRadius: Radius.md,
    padding: Spacing.md,
  },
  stepsText: {
    fontSize: FontSize.xs,
    lineHeight: 18,
  },
  rateLimit: {
    textAlign: 'center',
    fontSize: FontSize.xs,
    marginTop: Spacing.lg,
    lineHeight: 16,
  },
});
