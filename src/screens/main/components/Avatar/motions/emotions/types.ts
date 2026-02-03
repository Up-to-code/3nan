/**
 * WHY: Emotion motion types (code from tone, motion signature).
 * HOW: EmotionCode maps to EmotionMotion in registry.
 * EDIT: Add new code: update @/hooks/tone; add to registry.
 * RELATED: registry.ts, useEmotionScheduler, @/hooks/tone
 */

import type { EmotionCode } from '@/hooks/tone';
import type { MotionContext } from '../types';

export type { EmotionCode };

export type EmotionMotion = (ctx: MotionContext) => void;
