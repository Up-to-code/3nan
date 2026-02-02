import { useWindowDimensions } from 'react-native';

export type ScreenCategory = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

interface UseScreenSizeReturn {
  width: number;
  height: number;
  fontScale: number;
  scale: number;
  category: ScreenCategory;
  isPhone: boolean;
  isTablet: boolean;
  isLandscape: boolean;
}

/**
 * Device breakpoints based on width (portrait):
 * - xs (extra small): 0-320 - iPhone SE 1st gen, older Android
 * - sm (small): 321-375 - iPhone SE 2/3, iPhone 8, mini
 * - md (medium): 376-414 - iPhone 12/13/14, most Android
 * - lg (large): 415-428 - iPhone Pro Max, large Android
 * - xl (extra large): 429-768 - Small tablets
 * - xxl (tablet): 769+ - iPad, Android tablets
 */
export function useScreenSize(): UseScreenSizeReturn {
  const { width, height, fontScale, scale } = useWindowDimensions();

  const category: ScreenCategory =
    width <= 320
      ? 'xs'
      : width <= 375
        ? 'sm'
        : width <= 414
          ? 'md'
          : width <= 428
            ? 'lg'
            : width <= 768
              ? 'xl'
              : 'xxl';

  return {
    width,
    height,
    fontScale,
    scale,
    category,
    isPhone: width < 600,
    isTablet: width >= 600,
    isLandscape: width > height,
  };
}
