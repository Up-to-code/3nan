import type { EmotionCode } from '@/hooks/tone';
import type { MotionContext } from '../types';

export type { EmotionCode };

export type EmotionMotion = (ctx: MotionContext) => void;
