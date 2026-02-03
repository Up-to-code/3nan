/**
 * WHY: Single source of truth for Avatar types used across component, hooks, and config.
 * HOW: Exports AvatarRef, AvatarProps, AvatarRole, AvatarStateType, and gesture mode.
 * EDIT: Add new props/ref methods here; keep in sync with Avatar.tsx and avatarRoles.
 * RELATED: Avatar.tsx, avatarRoles.ts, useAvatarMotions, useAvatarState
 */

import type { SharedValue } from 'react-native-reanimated';
import type { EmotionCode, MotionTimeline } from '@/hooks/tone';

/** State-based loop: listening, speaking, or silent. Maps to motions/states. */
export type AvatarStateType = 'listening' | 'speaking' | 'silent';

/** Higher-level role for one-time or looped motion. Add role = add motion in avatarRoles. */
export type AvatarRole = AvatarStateType | 'idle' | 'contentShowing';

/** Gesture mode: none, double-tap only, or full (double-tap + touch). */
export type AvatarGestureMode = 'none' | 'doubleTap' | 'full';

export interface AvatarRef {
  transitionToViewerContent: () => void;
  transitionToAssistantView: (onComplete?: () => void) => void;
  playHappy: () => void;
  playSad: () => void;
  playCalm: () => void;
  playEmotion: (code: EmotionCode) => void;
  setState: (state: AvatarStateType) => void;
  scheduleFromTimeline: (timeline: MotionTimeline) => void;
  contentOpacity: SharedValue<number>;
}

export interface AvatarProps {
  /** Y position of the Avatar's parent center (from onLayout). Used for viewer content positioning. */
  parentCenterY?: number;
  /** Called when contentOpacity is available for the content overlay. */
  onContentOpacityReady?: (contentOpacity: SharedValue<number>) => void;
  /** Gesture mode: none (no gestures), doubleTap only, or full (double-tap + touch). Default: full. */
  gestureMode?: AvatarGestureMode;
}
