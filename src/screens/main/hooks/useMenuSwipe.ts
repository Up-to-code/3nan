import { useMemo, useCallback, useState } from 'react';
import { Dimensions } from 'react-native';
import { Gesture } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useDerivedValue,
  withSpring,
  runOnJS,
  ReduceMotion,
  interpolate,
  Extrapolation,
} from 'react-native-reanimated';

const SPRING = {
  duration: 320,
  dampingRatio: 0.84,
  reduceMotion: ReduceMotion.System,
};
const SWIPE_THRESHOLD_RATIO = 0.3;
const VELOCITY_THRESHOLD = 150;
const EDGE_WIDTH_RATIO = 0.1;
const ACTIVE_OFFSET_X = 6;

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

  const panGesture = useMemo(
    () =>
      Gesture.Pan()
        .activeOffsetX(isRTL ? -ACTIVE_OFFSET_X : ACTIVE_OFFSET_X)
        .failOffsetY([-20, 20])
        .minDistance(5)
        .onStart(() => {
          'worklet';
          baseOffset.value = translateX.value;
        })
        .onUpdate((e) => {
          'worklet';
          const delta = isRTL ? -e.translationX : e.translationX;
          const target = baseOffset.value + delta;
          const min = isRTL ? -screenWidth : 0;
          const max = isRTL ? 0 : screenWidth;
          translateX.value = Math.max(min, Math.min(max, target));
        })
        .onEnd((e) => {
          'worklet';
          const current = translateX.value;
          const velocity = isRTL ? -e.velocityX : e.velocityX;
          const threshold = screenWidth * SWIPE_THRESHOLD_RATIO;
          const shouldOpen =
            (isRTL ? current < -threshold : current > threshold) ||
            velocity > VELOCITY_THRESHOLD;
          const toValue = shouldOpen ? (isRTL ? -screenWidth : screenWidth) : 0;
          translateX.value = withSpring(toValue, SPRING);
          runOnJS(setIsMenuOpen)(shouldOpen);
        }),
    [isRTL, screenWidth]
  );

  const closePanGesture = useMemo(
    () =>
      Gesture.Pan()
        .activeOffsetX(isRTL ? ACTIVE_OFFSET_X : -ACTIVE_OFFSET_X)
        .failOffsetY([-20, 20])
        .minDistance(5)
        .onStart(() => {
          'worklet';
          baseOffset.value = translateX.value;
        })
        .onUpdate((e) => {
          'worklet';
          const delta = isRTL ? -e.translationX : e.translationX;
          const target = baseOffset.value + delta;
          const min = isRTL ? -screenWidth : 0;
          const max = isRTL ? 0 : screenWidth;
          translateX.value = Math.max(min, Math.min(max, target));
        })
        .onEnd((e) => {
          'worklet';
          const current = translateX.value;
          const velocity = isRTL ? -e.velocityX : e.velocityX;
          const threshold = screenWidth * SWIPE_THRESHOLD_RATIO;
          const shouldClose =
            (isRTL ? current > -threshold : current < threshold) ||
            velocity < -VELOCITY_THRESHOLD;
          const toValue = shouldClose ? 0 : (isRTL ? -screenWidth : screenWidth);
          translateX.value = withSpring(toValue, SPRING);
          runOnJS(setIsMenuOpen)(!shouldClose);
        }),
    [isRTL, screenWidth]
  );

  const mainAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const menuProgress = useDerivedValue(() => {
    const raw = isRTL ? -translateX.value / screenWidth : translateX.value / screenWidth;
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
