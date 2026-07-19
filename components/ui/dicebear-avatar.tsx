import { useMemo } from 'react';
import { View } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { Style, Avatar } from '@dicebear/core';
import definition from '@dicebear/styles/adventurer-neutral.json';

const style = new Style(definition as any);

interface DiceBearAvatarProps {
  seed: string;
  size: number;
}

export function DiceBearAvatar({ seed, size }: DiceBearAvatarProps) {
  const svg = useMemo(() => {
    try {
      return new Avatar(style, { seed }).toString();
    } catch {
      return null;
    }
  }, [seed]);

  if (!svg) return null;

  return (
    <View style={{ width: size, height: size, borderRadius: size / 2, overflow: 'hidden' }}>
      <SvgXml xml={svg} width={size} height={size} />
    </View>
  );
}
