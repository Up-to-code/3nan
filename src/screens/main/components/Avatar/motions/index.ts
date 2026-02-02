export {
  loopBreathingMotion,
  loopCalmMotion,
  loopHappyMotion,
  loopSadMotion,
  type BreathingSizeRange,
} from './avatar';
export {
  EMOTION_REGISTRY,
  loopListeningMotion,
  loopSpeakingMotion,
  loopSilentMotion,
  type EmotionCode,
  type EmotionMotion,
} from './emotions';
export {
  transitionToViewerContentMotion,
  transitionToAssistantViewMotion,
} from './transitions';
export type { MotionContext, TransitionMotion, LoopMotion } from './types';
