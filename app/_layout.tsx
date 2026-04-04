import { DarkTheme, DefaultTheme, ThemeProvider as NavThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import '@/i18n';

import { AuthProvider } from '@/contexts/auth';
import { ThemeProvider, useThemeContext } from '@/contexts/theme';
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
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="onboarding" options={{ animation: 'fade' }} />
        <Stack.Screen name="login" options={{ animation: 'fade' }} />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen
          name="zone/[id]"
          options={{ animation: 'slide_from_right' }}
        />
      </Stack>
      <StatusBar style={resolved === 'dark' ? 'light' : 'dark'} />
    </NavThemeProvider>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}
