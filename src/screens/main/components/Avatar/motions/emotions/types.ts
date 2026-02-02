import type { MotionContext } from '../types';

export type EmotionCode = 'h' | 's' | 'c' | 'n';

export type EmotionMotion = (ctx: MotionContext) => void;
