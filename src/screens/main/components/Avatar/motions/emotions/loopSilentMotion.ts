import { cancelAnimation } from 'react-native-reanimated';
import type { MotionContext } from '../types';
import type { BreathingSizeRange } from '../avatar';
import { ASSISTANT_VIEW_SIZE } from '../../Avatar.constants';

export function loopSilentMotion(
  ctx: MotionContext,
  range?: BreathingSizeRange
): void {
  const { size, scale } = ctx;
  cancelAnimation(size);
  cancelAnimation(scale);
  size.value = range?.min ?? ASSISTANT_VIEW_SIZE;
  scale.value = 1;
}
