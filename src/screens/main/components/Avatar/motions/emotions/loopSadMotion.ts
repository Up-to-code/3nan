/**
 * WHY: Sad emotion burst - subtle scale down then spring back.
 * HOW: One-shot scale animation. Used by EMOTION_REGISTRY.
 * EDIT: Change timing/scale here; registry in same folder.
 * RELATED: registry.ts, useAvatarLoopMotions, config/constants
 */

import {
  withTiming,
  withSequence,
  withSpring,
  Easing,
  ReduceMotion,
} from 'react-native-reanimated';
import type { MotionContext } from '../types';
import { APPLE_SPRING_SUBTLE } from '../../config/constants';

const SPRING_CONFIG = { ...APPLE_SPRING_SUBTLE, reduceMotion: ReduceMotion.System };

export function loopSadMotion(ctx: MotionContext): void {
  const { scale } = ctx;
  scale.value = withSequence(
    withTiming(0.97, {
      duration: 150,
      easing: Easing.inOut(Easing.ease),
      reduceMotion: ReduceMotion.System,
    }),
    withSpring(1, SPRING_CONFIG)
  );
}
