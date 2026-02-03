import { loopBreathingMotion } from '../avatar';
import type { MotionContext } from '../types';
import { SPEAKING_SIZE_MIN, SPEAKING_SIZE_MAX } from '../../Avatar.constants';

const SPEAKING_RANGE = { min: SPEAKING_SIZE_MIN, max: SPEAKING_SIZE_MAX };

export function loopSpeakingMotion(ctx: MotionContext): void {
  loopBreathingMotion(ctx, SPEAKING_RANGE);
}
