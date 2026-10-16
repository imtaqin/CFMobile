import { DarkTheme, DefaultTheme, ThemeProvider as NavThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { loadLanguage } from '@/i18n';

import { useEffect } from 'react';
import { AuthProvider } from '@/contexts/auth';
import { ThemeProvider, useThemeContext } from '@/contexts/theme';
import { Platform } from 'react-native';
import { LockGate } from '@/components/ui/lock-gate';
import { applyScreenshotBlock } from '@/services/app-lock';
import { refreshShortcuts } from '@/widgets/sync';
import { initPremium } from '@/services/premium';
import { initAdReward } from '@/services/ad-reward';
import { refreshQuota } from '@/services/ai-subscription';
import { syncMonitoring } from '@/services/monitor-task';
import { track } from '@/services/analytics';
import { checkPlayUpdate } from '@/services/play-update';
import { CF, Colors } from '@/constants/theme';
import { installGlobalErrorLog } from '@/services/error-log';
import { ErrorScreen } from '@/components/ui/error-screen';

// Expo Router renders this in place of the layout when a screen throws while rendering.
export function ErrorBoundary({ error, retry }: { error: Error; retry: () => void }) {
  return <ErrorScreen error={error} retry={retry} />;
}

// Headers share the canvas colour, so a screen reads as one surface with cards on it.
const CFLightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: CF.orange,
    background: Colors.light.background,
    card: Colors.light.background,
    text: Colors.light.text,
    border: Colors.light.border,
  },
};

const CFDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: CF.orange,
    background: Colors.dark.background,
    card: Colors.dark.background,
    text: Colors.dark.text,
    border: Colors.dark.border,
  },
};

function AppContent() {
  const { resolved } = useThemeContext();

  return (
    <NavThemeProvider value={resolved === 'dark' ? CFDarkTheme : CFLightTheme}>
      <LockGate>
        <Stack
          screenOptions={{
            headerShown: false,
            headerShadowVisible: false,
            headerTintColor: Colors[resolved].text,
            headerTitleStyle: { fontSize: 18, fontWeight: '500' },
          }}
        >
          <Stack.Screen name="search" options={{ animation: 'fade', headerShown: true }} />
          <Stack.Screen name="onboarding" options={{ animation: 'fade' }} />
          <Stack.Screen name="login" options={{ animation: 'fade' }} />
          <Stack.Screen name="oauth/callback" options={{ animation: 'fade' }} />
          <Stack.Screen name="(tabs)" />
          <Stack.Screen
            name="zone/[id]"
            options={{ animation: 'slide_from_right' }}
          />
          <Stack.Screen name="about" options={{ animation: 'slide_from_right' }} />
          <Stack.Screen name="changelog" options={{ animation: 'slide_from_right' }} />
          <Stack.Screen name="accounts" options={{ animation: 'slide_from_right', headerShown: true }} />
          <Stack.Screen name="monitoring" options={{ animation: 'slide_from_right', headerShown: true }} />
          <Stack.Screen name="audit-logs" options={{ animation: 'slide_from_right', headerShown: true }} />
          <Stack.Screen name="history" options={{ animation: 'slide_from_right', headerShown: true }} />
          <Stack.Screen name="security" options={{ animation: 'slide_from_right', headerShown: true }} />
          <Stack.Screen name="shortcuts" options={{ animation: 'slide_from_right', headerShown: true }} />
          <Stack.Screen name="lists" options={{ animation: 'slide_from_right', headerShown: true }} />
          <Stack.Screen name="lists/[list]" options={{ animation: 'slide_from_right', headerShown: true }} />
          <Stack.Screen name="registrar" options={{ animation: 'slide_from_right', headerShown: true }} />
          <Stack.Screen name="turnstile" options={{ animation: 'slide_from_right', headerShown: true }} />
          <Stack.Screen name="account-members" options={{ animation: 'slide_from_right', headerShown: true }} />
          <Stack.Screen name="api-tokens" options={{ animation: 'slide_from_right', headerShown: true }} />
          <Stack.Screen name="notifications" options={{ animation: 'slide_from_right', headerShown: true }} />
          <Stack.Screen name="load-balancers" options={{ animation: 'slide_from_right', headerShown: true }} />
          <Stack.Screen name="web-analytics" options={{ animation: 'slide_from_right', headerShown: true }} />
          <Stack.Screen name="queues" options={{ animation: 'slide_from_right', headerShown: true }} />
          <Stack.Screen name="workers-ai" options={{ animation: 'slide_from_right', headerShown: true }} />
          <Stack.Screen name="ai-gateway" options={{ animation: 'slide_from_right', headerShown: true }} />
          <Stack.Screen name="workflows" options={{ animation: 'slide_from_right', headerShown: true }} />
          <Stack.Screen name="stream" options={{ animation: 'slide_from_right', headerShown: true }} />
          <Stack.Screen name="images" options={{ animation: 'slide_from_right', headerShown: true }} />
          <Stack.Screen name="pipelines" options={{ animation: 'slide_from_right', headerShown: true }} />
          <Stack.Screen name="web3" options={{ animation: 'slide_from_right', headerShown: true }} />
          <Stack.Screen name="dns-firewall" options={{ animation: 'slide_from_right', headerShown: true }} />
          <Stack.Screen name="address-maps" options={{ animation: 'slide_from_right', headerShown: true }} />
          <Stack.Screen name="tunnels" options={{ animation: 'slide_from_right', headerShown: true }} />
          <Stack.Screen name="tunnels/[tunnel]" options={{ animation: 'slide_from_right', headerShown: true }} />
          <Stack.Screen name="durable-objects" options={{ animation: 'slide_from_right', headerShown: true }} />
          <Stack.Screen name="durable-objects/[namespace]" options={{ animation: 'slide_from_right', headerShown: true }} />
          <Stack.Screen name="hyperdrive" options={{ animation: 'slide_from_right', headerShown: true }} />
          <Stack.Screen name="vectorize" options={{ animation: 'slide_from_right', headerShown: true }} />
          <Stack.Screen name="vectorize/[index]" options={{ animation: 'slide_from_right', headerShown: true }} />
          <Stack.Screen name="autorag" options={{ animation: 'slide_from_right', headerShown: true }} />
          <Stack.Screen name="autorag/[id]" options={{ animation: 'slide_from_right', headerShown: true }} />
          <Stack.Screen name="secrets-store" options={{ animation: 'slide_from_right', headerShown: true }} />
          <Stack.Screen name="secrets-store/[store]" options={{ animation: 'slide_from_right', headerShown: true }} />
          <Stack.Screen name="workers-for-platforms" options={{ animation: 'slide_from_right', headerShown: true }} />
          <Stack.Screen name="workers-for-platforms/[namespace]" options={{ animation: 'slide_from_right', headerShown: true }} />
          <Stack.Screen name="access-apps" options={{ animation: 'slide_from_right', headerShown: true }} />
          <Stack.Screen name="access-apps/[app]" options={{ animation: 'slide_from_right', headerShown: true }} />
          <Stack.Screen name="access-idps" options={{ animation: 'slide_from_right', headerShown: true }} />
          <Stack.Screen name="access-service-tokens" options={{ animation: 'slide_from_right', headerShown: true }} />
          <Stack.Screen name="access-mtls" options={{ animation: 'slide_from_right', headerShown: true }} />
          <Stack.Screen name="infra-targets" options={{ animation: 'slide_from_right', headerShown: true }} />
          <Stack.Screen name="gateway-rules" options={{ animation: 'slide_from_right', headerShown: true }} />
          <Stack.Screen name="d1/[db]" options={{ animation: 'slide_from_right', headerShown: true }} />
          <Stack.Screen name="kv/[ns]" options={{ animation: 'slide_from_right', headerShown: true }} />
          <Stack.Screen name="r2/[bucket]" options={{ animation: 'slide_from_right', headerShown: true }} />
          <Stack.Screen name="pages/[project]" options={{ animation: 'slide_from_right', headerShown: true }} />
          <Stack.Screen name="worker/[script]" options={{ animation: 'slide_from_right', headerShown: true }} />
          <Stack.Screen name="worker-tail/[script]" options={{ animation: 'slide_from_right', headerShown: true }} />
        </Stack>
      </LockGate>
      <StatusBar style={resolved === 'dark' ? 'light' : 'dark'} />
    </NavThemeProvider>
  );
}

export default function RootLayout() {
  useEffect(() => {
    installGlobalErrorLog();
    applyScreenshotBlock().catch(() => {});
    loadLanguage().catch(() => {});
    initPremium();
    // Day passes earned from rewarded ads, so a gated screen knows at once.
    initAdReward().catch(() => {});
    // Also loads the quota store, which subscribes to AI usage events.
    refreshQuota().catch(() => {});
    checkPlayUpdate();
    syncMonitoring();
    // Bring the widget and the Quick Settings tile up to date with this sign-in.
    if (Platform.OS === 'android') setTimeout(() => refreshShortcuts().catch(() => {}), 3000);
    track('app_open');
  }, []);

  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}
