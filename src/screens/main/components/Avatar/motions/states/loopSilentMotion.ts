/**
 * WHY: Silent state - avatar holds still (no breathing).
 * HOW: Cancels animations, sets size and scale to fixed values.
 * EDIT: Change size in config/constants; motion logic here.
 * RELATED: useAvatarState, config/constants
 */

import { cancelAnimation } from 'react-native-reanimated';
import type { MotionContext } from '../types';
import type { BreathingSizeRange } from '../breathing';
import { ASSISTANT_VIEW_SIZE } from '../../config/constants';

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
