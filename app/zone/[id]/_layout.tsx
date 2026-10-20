import { Stack } from 'expo-router';
import { useThemeContext } from '@/contexts/theme';
import { Colors } from '@/constants/theme';

export default function ZoneLayout() {
  // Follow the in-app theme choice, not just the system scheme.
  const { resolved: colorScheme } = useThemeContext();

  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerStyle: { backgroundColor: Colors[colorScheme].background },
        headerTintColor: Colors[colorScheme].text,
        headerTitleStyle: { fontSize: 18, fontWeight: '500' },
        headerShadowVisible: false,
        contentStyle: { backgroundColor: Colors[colorScheme].background },
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
      <Stack.Screen name="settings" options={{ title: 'Zone Settings' }} />
      <Stack.Screen name="worker-routes" options={{ title: 'Worker Routes' }} />
      <Stack.Screen name="health-checks" options={{ title: 'Health Checks' }} />
      <Stack.Screen name="email" options={{ title: 'Email Routing' }} />
      <Stack.Screen name="ai-audit" options={{ title: 'AI Security Audit' }} />
      <Stack.Screen name="rules" options={{ title: 'Rules' }} />
      <Stack.Screen name="lifecycle" options={{ title: "Zone Lifecycle" }} />
      <Stack.Screen name="waiting-room" options={{ title: 'Waiting Room' }} />
      <Stack.Screen name="observatory" options={{ title: 'Observatory' }} />
      <Stack.Screen name="spectrum" options={{ title: 'Spectrum' }} />
      <Stack.Screen name="web3" options={{ title: 'Web3' }} />
      <Stack.Screen name="dns-backup" options={{ headerShown: true }} />
    </Stack>
  );
}
