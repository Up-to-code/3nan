/**
 * WHY: Maps EmotionCode to motion function for timeline scheduling.
 * HOW: Record of code -> motion; neutral is no-op scale reset.
 * EDIT: Add new emotion: add motion file, add to registry.
 * RELATED: loopHappyMotion, loopSadMotion, loopCalmMotion, useEmotionScheduler
 */

import { withTiming, ReduceMotion } from 'react-native-reanimated';
import type { MotionContext } from '../types';
import { loopHappyMotion } from './loopHappyMotion';
import { loopSadMotion } from './loopSadMotion';
import { loopCalmMotion } from './loopCalmMotion';
import type { EmotionCode, EmotionMotion } from './types';

function neutralMotion(ctx: MotionContext): void {
  ctx.scale.value = withTiming(1, {
    duration: 200,
    reduceMotion: ReduceMotion.System,
  });
}

export const EMOTION_REGISTRY: Record<EmotionCode, EmotionMotion> = {
  h: loopHappyMotion,
  s: loopSadMotion,
  c: loopCalmMotion,
  n: neutralMotion,
};
