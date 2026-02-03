import { loopBreathingMotion } from '../avatar';
import type { MotionContext } from '../types';
import type { BreathingSizeRange } from '../avatar';
import { LISTENING_SIZE_MIN, LISTENING_SIZE_MAX } from '../../Avatar.constants';

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
