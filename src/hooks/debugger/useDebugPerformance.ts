import { useEffect, useRef } from 'react';
import { useDebugFPS } from './useDebugFPS';
import { useDebugMemory } from './useDebugMemory';

const CONSOLE_LOG_INTERVAL_MS = 1500;

export interface UseDebugPerformanceOptions {
  /** Enable console logging to terminal (default: __DEV__) */
  enableConsoleLog?: boolean;
}

export interface UseDebugPerformanceReturn {
  fps: number;
  isLow: boolean;
  memory: {
    usedMB: number | null;
    totalMB: number | null;
    available: boolean;
  };
}

/**
 * Combined debug performance hook: FPS + memory + console logger.
 * Logs metrics to terminal at throttled interval for debugging.
 */
export function useDebugPerformance(
  options: UseDebugPerformanceOptions = {}
): UseDebugPerformanceReturn {
  const { enableConsoleLog = __DEV__ } = options;
  const { fps, isLow } = useDebugFPS();
  const memory = useDebugMemory();
  const latestRef = useRef({ fps, memory });

  latestRef.current = { fps, memory };

  useEffect(() => {
    if (!enableConsoleLog) return;

    const intervalId = setInterval(() => {
      const { fps: currentFps, memory: currentMem } = latestRef.current;
      const memStr = currentMem.available
        ? `${currentMem.usedMB}MB / ${currentMem.totalMB}MB`
        : 'N/A';
      console.log(`[Perf] FPS: ${currentFps} | RAM: ${memStr}`);
    }, CONSOLE_LOG_INTERVAL_MS);

    return () => clearInterval(intervalId);
  }, [enableConsoleLog]);

  return {
    fps,
    isLow,
    memory: {
      usedMB: memory.usedMB,
      totalMB: memory.totalMB,
      available: memory.available,
    },
  };
}
