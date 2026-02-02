import { withSpring, withSequence, withRepeat, ReduceMotion } from 'react-native-reanimated';
import type { MotionContext } from '../types';
import {
  ASSISTANT_VIEW_SIZE,
  BREATH_SIZE,
  APPLE_SPRING_BREATHING,
} from '../../Avatar.constants';

export interface BreathingSizeRange {
  min: number;
  max: number;
}

const DEFAULT_RANGE: BreathingSizeRange = {
  min: ASSISTANT_VIEW_SIZE,
  max: BREATH_SIZE,
};

const SPRING = { ...APPLE_SPRING_BREATHING, reduceMotion: ReduceMotion.System };

export function loopBreathingMotion(
  ctx: MotionContext,
  range: BreathingSizeRange = DEFAULT_RANGE
): void {
  const { size } = ctx;
  const { min, max } = range;
  size.value = withRepeat(
    withSequence(
      withSpring(max, SPRING),
      withSpring(min, SPRING)
    ),
    -1
  );
}
