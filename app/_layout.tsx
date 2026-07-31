import { DarkTheme, DefaultTheme, ThemeProvider as NavThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import '@/i18n';

import { useEffect } from 'react';
import { AuthProvider } from '@/contexts/auth';
import { ThemeProvider, useThemeContext } from '@/contexts/theme';
import { LockGate } from '@/components/ui/lock-gate';
import { initPremium } from '@/services/premium';
import { syncMonitoring } from '@/services/monitor-task';
import { checkPlayUpdate } from '@/services/play-update';
import { CF } from '@/constants/theme';

const CFLightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: CF.orange,
    background: '#F5F6F8',
    card: '#FFFFFF',
    border: '#E4E7EB',
  },
};

const CFDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: CF.orange,
    background: '#0D1117',
    card: '#161B22',
    border: '#30363D',
  },
};

function AppContent() {
  const { resolved } = useThemeContext();

  return (
    <NavThemeProvider value={resolved === 'dark' ? CFDarkTheme : CFLightTheme}>
      <LockGate>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="onboarding" options={{ animation: 'fade' }} />
          <Stack.Screen name="login" options={{ animation: 'fade' }} />
          <Stack.Screen name="(tabs)" />
          <Stack.Screen
            name="zone/[id]"
            options={{ animation: 'slide_from_right' }}
          />
          <Stack.Screen name="about" options={{ animation: 'slide_from_right' }} />
          <Stack.Screen name="changelog" options={{ animation: 'slide_from_right' }} />
          <Stack.Screen name="monitoring" options={{ animation: 'slide_from_right', headerShown: true }} />
          <Stack.Screen name="audit-logs" options={{ animation: 'slide_from_right', headerShown: true }} />
          <Stack.Screen name="d1/[db]" options={{ animation: 'slide_from_right', headerShown: true }} />
          <Stack.Screen name="kv/[ns]" options={{ animation: 'slide_from_right', headerShown: true }} />
          <Stack.Screen name="r2/[bucket]" options={{ animation: 'slide_from_right', headerShown: true }} />
          <Stack.Screen name="worker-tail/[script]" options={{ animation: 'slide_from_right', headerShown: true }} />
        </Stack>
      </LockGate>
      <StatusBar style={resolved === 'dark' ? 'light' : 'dark'} />
    </NavThemeProvider>
  );
}

export default function RootLayout() {
  useEffect(() => {
    initPremium();
    checkPlayUpdate();
    syncMonitoring();
  }, []);

  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}
