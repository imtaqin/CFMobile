import { Stack } from 'expo-router';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';

export default function ZoneLayout() {
  const colorScheme = useColorScheme() ?? 'light';

  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerStyle: { backgroundColor: Colors[colorScheme].surface },
        headerTintColor: Colors[colorScheme].text,
        headerShadowVisible: false,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="index" options={{ title: 'Zone' }} />
      <Stack.Screen name="dns" options={{ title: 'DNS Records' }} />
      <Stack.Screen name="dns-edit" options={{ title: 'DNS Record', presentation: 'modal' }} />
      <Stack.Screen name="ssl" options={{ title: 'SSL/TLS' }} />
      <Stack.Screen name="firewall" options={{ title: 'Firewall' }} />
      <Stack.Screen name="cache" options={{ title: 'Cache' }} />
      <Stack.Screen name="analytics" options={{ title: 'Analytics' }} />
      <Stack.Screen name="pagerules" options={{ title: 'Page Rules' }} />
    </Stack>
  );
}
