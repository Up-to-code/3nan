import { useCallback, useState } from 'react';
import { decode } from '@toon-format/toon';
import type { ParsedToonTimeline } from './types';

export interface UseToneParseReturn {
  parse: (toon: string) => unknown;
  error: Error | null;
  clearError: () => void;
}

/**
 * Decodes a TOON string into a JavaScript value.
 * Use for raw parsing; combine with useToneToTimeline for normalized timeline.
 */
export function useToneParse(): UseToneParseReturn {
  const [error, setError] = useState<Error | null>(null);

  const parse = useCallback((toon: string): unknown => {
    setError(null);
    try {
      const result = decode(toon, { strict: false });
      return result;
    } catch (err) {
      const e = err instanceof Error ? err : new Error(String(err));
      setError(e);
      return null;
    }
  }, []);

  const clearError = useCallback(() => setError(null), []);

  return { parse, error, clearError };
}
