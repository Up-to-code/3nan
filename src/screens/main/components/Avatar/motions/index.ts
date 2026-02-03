/**
 * WHY: Barrel for all Avatar motions (breathing, emotions, states, transitions).
 * HOW: Re-exports from subfolders for hooks and Avatar.
 * EDIT: Add new motion folder: add exports here.
 * RELATED: useAvatarMotions, useAvatarLoopMotions, useAvatarState, useTransitionMotions
 */

export {
  loopBreathingMotion,
  type BreathingSizeRange,
} from './breathing';
export {
  EMOTION_REGISTRY,
  loopHappyMotion,
  loopSadMotion,
  loopCalmMotion,
  type EmotionCode,
  type EmotionMotion,
} from './emotions';
export {
  loopListeningMotion,
  loopSpeakingMotion,
  loopSilentMotion,
} from './states';
export {
  transitionToViewerContentMotion,
  transitionToAssistantViewMotion,
} from './transitions';
export type { MotionContext, TransitionMotion, LoopMotion } from './types';
