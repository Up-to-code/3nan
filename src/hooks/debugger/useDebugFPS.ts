import { useState, useEffect, useRef } from 'react';

const MAX_FRAME_SAMPLES = 60;
const LOW_FPS_THRESHOLD = 30;
const UI_UPDATE_INTERVAL_MS = 500;

export interface UseDebugFPSReturn {
  /** Approximate frames per second over recent frames */
  fps: number;
  /** True when fps drops below threshold (e.g. jank) */
  isLow: boolean;
}

/**
 * FPS counter with throttled UI updates for real-time display.
 * Computes FPS every frame but updates state only every 500ms to avoid excessive re-renders.
 */
export function useDebugFPS(): UseDebugFPSReturn {
  const [fps, setFps] = useState(60);
  const frameDeltasRef = useRef<number[]>([]);
  const lastTimeRef = useRef<number>(0);
  const latestFpsRef = useRef<number>(60);
  const rafIdRef = useRef<number | null>(null);
  const intervalIdRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const measureFrame = (now: number) => {
      const delta = lastTimeRef.current > 0 ? now - lastTimeRef.current : 0;
      lastTimeRef.current = now;

      if (delta > 0 && delta < 500) {
        frameDeltasRef.current.push(delta);
        if (frameDeltasRef.current.length > MAX_FRAME_SAMPLES) {
          frameDeltasRef.current.shift();
        }
      }

      if (frameDeltasRef.current.length >= 2) {
        const avgDelta =
          frameDeltasRef.current.reduce((a, b) => a + b, 0) / frameDeltasRef.current.length;
        latestFpsRef.current = avgDelta > 0 ? Math.min(Math.round(1000 / avgDelta), 60) : 60;
      }

      rafIdRef.current = requestAnimationFrame(measureFrame);
    };

    rafIdRef.current = requestAnimationFrame(measureFrame);

    intervalIdRef.current = setInterval(() => {
      setFps(latestFpsRef.current);
    }, UI_UPDATE_INTERVAL_MS);

    return () => {
      if (rafIdRef.current != null) {
        cancelAnimationFrame(rafIdRef.current);
      }
      if (intervalIdRef.current != null) {
        clearInterval(intervalIdRef.current);
      }
    };
  }, []);

  return {
    fps,
    isLow: fps < LOW_FPS_THRESHOLD,
  };
}
