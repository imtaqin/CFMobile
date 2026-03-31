import { Platform } from 'react-native';

export const CF = {
  orange: '#F6821F',
  orangeLight: '#FBAD41',
  orangeDark: '#E05D00',
  blue: '#003682',
  blueLight: '#0051C3',
  navy: '#1B1B3A',
};

export const Colors = {
  light: {
    text: '#11181C',
    textSecondary: '#687076',
    textTertiary: '#9BA1A6',
    background: '#F5F6F8',
    surface: '#FFFFFF',
    surfaceSecondary: '#F0F2F5',
    tint: CF.orange,
    primary: CF.orange,
    primaryLight: CF.orangeLight,
    icon: '#687076',
    border: '#E4E7EB',
    borderLight: '#F0F2F5',
    tabIconDefault: '#687076',
    tabIconSelected: CF.orange,
    success: '#10B981',
    error: '#EF4444',
    warning: '#F59E0B',
    info: CF.blueLight,
    cardShadow: 'rgba(0,0,0,0.06)',
    statusActive: '#10B981',
    statusPending: '#F59E0B',
    statusError: '#EF4444',
    statusPaused: '#9BA1A6',
    overlay: 'rgba(0,0,0,0.3)',
    inputBg: '#F5F6F8',
    badge: '#FFF3E0',
    badgeText: CF.orangeDark,
  },
  dark: {
    text: '#ECEDEE',
    textSecondary: '#9BA1A6',
    textTertiary: '#687076',
    background: '#0D1117',
    surface: '#161B22',
    surfaceSecondary: '#21262D',
    tint: CF.orange,
    primary: CF.orange,
    primaryLight: CF.orangeLight,
    icon: '#9BA1A6',
    border: '#30363D',
    borderLight: '#21262D',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: CF.orange,
    success: '#34D399',
    error: '#F87171',
    warning: '#FBBF24',
    info: '#60A5FA',
    cardShadow: 'rgba(0,0,0,0.3)',
    statusActive: '#34D399',
    statusPending: '#FBBF24',
    statusError: '#F87171',
    statusPaused: '#687076',
    overlay: 'rgba(0,0,0,0.6)',
    inputBg: '#21262D',
    badge: '#3D2800',
    badgeText: CF.orangeLight,
  },
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
};

export const Radius = {
  sm: 6,
  md: 10,
  lg: 14,
  xl: 18,
  full: 999,
};

export const FontSize = {
  xs: 11,
  sm: 13,
  md: 15,
  lg: 17,
  xl: 20,
  xxl: 24,
  xxxl: 32,
};

export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, monospace",
  },
});
