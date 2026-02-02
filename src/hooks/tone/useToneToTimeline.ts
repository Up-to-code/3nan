import { useCallback, useState } from 'react';
import { decode } from '@toon-format/toon';
import type {
  MotionTimeline,
  StateSegment,
  EmotionSegment,
  AvatarState,
  EmotionCode,
} from './types';

const VALID_STATES: AvatarState[] = ['listen', 'speak', 'idle'];
const VALID_EMOTIONS: EmotionCode[] = ['h', 's', 'c', 'n'];

function isStateSegment(x: unknown): x is StateSegment {
  if (!x || typeof x !== 'object') return false;
  const o = x as Record<string, unknown>;
  return (
    typeof o.st === 'string' &&
    VALID_STATES.includes(o.st as AvatarState) &&
    typeof o.f === 'number' &&
    typeof o.to === 'number'
  );
}

function isEmotionSegment(x: unknown): x is EmotionSegment {
  if (!x || typeof x !== 'object') return false;
  const o = x as Record<string, unknown>;
  return (
    typeof o.e === 'string' &&
    VALID_EMOTIONS.includes(o.e as EmotionCode) &&
    typeof o.f === 'number' &&
    typeof o.to === 'number'
  );
}

export interface UseToneToTimelineReturn {
  timeline: MotionTimeline | null;
  parseFromToon: (toon: string) => MotionTimeline | null;
  error: Error | null;
  clearError: () => void;
}

/**
 * Parses TOON string into normalized MotionTimeline.
 * Expects: states[N]{st,f,to}, emotions[N]{e,f,to}
 */
export function useToneToTimeline(): UseToneToTimelineReturn {
  const [timeline, setTimeline] = useState<MotionTimeline | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const parseFromToon = useCallback((toon: string): MotionTimeline | null => {
    setError(null);
    try {
      const raw = decode(toon, { strict: false });
      if (!raw || typeof raw !== 'object') {
        setTimeline(null);
        return null;
      }
      const obj = raw as Record<string, unknown>;
      const result: MotionTimeline = {};

      if (Array.isArray(obj.states)) {
        result.states = obj.states.filter(isStateSegment) as StateSegment[];
      }
      if (Array.isArray(obj.emotions)) {
        result.emotions = obj.emotions.filter(isEmotionSegment) as EmotionSegment[];
      }

      setTimeline(result);
      return result;
    } catch (err) {
      const e = err instanceof Error ? err : new Error(String(err));
      setError(e);
      setTimeline(null);
      return null;
    }
  }, []);

  const clearError = useCallback(() => setError(null), []);

  return { timeline, parseFromToon, error, clearError };
}
