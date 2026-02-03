import { loopBreathingMotion } from '../avatar';
import type { MotionContext } from '../types';
import { LISTENING_SIZE_MIN, LISTENING_SIZE_MAX } from '../../Avatar.constants';

const LISTENING_RANGE = { min: LISTENING_SIZE_MIN, max: LISTENING_SIZE_MAX };

export function loopListeningMotion(ctx: MotionContext): void {
  loopBreathingMotion(ctx, LISTENING_RANGE);
}
