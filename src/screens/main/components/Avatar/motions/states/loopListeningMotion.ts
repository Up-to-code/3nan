/**
 * WHY: Listening state loop - avatar breathes while listening.
 * HOW: Wraps loopBreathingMotion with listening size range.
 * EDIT: Change range in config/constants; motion logic here.
 * RELATED: loopBreathingMotion, useAvatarState, config/constants
 */

import { loopBreathingMotion } from '../breathing';
import type { MotionContext } from '../types';
import type { BreathingSizeRange } from '../breathing';
import { LISTENING_SIZE_MIN, LISTENING_SIZE_MAX } from '../../config/constants';

const DEFAULT_LISTENING_RANGE: BreathingSizeRange = {
  min: LISTENING_SIZE_MIN,
  max: LISTENING_SIZE_MAX,
};

export function loopListeningMotion(
  ctx: MotionContext,
  range?: BreathingSizeRange
): void {
  loopBreathingMotion(ctx, range ?? DEFAULT_LISTENING_RANGE);
}
