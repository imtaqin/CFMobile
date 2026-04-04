import { Colors } from '@/constants/theme';
import { useThemeContext } from '@/contexts/theme';

export type ThemeColors = typeof Colors.light;

export function useTheme(): { colors: ThemeColors; isDark: boolean } {
  const { resolved } = useThemeContext();
  return {
    colors: Colors[resolved],
    isDark: resolved === 'dark',
  };
}
