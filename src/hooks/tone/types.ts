/**
 * Avatar motion timeline types for TOON parsing.
 * Token-efficient format: states[N]{st,f,to}, emotions[N]{e,f,to}
 */

export type AvatarState = 'listen' | 'speak' | 'idle';

export type EmotionCode = 'h' | 's' | 'c' | 'n';

export interface StateSegment {
  st: AvatarState;
  f: number;
  to: number;
}

export interface EmotionSegment {
  e: EmotionCode;
  f: number;
  to: number;
}

export interface MotionTimeline {
  states?: StateSegment[];
  emotions?: EmotionSegment[];
}

/**
 * Raw parsed TOON object (before normalization).
 * Keys match TOON schema: states, emotions with tabular arrays.
 */
export interface ParsedToonTimeline {
  states?: Array<{ st: string; f: number; to: number }>;
  emotions?: Array<{ e: string; f: number; to: number }>;
}
