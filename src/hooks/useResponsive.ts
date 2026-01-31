import { useScreenSize, ScreenCategory } from './useScreenSize';

// Base design dimensions (iPhone 12/13/14)
const BASE_WIDTH = 375;
const BASE_HEIGHT = 812;

// Category-based multipliers for scaling
const MULTIPLIERS: Record<ScreenCategory, number> = {
  xs: 0.85,
  sm: 0.95,
  md: 1,
  lg: 1.05,
  xl: 1.15,
  xxl: 1.3,
};

interface UseResponsiveReturn {
  /** Width percentage - scales based on screen width */
  wp: (percent: number) => number;
  /** Height percentage - scales based on screen height */
  hp: (percent: number) => number;
  /** Responsive font size with min/max clamping */
  fontSize: (size: number) => number;
  /** Responsive spacing */
  spacing: (size: number) => number;
  /** Scale factor relative to base design */
  scaleFactor: number;
  /** Category-based multiplier */
  multiplier: number;
  /** Moderately scaled value (less aggressive than fontSize) */
  ms: (size: number, factor?: number) => number;
}

export function useResponsive(): UseResponsiveReturn {
  const { width, height, category } = useScreenSize();

  // Scale factor relative to base design
  const scaleFactor = width / BASE_WIDTH;
  const heightFactor = height / BASE_HEIGHT;

  // Width percentage (wp) - scales based on screen width
  const wp = (percent: number): number => (width * percent) / 100;

  // Height percentage (hp) - scales based on screen height
  const hp = (percent: number): number => (height * percent) / 100;

  // Responsive font size with min/max clamping
  const fontSize = (size: number): number => {
    const scaled = size * scaleFactor;
    // Clamp between 80% and 130% of original size
    return Math.round(Math.max(size * 0.8, Math.min(scaled, size * 1.3)));
  };

  // Responsive spacing
  const spacing = (size: number): number => {
    return Math.round(size * scaleFactor);
  };

  // Moderately scaled value (less aggressive scaling)
  const ms = (size: number, factor: number = 0.5): number => {
    return Math.round(size + (scaleFactor - 1) * size * factor);
  };

  return {
    wp,
    hp,
    fontSize,
    spacing,
    scaleFactor,
    multiplier: MULTIPLIERS[category],
    ms,
  };
}
