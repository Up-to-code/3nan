import {
  withTiming,
  withSequence,
  withSpring,
  Easing,
  ReduceMotion,
} from 'react-native-reanimated';
import type { MotionContext } from '../types';
import { APPLE_SPRING_SUBTLE } from '../../Avatar.constants';

const SPRING_CONFIG = { ...APPLE_SPRING_SUBTLE, reduceMotion: ReduceMotion.System };

export function loopHappyMotion(ctx: MotionContext): void {
  const { scale } = ctx;
  scale.value = withSequence(
    withTiming(1.05, {
      duration: 120,
      easing: Easing.out(Easing.ease),
      reduceMotion: ReduceMotion.System,
    }),
    withSpring(1, SPRING_CONFIG)
  );
}
