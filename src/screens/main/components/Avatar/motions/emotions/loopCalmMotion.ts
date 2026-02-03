/**
 * WHY: Calm emotion burst - subtle scale pulse.
 * HOW: One-shot scale up then spring back. Used by EMOTION_REGISTRY.
 * EDIT: Change timing/scale here; registry in same folder.
 * RELATED: registry.ts, useAvatarLoopMotions, config/constants
 */

import { withTiming, withSequence, withSpring, Easing, ReduceMotion } from 'react-native-reanimated';
import type { MotionContext } from '../types';
import { APPLE_SPRING_SUBTLE } from '../../config/constants';

const TIMING = { duration: 200, easing: Easing.inOut(Easing.ease), reduceMotion: ReduceMotion.System };
const SPRING = { ...APPLE_SPRING_SUBTLE, reduceMotion: ReduceMotion.System };

export function loopCalmMotion(ctx: MotionContext): void {
  const { scale } = ctx;
  scale.value = withSequence(
    withTiming(1.025, TIMING),
    withSpring(1, SPRING)
  );
}
