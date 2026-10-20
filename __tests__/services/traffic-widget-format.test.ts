import { short } from '@/widgets/traffic-widget';

/**
 * The headline number on the traffic widget. Every case here is a boundary
 * where the naive version spilled into the wrong tier.
 */
describe('shortening a request count for a widget', () => {
  it('leaves small numbers alone', () => {
    expect(short(0)).toBe('0');
    expect(short(7)).toBe('7');
    expect(short(999)).toBe('999');
  });

  it('switches to thousands at a thousand, not before', () => {
    expect(short(999)).toBe('999');
    expect(short(1_000)).toBe('1.0k');
    expect(short(1_234)).toBe('1.2k');
  });

  it('drops the decimal once it would be noise', () => {
    expect(short(9_949)).toBe('9.9k');
    // Would have read "10.0k".
    expect(short(9_999)).toBe('10k');
    expect(short(45_300)).toBe('45k');
  });

  it('rolls thousands into millions instead of printing 1000k', () => {
    expect(short(999_499)).toBe('999k');
    expect(short(999_999)).toBe('1.0M');
    expect(short(1_234_567)).toBe('1.2M');
    expect(short(12_000_000)).toBe('12M');
  });

  it('rolls millions into billions', () => {
    expect(short(999_499_999)).toBe('999M');
    expect(short(1_000_000_000)).toBe('1.0B');
    expect(short(23_400_000_000)).toBe('23B');
  });
});
