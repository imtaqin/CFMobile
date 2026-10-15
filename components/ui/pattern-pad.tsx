import { useEffect, useMemo, useRef, useState } from 'react';
import { PanResponder, StyleSheet, Text, View, Vibration } from 'react-native';
import Svg, { Circle, Line } from 'react-native-svg';
import { useTheme } from '@/hooks/use-theme';
import { FontSize, Spacing } from '@/constants/theme';

interface PatternPadProps {
  title: string;
  error?: string | null;
  /** Bump to signal another failed attempt even when the message is unchanged. */
  errorNonce?: number;
  disabled?: boolean;
  /** Dot indices 0-8 in the order they were joined. */
  onComplete: (dots: number[]) => void;
}

const SIZE = 264;
const CELL = SIZE / 3;
const HIT_RADIUS = CELL * 0.38;
const DOT_RADIUS = 7;

const center = (i: number) => ({ x: (i % 3) * CELL + CELL / 2, y: Math.floor(i / 3) * CELL + CELL / 2 });

/** The 3x3 unlock pattern: drag through the dots, release to submit. */
export function PatternPad({ title, error, errorNonce, disabled, onComplete }: PatternPadProps) {
  const { colors } = useTheme();
  const [path, setPath] = useState<number[]>([]);
  const [finger, setFinger] = useState<{ x: number; y: number } | null>(null);
  const [failed, setFailed] = useState(false);
  const pathRef = useRef<number[]>([]);
  const origin = useRef({ x: 0, y: 0 });
  const boxRef = useRef<View>(null);
  // The responder is built once; it reads the latest callback through this ref.
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    if (!error) return;
    Vibration.vibrate(80);
    setFailed(true);
    const timer = setTimeout(() => { setFailed(false); setPath([]); pathRef.current = []; }, 700);
    return () => clearTimeout(timer);
  }, [error, errorNonce]);

  const visit = (x: number, y: number) => {
    for (let i = 0; i < 9; i++) {
      const c = center(i);
      if (pathRef.current.includes(i) || Math.hypot(x - c.x, y - c.y) > HIT_RADIUS) continue;
      const last = pathRef.current[pathRef.current.length - 1];
      const next = [...pathRef.current];
      // Passing straight over a dot that is between two others joins it too, as on Android.
      if (last !== undefined) {
        const lr = Math.floor(last / 3), lc = last % 3, r = Math.floor(i / 3), cc = i % 3;
        if ((lr + r) % 2 === 0 && (lc + cc) % 2 === 0) {
          const mid = ((lr + r) / 2) * 3 + (lc + cc) / 2;
          if (!next.includes(mid)) next.push(mid);
        }
      }
      next.push(i);
      pathRef.current = next;
      setPath(next);
      Vibration.vibrate(10);
      return;
    }
  };

  const responder = useMemo(() => PanResponder.create({
    onStartShouldSetPanResponder: () => !disabled,
    onMoveShouldSetPanResponder: () => !disabled,
    onPanResponderGrant: (e) => {
      setFailed(false);
      pathRef.current = [];
      setPath([]);
      const { pageX, pageY, locationX, locationY } = e.nativeEvent;
      boxRef.current?.measure((_x, _y, _w, _h, px, py) => { origin.current = { x: px, y: py }; });
      // Until measure answers, the first touch is relative to the box itself.
      origin.current = { x: pageX - locationX, y: pageY - locationY };
      visit(locationX, locationY);
      setFinger({ x: locationX, y: locationY });
    },
    onPanResponderMove: (_e, g) => {
      const x = g.moveX - origin.current.x;
      const y = g.moveY - origin.current.y;
      setFinger({ x, y });
      visit(x, y);
    },
    onPanResponderRelease: () => {
      setFinger(null);
      const dots = pathRef.current;
      if (dots.length) onCompleteRef.current(dots);
    },
    onPanResponderTerminate: () => setFinger(null),
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }), [disabled]);

  const stroke = failed ? colors.error : colors.primary;
  const last = path.length ? center(path[path.length - 1]) : null;

  return (
    <View style={styles.wrap}>
      <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
      <Text style={[styles.error, { color: colors.error }]}>{error ?? ' '}</Text>
      <View ref={boxRef} style={styles.box} {...responder.panHandlers}>
        <Svg width={SIZE} height={SIZE}>
          {path.slice(1).map((dot, i) => {
            const a = center(path[i]);
            const b = center(dot);
            return <Line key={i} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke={stroke} strokeWidth={5} strokeLinecap="round" opacity={0.7} />;
          })}
          {last && finger && (
            <Line x1={last.x} y1={last.y} x2={finger.x} y2={finger.y} stroke={stroke} strokeWidth={5} strokeLinecap="round" opacity={0.4} />
          )}
          {Array.from({ length: 9 }, (_, i) => {
            const c = center(i);
            const on = path.includes(i);
            return (
              <Circle
                key={i}
                cx={c.x}
                cy={c.y}
                r={on ? DOT_RADIUS + 4 : DOT_RADIUS}
                fill={on ? stroke : colors.textTertiary}
              />
            );
          })}
        </Svg>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { alignItems: 'center', gap: Spacing.sm },
  title: { fontSize: FontSize.lg, fontWeight: '600', textAlign: 'center' },
  error: { fontSize: FontSize.sm, minHeight: 18, textAlign: 'center' },
  box: { width: SIZE, height: SIZE, marginTop: Spacing.md },
});
