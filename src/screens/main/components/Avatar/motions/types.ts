import type { SharedValue } from 'react-native-reanimated';

export interface MotionContext {
  size: SharedValue<number>;
  translateY: SharedValue<number>;
  scale: SharedValue<number>;
}

export type TransitionMotion = (ctx: MotionContext) => void;

export type LoopMotion = (ctx: MotionContext) => void;
