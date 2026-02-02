import {
  withSpring,
  withTiming,
  withSequence,
  withRepeat,
  Easing,
  ReduceMotion,
} from 'react-native-reanimated';
import type { MotionContext } from '../types';
import {
  APPLE_SPRING_SNAPPY,
  BREATH_SCALE_MIN,
  BREATH_SCALE_MAX,
  BREATH_PHASE_DURATION,
} from '../../Avatar.constants';

const SPRING_SNAPPY = { ...APPLE_SPRING_SNAPPY, reduceMotion: ReduceMotion.System };
const TIMING = {
  duration: BREATH_PHASE_DURATION,
  easing: Easing.linear,
  reduceMotion: ReduceMotion.System,
} as const;

export function transitionToAssistantViewMotion(
  ctx: MotionContext,
  baseSize: number
): void {
  const { size, translateY, scale } = ctx;
  translateY.value = withSpring(0, SPRING_SNAPPY);
  size.value = withSpring(baseSize, { ...SPRING_SNAPPY, duration: 300 });
  scale.value = withSequence(
    withSpring(1, SPRING_SNAPPY),
    withRepeat(
      withSequence(
        withTiming(BREATH_SCALE_MAX, TIMING),
        withTiming(BREATH_SCALE_MIN, TIMING)
      ),
      -1
    )
  );
}
