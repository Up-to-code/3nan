import type { SharedValue } from 'react-native-reanimated';
import { Gesture } from 'react-native-gesture-handler';
import { withSpring, runOnJS } from 'react-native-reanimated';
import { SPRING, SWIPE_THRESHOLD_RATIO, VELOCITY_THRESHOLD, ACTIVE_OFFSET_X, FAIL_OFFSET_Y, MIN_DISTANCE } from '../constants';

export type OpenPanGestureParams = {
  translateX: SharedValue<number>;
  baseOffset: SharedValue<number>;
  setIsMenuOpen: (open: boolean) => void;
  isRTL: boolean;
  screenWidth: number;
};

export function createOpenPanGesture(params: OpenPanGestureParams) {
  const { translateX, baseOffset, setIsMenuOpen, isRTL, screenWidth } = params;

  return Gesture.Pan()
    .activeOffsetX(isRTL ? -ACTIVE_OFFSET_X : ACTIVE_OFFSET_X)
    .failOffsetY([-FAIL_OFFSET_Y, FAIL_OFFSET_Y])
    .minDistance(MIN_DISTANCE)
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
    });
}
