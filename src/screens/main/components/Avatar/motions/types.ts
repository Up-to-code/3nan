/**
 * WHY: Shared types for all motion functions (context, signatures).
 * HOW: MotionContext passed to loops/transitions; LoopMotion/TransitionMotion are signatures.
 * EDIT: Add new motion param: extend MotionContext or add new type.
 * RELATED: motions/breathing, motions/emotions, motions/states, motions/transitions
 */

import type { SharedValue } from 'react-native-reanimated';

export interface MotionContext {
  size: SharedValue<number>;
  translateY: SharedValue<number>;
  scale: SharedValue<number>;
}

export type TransitionMotion = (ctx: MotionContext) => void;

export type LoopMotion = (ctx: MotionContext) => void;
