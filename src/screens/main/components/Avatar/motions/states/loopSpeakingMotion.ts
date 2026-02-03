/**
 * WHY: Speaking state loop - avatar breathes while speaking.
 * HOW: Wraps loopBreathingMotion with speaking size range.
 * EDIT: Change range in config/constants; motion logic here.
 * RELATED: loopBreathingMotion, useAvatarState, config/constants
 */

import { loopBreathingMotion } from '../breathing';
import type { MotionContext } from '../types';
import type { BreathingSizeRange } from '../breathing';
import { SPEAKING_SIZE_MIN, SPEAKING_SIZE_MAX } from '../../config/constants';

const DEFAULT_SPEAKING_RANGE: BreathingSizeRange = {
  min: SPEAKING_SIZE_MIN,
  max: SPEAKING_SIZE_MAX,
};

export function loopSpeakingMotion(
  ctx: MotionContext,
  range?: BreathingSizeRange
): void {
  loopBreathingMotion(ctx, range ?? DEFAULT_SPEAKING_RANGE);
}
