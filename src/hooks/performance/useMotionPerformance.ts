import { useState, useEffect, useRef } from 'react';

const MAX_FRAME_SAMPLES = 60;
const LOW_FPS_THRESHOLD = 30;

export interface UseMotionPerformanceReturn {
  /** Approximate frames per second over recent frames */
  fps: number;
  /** True when fps drops below threshold (e.g. jank) */
  isLow: boolean;
}

/**
 * Lightweight FPS counter for motion/animation performance monitoring.
 * Uses requestAnimationFrame to measure frame timing.
 */
export function useMotionPerformance(): UseMotionPerformanceReturn {
  const [fps, setFps] = useState(60);
  const frameDeltasRef = useRef<number[]>([]);
  const lastTimeRef = useRef<number>(0);
  const rafIdRef = useRef<number | null>(null);

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
        const computedFps = avgDelta > 0 ? Math.round(1000 / avgDelta) : 60;
        setFps(Math.min(computedFps, 60));
      }

      rafIdRef.current = requestAnimationFrame(measureFrame);
    };

    rafIdRef.current = requestAnimationFrame(measureFrame);

    return () => {
      if (rafIdRef.current != null) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, []);

  return {
    fps,
    isLow: fps < LOW_FPS_THRESHOLD,
  };
}
