import { withSpring, runOnJS, ReduceMotion } from 'react-native-reanimated';
import type { MotionContext } from '../types';
import {
  VIEWER_CONTENT_CIRCLE_MIN,
  APPLE_SPRING_SNAPPY,
} from '../../Avatar.constants';

const SPRING_SNAPPY = { ...APPLE_SPRING_SNAPPY, reduceMotion: ReduceMotion.System };

export function transitionToViewerContentMotion(
  ctx: MotionContext,
  targetTranslateY: number,
  onComplete?: () => void
): void {
  const { size, translateY, scale } = ctx;
  const callback = onComplete
    ? (finished?: boolean) => {
        'worklet';
        if (finished) runOnJS(onComplete)();
      }
    : undefined;
  size.value = withSpring(VIEWER_CONTENT_CIRCLE_MIN, SPRING_SNAPPY);
  translateY.value = withSpring(targetTranslateY, SPRING_SNAPPY, callback);
  scale.value = withSpring(1, SPRING_SNAPPY);
}
