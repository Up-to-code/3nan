import { useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

/**
 * Layout values for motion/animation calculations.
 * Wraps useWindowDimensions + useSafeAreaInsets with derived content metrics.
 */
export function useMotionScreen() {
  const insets = useSafeAreaInsets();
  const { width, height } = useWindowDimensions();
  const contentHeight = height - insets.top - insets.bottom;
  const contentCenterY = insets.top + contentHeight / 2;

  return {
    insets,
    width,
    height,
    contentHeight,
    contentCenterY,
  };
}
