import { useMemo, useCallback, useState } from 'react';
import { Dimensions } from 'react-native';
import {
  useSharedValue,
  useAnimatedStyle,
  useDerivedValue,
  withSpring,
  interpolate,
  Extrapolation,
} from 'react-native-reanimated';
import { SPRING, EDGE_WIDTH_RATIO } from './constants';
import { createOpenPanGesture, createClosePanGesture } from './gestures';

/**
 * Handles swipe-to-open/close menu gestures with RTL support.
 * - Edge swipe from left/right opens menu
 * - Swipe on main content closes menu
 */
export function useMenuSwipe(isRTL: boolean) {
  const { width: screenWidth } = Dimensions.get('window');
  const edgeWidth = screenWidth * EDGE_WIDTH_RATIO;
  const translateX = useSharedValue(0);
  const baseOffset = useSharedValue(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const open = useCallback(() => {
    setIsMenuOpen(true);
    translateX.value = withSpring(isRTL ? -screenWidth : screenWidth, SPRING);
  }, [isRTL, screenWidth]);

  const close = useCallback(() => {
    setIsMenuOpen(false);
    translateX.value = withSpring(0, SPRING);
  }, []);

  const gestureParams = useMemo(
    () => ({
      translateX,
      baseOffset,
      setIsMenuOpen,
      isRTL,
      screenWidth,
    }),
    [isRTL, screenWidth]
  );

  const panGesture = useMemo(
    () => createOpenPanGesture(gestureParams),
    [gestureParams]
  );

  const closePanGesture = useMemo(
    () => createClosePanGesture(gestureParams),
    [gestureParams]
  );

  const mainAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const menuProgress = useDerivedValue(() => {
    const raw = isRTL
      ? -translateX.value / screenWidth
      : translateX.value / screenWidth;
    return interpolate(raw, [0, 1], [0, 1], Extrapolation.CLAMP);
  }, [isRTL, screenWidth]);

  return {
    panGesture,
    closePanGesture,
    mainAnimatedStyle,
    menuProgress,
    isMenuOpen,
    open,
    close,
    screenWidth,
    edgeWidth,
  };
}
