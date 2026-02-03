import { ReduceMotion } from 'react-native-reanimated';

export const SPRING = {
  duration: 320,
  dampingRatio: 0.84,
  reduceMotion: ReduceMotion.System,
};

export const SWIPE_THRESHOLD_RATIO = 0.3; // 30% of screen width to trigger open/close
export const VELOCITY_THRESHOLD = 150; // px/s - fast swipe overrides position
export const EDGE_WIDTH_RATIO = 0.1; // 10% of screen for edge-swipe zone
export const ACTIVE_OFFSET_X = 6; // Min horizontal movement before gesture activates
export const FAIL_OFFSET_Y = 20; // Vertical movement that cancels horizontal gesture
export const MIN_DISTANCE = 5;
