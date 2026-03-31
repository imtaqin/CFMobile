import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export type ThemeColors = typeof Colors.light;

export function useTheme(): { colors: ThemeColors; isDark: boolean } {
  const scheme = useColorScheme() ?? 'light';
  return {
    colors: Colors[scheme],
    isDark: scheme === 'dark',
  };
}
