import { loopBreathingMotion } from '../avatar';
import type { MotionContext } from '../types';
import { SILENT_SIZE_MIN, SILENT_SIZE_MAX } from '../../Avatar.constants';

const SILENT_RANGE = { min: SILENT_SIZE_MIN, max: SILENT_SIZE_MAX };

export function loopSilentMotion(ctx: MotionContext): void {
  loopBreathingMotion(ctx, SILENT_RANGE);
}
