import { withTiming, ReduceMotion } from 'react-native-reanimated';
import type { MotionContext } from '../types';
import { loopHappyMotion, loopSadMotion, loopCalmMotion } from '../avatar';
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
