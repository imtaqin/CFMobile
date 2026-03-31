import React from 'react';
import Svg, { Path, Circle, Rect, Ellipse, Line } from 'react-native-svg';
import { useTheme } from '@/hooks/use-theme';

export type IconName =
  // Brand
  | 'cloudflare' | 'cf-workers' | 'cf-pages'
  // Navigation / Tabs
  | 'dashboard' | 'globe' | 'widgets' | 'settings'
  // Zone management
  | 'dns' | 'lock' | 'shield' | 'layers' | 'chart-line' | 'route' | 'zap' | 'rule'
  // Actions
  | 'search' | 'plus' | 'edit' | 'trash' | 'refresh' | 'cached'
  // Arrows / Navigation
  | 'chevron-right' | 'chevron-down' | 'arrow-left'
  // Status
  | 'check-circle' | 'warning' | 'error-circle' | 'info' | 'shield-check'
  // Objects
  | 'cloud' | 'cloud-off' | 'cloud-upload' | 'key' | 'link' | 'code'
  | 'database' | 'server' | 'monitor' | 'mail' | 'user' | 'users'
  | 'languages' | 'activity' | 'network' | 'lock-open' | 'lock-outline'
  | 'enhanced-encryption'
  // UI
  | 'menu' | 'logout' | 'close' | 'developer-mode' | 'delete-sweep'
  | 'pageview' | 'clock' | 'download' | 'https';

interface IconProps {
  name: IconName;
  size?: number;
  color?: string;
  strokeWidth?: number;
}

// Lucide stroke-based icons
function LucideIcon({ paths, size, color, sw, circles, rects, ellipses, lines }: {
  paths: string[];
  size: number;
  color: string;
  sw: number;
  circles?: { cx: number; cy: number; r: number }[];
  rects?: { x: number; y: number; w: number; h: number; rx?: number }[];
  ellipses?: { cx: number; cy: number; rx: number; ry: number }[];
  lines?: { x1: number; y1: number; x2: number; y2: number }[];
}) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      {paths.map((d, i) => (
        <Path key={i} d={d} stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" />
      ))}
      {circles?.map((c, i) => (
        <Circle key={`c${i}`} cx={c.cx} cy={c.cy} r={c.r} stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" fill="none" />
      ))}
      {rects?.map((r, i) => (
        <Rect key={`r${i}`} x={r.x} y={r.y} width={r.w} height={r.h} rx={r.rx ?? 0} stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" fill="none" />
      ))}
      {ellipses?.map((e, i) => (
        <Ellipse key={`e${i}`} cx={e.cx} cy={e.cy} rx={e.rx} ry={e.ry} stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" fill="none" />
      ))}
      {lines?.map((l, i) => (
        <Line key={`l${i}`} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" />
      ))}
    </Svg>
  );
}

// Filled brand icons
function FilledIcon({ paths, size, color }: { paths: string[]; size: number; color: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      {paths.map((d, i) => <Path key={i} d={d} />)}
    </Svg>
  );
}

export function Icon({ name, size = 24, color, strokeWidth = 2 }: IconProps) {
  const { colors } = useTheme();
  const c = color ?? colors.text;
  const sw = strokeWidth;

  switch (name) {
    // ─── Brand (filled) ───────────────────────────────────
    case 'cloudflare':
      return <FilledIcon size={size} color={c} paths={[
        'M16.5088 16.8447c.1475-.5068.0908-.9707-.1553-1.3154-.2246-.3164-.6045-.499-1.0615-.5205l-8.6592-.1123a.1559.1559 0 0 1-.1333-.0713c-.0283-.042-.0351-.0986-.021-.1553.0278-.084.1123-.1484.2036-.1562l8.7359-.1123c1.0351-.0489 2.1601-.8868 2.5537-1.9136l.499-1.3013c.0215-.0561.0293-.1128.0147-.168-.5625-2.5463-2.835-4.4453-5.5499-4.4453-2.5039 0-4.6284 1.6177-5.3876 3.8614-.4927-.3658-1.1187-.5625-1.794-.499-1.2026.119-2.1665 1.083-2.2861 2.2856-.0283.31-.0069.6128.0635.894C1.5683 13.171 0 14.7754 0 16.752c0 .1748.0142.3515.0352.5273.0141.083.0844.1475.1689.1475h15.9814c.0909 0 .1758-.0645.2032-.1553l.12-.4268z',
        'M19.2656 11.2813c-.0771 0-.1611 0-.2383.0112-.0566 0-.1054.0415-.127.0976l-.3378 1.1744c-.1475.5068-.0918.9707.1543 1.3164.2256.3164.6055.498 1.0625.5195l1.8437.1133c.0557 0 .1055.0263.1329.0703.0283.043.0351.1074.0214.1562-.0283.084-.1132.1485-.204.1553l-1.921.1123c-1.041.0488-2.1582.8867-2.5527 1.914l-.1406.3585c-.0283.0713.0215.1416.0986.1416h6.5977c.0771 0 .1474-.0489.169-.126.1122-.4082.1757-.837.1757-1.2803 0-2.6025-2.125-4.727-4.7344-4.727',
      ]} />;
    case 'cf-workers':
      return <FilledIcon size={size} color={c} paths={[
        'm8.213.063 8.879 12.136-8.67 11.739h2.476l8.665-11.735-8.89-12.14Zm4.728 0 9.02 11.992-9.018 11.883h2.496L24 12.656v-1.199L15.434.063ZM7.178 2.02.01 11.398l-.01 1.2 7.203 9.644 1.238-1.676-6.396-8.556 6.361-8.313Z',
      ]} />;
    case 'cf-pages':
      return <FilledIcon size={size} color={c} paths={[
        'M10.715 14.32H5.442l-.64-1.203L13.673 0l1.397.579-1.752 9.112h5.24l.648 1.192L10.719 24l-1.412-.54ZM4.091 5.448a.5787.5787 0 1 1 0-1.1574.5787.5787 0 0 1 0 1.1574zm1.543 0a.5787.5787 0 1 1 0-1.1574.5787.5787 0 0 1 0 1.1574zm1.544 0a.5787.5787 0 1 1 0-1.1574.5787.5787 0 0 1 0 1.1574zm8.657-2.7h5.424l.772.771v16.975l-.772.772h-7.392l.374-.579h6.779l.432-.432V3.758l-.432-.432h-4.676l-.552 2.85h-.59l.529-2.877.108-.552ZM2.74 21.265l-.772-.772V3.518l.772-.771h7.677l-.386.579H2.98l-.432.432v16.496l.432.432h5.586l-.092.579zm1.157-1.93h3.28l-.116.58h-3.55l-.192-.193v-3.473l.578 1.158zm13.117 0 .579.58H14.7l.385-.58z',
      ]} />;

    // ─── Navigation ───────────────────────────────────────
    case 'dashboard':
      return <LucideIcon size={size} color={c} sw={sw} paths={[]} rects={[
        { x: 3, y: 3, w: 7, h: 9, rx: 1 },
        { x: 14, y: 3, w: 7, h: 5, rx: 1 },
        { x: 14, y: 12, w: 7, h: 9, rx: 1 },
        { x: 3, y: 16, w: 7, h: 5, rx: 1 },
      ]} />;
    case 'globe':
      return <LucideIcon size={size} color={c} sw={sw} paths={[
        'M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20',
        'M2 12h20',
      ]} circles={[{ cx: 12, cy: 12, r: 10 }]} />;
    case 'widgets':
      return <LucideIcon size={size} color={c} sw={sw} paths={[]} rects={[
        { x: 3, y: 3, w: 8, h: 8, rx: 1 },
        { x: 13, y: 3, w: 8, h: 8, rx: 1 },
        { x: 3, y: 13, w: 8, h: 8, rx: 1 },
        { x: 13, y: 13, w: 8, h: 8, rx: 1 },
      ]} />;
    case 'settings':
      return <LucideIcon size={size} color={c} sw={sw} paths={[
        'M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z',
      ]} circles={[{ cx: 12, cy: 12, r: 3 }]} />;

    // ─── Zone management ──────────────────────────────────
    case 'dns':
      return <LucideIcon size={size} color={c} sw={sw} paths={[
        'M21.54 15H17a2 2 0 0 0-2 2v4.54',
        'M7 3.34V5a3 3 0 0 0 3 3a2 2 0 0 1 2 2c0 1.1.9 2 2 2a2 2 0 0 0 2-2c0-1.1.9-2 2-2h3.17',
        'M11 21.95V18a2 2 0 0 0-2-2a2 2 0 0 1-2-2v-1a2 2 0 0 0-2-2H2.05',
      ]} circles={[{ cx: 12, cy: 12, r: 10 }]} />;
    case 'lock':
      return <LucideIcon size={size} color={c} sw={sw} paths={[
        'M7 11V7a5 5 0 0 1 10 0v4',
      ]} rects={[{ x: 3, y: 11, w: 18, h: 11, rx: 2 }]} />;
    case 'lock-open':
      return <LucideIcon size={size} color={c} sw={sw} paths={[
        'M8 11V7a4 4 0 0 1 8 0',
      ]} rects={[{ x: 3, y: 11, w: 18, h: 11, rx: 2 }]} />;
    case 'lock-outline':
      return <LucideIcon size={size} color={c} sw={sw} paths={[
        'M7 11V7a5 5 0 0 1 10 0v4',
        'M12 15v2',
      ]} rects={[{ x: 3, y: 11, w: 18, h: 11, rx: 2 }]} />;
    case 'enhanced-encryption':
      return <LucideIcon size={size} color={c} sw={sw} paths={[
        'M7 11V7a5 5 0 0 1 10 0v4',
        'M12 14v4',
        'M10 16h4',
      ]} rects={[{ x: 3, y: 11, w: 18, h: 11, rx: 2 }]} />;
    case 'shield':
      return <LucideIcon size={size} color={c} sw={sw} paths={[
        'M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z',
      ]} />;
    case 'shield-check':
      return <LucideIcon size={size} color={c} sw={sw} paths={[
        'M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z',
        'm9 12 2 2 4-4',
      ]} />;
    case 'layers':
      return <LucideIcon size={size} color={c} sw={sw} paths={[
        'M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z',
        'M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12',
        'M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17',
      ]} />;
    case 'chart-line':
      return <LucideIcon size={size} color={c} sw={sw} paths={[
        'M3 3v16a2 2 0 0 0 2 2h16',
        'm19 9-5 5-4-4-3 3',
      ]} />;
    case 'route':
      return <LucideIcon size={size} color={c} sw={sw} paths={[
        'M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15',
      ]} circles={[{ cx: 6, cy: 19, r: 3 }, { cx: 18, cy: 5, r: 3 }]} />;
    case 'zap':
      return <LucideIcon size={size} color={c} sw={sw} paths={[
        'M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z',
      ]} />;
    case 'rule':
      return <LucideIcon size={size} color={c} sw={sw} paths={[
        'M10 6h11', 'M10 12h11', 'M10 18h11',
        'm3 6 1 1 2-2', 'm3 18 1 1 2-2',
      ]} circles={[]} lines={[{ x1: 3, y1: 12, x2: 7, y2: 12 }]} />;

    // ─── Actions ──────────────────────────────────────────
    case 'search':
      return <LucideIcon size={size} color={c} sw={sw} paths={[
        'm21 21-4.34-4.34',
      ]} circles={[{ cx: 11, cy: 11, r: 8 }]} />;
    case 'plus':
      return <LucideIcon size={size} color={c} sw={sw} paths={['M5 12h14', 'M12 5v14']} />;
    case 'edit':
      return <LucideIcon size={size} color={c} sw={sw} paths={[
        'M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z',
        'm15 5 4 4',
      ]} />;
    case 'trash':
      return <LucideIcon size={size} color={c} sw={sw} paths={[
        'M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6',
        'M3 6h18',
        'M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2',
      ]} />;
    case 'refresh':
      return <LucideIcon size={size} color={c} sw={sw} paths={[
        'M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8',
        'M21 3v5h-5',
      ]} />;
    case 'cached':
      return <LucideIcon size={size} color={c} sw={sw} paths={[
        'M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8',
        'M3 3v5h5',
        'M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16',
        'M16 16h5v5',
      ]} />;
    case 'delete-sweep':
      return <LucideIcon size={size} color={c} sw={sw} paths={[
        'M3 6h18', 'M8 6V4h8v2',
        'M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6',
        'M10 11v6', 'M14 11v6',
      ]} />;

    // ─── Arrows ───────────────────────────────────────────
    case 'chevron-right':
      return <LucideIcon size={size} color={c} sw={sw} paths={['m9 18 6-6-6-6']} />;
    case 'chevron-down':
      return <LucideIcon size={size} color={c} sw={sw} paths={['m6 9 6 6 6-6']} />;
    case 'arrow-left':
      return <LucideIcon size={size} color={c} sw={sw} paths={['m12 19-7-7 7-7', 'M19 12H5']} />;

    // ─── Status ───────────────────────────────────────────
    case 'check-circle':
      return <LucideIcon size={size} color={c} sw={sw} paths={['m9 12 2 2 4-4']} circles={[{ cx: 12, cy: 12, r: 10 }]} />;
    case 'warning':
      return <LucideIcon size={size} color={c} sw={sw} paths={[
        'm21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3',
        'M12 9v4', 'M12 17h.01',
      ]} />;
    case 'error-circle':
      return <LucideIcon size={size} color={c} sw={sw} paths={['m15 9-6 6', 'm9 9 6 6']} circles={[{ cx: 12, cy: 12, r: 10 }]} />;
    case 'info':
      return <LucideIcon size={size} color={c} sw={sw} paths={['M12 16v-4', 'M12 8h.01']} circles={[{ cx: 12, cy: 12, r: 10 }]} />;

    // ─── Objects ──────────────────────────────────────────
    case 'cloud':
      return <LucideIcon size={size} color={c} sw={sw} paths={[
        'M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z',
      ]} />;
    case 'cloud-off':
      return <LucideIcon size={size} color={c} sw={sw} paths={[
        'M2 2 22 22',
        'M5 5a7 7 0 0 0 4 13h9.5',
        'M9.898 4.187A7.003 7.003 0 0 1 15.71 10h1.79a4.5 4.5 0 0 1 2.436 8.284',
      ]} />;
    case 'cloud-upload':
      return <LucideIcon size={size} color={c} sw={sw} paths={[
        'M12 13v8',
        'M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242',
        'm8 17 4-4 4 4',
      ]} />;
    case 'key':
      return <LucideIcon size={size} color={c} sw={sw} paths={[
        'm15.5 7.5 2.3 2.3a1 1 0 0 0 1.4 0l2.1-2.1a1 1 0 0 0 0-1.4L19 4',
        'm21 2-9.6 9.6',
      ]} circles={[{ cx: 7.5, cy: 15.5, r: 5.5 }]} />;
    case 'link':
      return <LucideIcon size={size} color={c} sw={sw} paths={[
        'M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71',
        'M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71',
      ]} />;
    case 'code':
      return <LucideIcon size={size} color={c} sw={sw} paths={['m16 18 6-6-6-6', 'm8 6-6 6 6 6']} />;
    case 'database':
      return <LucideIcon size={size} color={c} sw={sw} paths={[
        'M3 5V19A9 3 0 0 0 21 19V5',
        'M3 12A9 3 0 0 0 21 12',
      ]} ellipses={[{ cx: 12, cy: 5, rx: 9, ry: 3 }]} />;
    case 'server':
      return <LucideIcon size={size} color={c} sw={sw} paths={[]}
        rects={[{ x: 2, y: 2, w: 20, h: 8, rx: 2 }, { x: 2, y: 14, w: 20, h: 8, rx: 2 }]}
        lines={[{ x1: 6, y1: 6, x2: 6.01, y2: 6 }, { x1: 6, y1: 18, x2: 6.01, y2: 18 }]}
      />;
    case 'monitor':
      return <LucideIcon size={size} color={c} sw={sw} paths={[]}
        rects={[{ x: 2, y: 3, w: 20, h: 14, rx: 2 }]}
        lines={[{ x1: 8, y1: 21, x2: 16, y2: 21 }, { x1: 12, y1: 17, x2: 12, y2: 21 }]}
      />;
    case 'mail':
      return <LucideIcon size={size} color={c} sw={sw} paths={[
        'm22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7',
      ]} rects={[{ x: 2, y: 4, w: 20, h: 16, rx: 2 }]} />;
    case 'user':
      return <LucideIcon size={size} color={c} sw={sw} paths={[
        'M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2',
      ]} circles={[{ cx: 12, cy: 7, r: 4 }]} />;
    case 'users':
      return <LucideIcon size={size} color={c} sw={sw} paths={[
        'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2',
        'M22 21v-2a4 4 0 0 0-3-3.87',
        'M16 3.13a4 4 0 0 1 0 7.75',
      ]} circles={[{ cx: 9, cy: 7, r: 4 }]} />;
    case 'languages':
      return <LucideIcon size={size} color={c} sw={sw} paths={[
        'm5 8 6 6', 'm4 14 6-6 2-3', 'M2 5h12', 'M7 2h1',
        'm22 22-5-10-5 10', 'M14 18h6',
      ]} />;
    case 'activity':
      return <LucideIcon size={size} color={c} sw={sw} paths={[
        'M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2',
      ]} />;
    case 'network':
      return <LucideIcon size={size} color={c} sw={sw} paths={[
        'M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3',
        'M12 12V8',
      ]} rects={[
        { x: 16, y: 16, w: 6, h: 6, rx: 1 },
        { x: 2, y: 16, w: 6, h: 6, rx: 1 },
        { x: 9, y: 2, w: 6, h: 6, rx: 1 },
      ]} />;

    // ─── UI ───────────────────────────────────────────────
    case 'menu':
      return <LucideIcon size={size} color={c} sw={sw} paths={['M4 5h16', 'M4 12h16', 'M4 19h16']} />;
    case 'logout':
      return <LucideIcon size={size} color={c} sw={sw} paths={[
        'm16 17 5-5-5-5', 'M21 12H9',
        'M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4',
      ]} />;
    case 'close':
      return <LucideIcon size={size} color={c} sw={sw} paths={['M18 6 6 18', 'M6 6l12 12']} />;
    case 'developer-mode':
      return <LucideIcon size={size} color={c} sw={sw} paths={[
        'm16 18 6-6-6-6', 'm8 6-6 6 6 6',
      ]} rects={[]} />;
    case 'pageview':
      return <LucideIcon size={size} color={c} sw={sw} paths={[
        'M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z',
      ]} circles={[{ cx: 12, cy: 12, r: 3 }]} />;
    case 'clock':
      return <LucideIcon size={size} color={c} sw={sw} paths={['M12 6v6l4 2']} circles={[{ cx: 12, cy: 12, r: 10 }]} />;
    case 'download':
      return <LucideIcon size={size} color={c} sw={sw} paths={[
        'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4',
        'm7 10 5 5 5-5', 'M12 15V3',
      ]} />;
    case 'https':
      return <LucideIcon size={size} color={c} sw={sw} paths={[
        'M7 11V7a5 5 0 0 1 10 0v4',
        'm9 15 2 2 4-4',
      ]} rects={[{ x: 3, y: 11, w: 18, h: 11, rx: 2 }]} />;

    default:
      return <LucideIcon size={size} color={c} sw={sw} paths={[]} circles={[{ cx: 12, cy: 12, r: 10 }, { cx: 12, cy: 12, r: 1 }]} />;
  }
}
