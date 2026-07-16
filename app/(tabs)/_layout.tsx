import { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import { Tabs, Redirect } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { HapticTab } from '@/components/haptic-tab';
import { Icon } from '@/components/ui/icon';
import { Colors } from '@/constants/theme';
import { useThemeContext } from '@/contexts/theme';
import { useAuth } from '@/contexts/auth';
import { Loading } from '@/components/ui/loading';

const ONBOARDING_KEY = 'cf_onboarding_done';

function getOnboardingDone(): boolean {
  if (Platform.OS === 'web') {
    return localStorage.getItem(ONBOARDING_KEY) === '1';
  }
  return false; // native checks async, handled below
}

export default function TabLayout() {
  const { resolved } = useThemeContext();
  const colorScheme = resolved;
  const { t } = useTranslation();
  const { isLoading, isAuthenticated } = useAuth();
  const [onboardingChecked, setOnboardingChecked] = useState(Platform.OS === 'web');
  const [onboardingDone, setOnboardingDone] = useState(getOnboardingDone);

  useEffect(() => {
    if (Platform.OS !== 'web') {
      const SecureStore = require('expo-secure-store');
      SecureStore.getItemAsync(ONBOARDING_KEY).then((val: string | null) => {
        setOnboardingDone(val === '1');
        setOnboardingChecked(true);
      });
    }
  }, []);

  if (isLoading || !onboardingChecked) return <Loading />;
  if (!onboardingDone) return <Redirect href="/onboarding" />;
  if (!isAuthenticated) return <Redirect href="/login" />;

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
        tabBarInactiveTintColor: Colors[colorScheme].tabIconDefault,
        tabBarStyle: {
          backgroundColor: Colors[colorScheme].surface,
          borderTopColor: Colors[colorScheme].border,
        },
        headerStyle: { backgroundColor: Colors[colorScheme].surface },
        headerTintColor: Colors[colorScheme].text,
        headerShadowVisible: false,
        tabBarButton: HapticTab,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: t('tabs.dashboard'),
          headerShown: true,
          tabBarIcon: ({ color, size }) => <Icon name="dashboard" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="zones"
        options={{
          title: t('tabs.zones'),
          headerShown: true,
          tabBarIcon: ({ color, size }) => <Icon name="dns" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="services"
        options={{
          title: t('tabs.services'),
          headerShown: true,
          tabBarIcon: ({ color, size }) => <Icon name="widgets" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: t('tabs.settings'),
          headerShown: true,
          tabBarIcon: ({ color, size }) => <Icon name="settings" size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}
