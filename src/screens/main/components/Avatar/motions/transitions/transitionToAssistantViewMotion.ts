import { withSpring, withSequence, withRepeat, ReduceMotion } from 'react-native-reanimated';
import type { MotionContext } from '../types';
import {
  ASSISTANT_VIEW_SIZE,
  BREATH_SIZE,
  APPLE_SPRING_SNAPPY,
  APPLE_SPRING_BREATHING,
} from '../../Avatar.constants';

const SPRING_SNAPPY = { ...APPLE_SPRING_SNAPPY, reduceMotion: ReduceMotion.System };
const SPRING_BREATHING = { ...APPLE_SPRING_BREATHING, reduceMotion: ReduceMotion.System };

export function transitionToAssistantViewMotion(ctx: MotionContext): void {
  const { size, translateY, scale } = ctx;
  translateY.value = withSpring(0, SPRING_SNAPPY);
  size.value = withSequence(
    withSpring(ASSISTANT_VIEW_SIZE, { ...SPRING_SNAPPY, duration: 300 }),
    withRepeat(
      withSequence(
        withSpring(BREATH_SIZE, SPRING_BREATHING),
        withSpring(ASSISTANT_VIEW_SIZE, SPRING_BREATHING)
      ),
      -1
    )
  );
  scale.value = withSpring(1, SPRING_SNAPPY);
}
