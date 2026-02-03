import { loopBreathingMotion } from '../avatar';
import type { MotionContext } from '../types';
import type { BreathingSizeRange } from '../avatar';
import { SPEAKING_SIZE_MIN, SPEAKING_SIZE_MAX } from '../../Avatar.constants';

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
