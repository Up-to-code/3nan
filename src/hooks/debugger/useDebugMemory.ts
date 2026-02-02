export interface UseDebugMemoryReturn {
  /** Used memory in MB (null if not available) */
  usedMB: number | null;
  /** Total memory in MB (null if not available) */
  totalMB: number | null;
  /** True if memory stats are available */
  available: boolean;
}

/**
 * Memory usage for debugging. Expo does not expose memory programmatically.
 * Returns stub values. Add react-native-device-info for real metrics.
 */
export function useDebugMemory(): UseDebugMemoryReturn {
  return {
    usedMB: null,
    totalMB: null,
    available: false,
  };
}
