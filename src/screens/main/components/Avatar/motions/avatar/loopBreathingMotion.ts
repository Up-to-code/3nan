import { withTiming, withSequence, withRepeat, Easing, ReduceMotion } from 'react-native-reanimated';
import type { MotionContext } from '../types';
import {
  ASSISTANT_VIEW_SIZE,
  BREATH_SIZE,
  BREATH_SCALE_MIN,
  BREATH_SCALE_MAX,
  BREATH_PHASE_DURATION,
} from '../../Avatar.constants';

export interface BreathingSizeRange {
  min: number;
  max: number;
}

const DEFAULT_RANGE: BreathingSizeRange = {
  min: ASSISTANT_VIEW_SIZE,
  max: BREATH_SIZE,
};

const TIMING = {
  duration: BREATH_PHASE_DURATION,
  easing: Easing.linear,
  reduceMotion: ReduceMotion.System,
} as const;

export function loopBreathingMotion(
  ctx: MotionContext,
  range: BreathingSizeRange = DEFAULT_RANGE
): void {
  const { size, scale } = ctx;
  const baseSize = range.min;
  size.value = baseSize;
  scale.value = withRepeat(
    withSequence(
      withTiming(BREATH_SCALE_MAX, TIMING),
      withTiming(BREATH_SCALE_MIN, TIMING)
    ),
    -1
  );
}
