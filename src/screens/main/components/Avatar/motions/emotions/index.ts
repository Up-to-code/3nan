/**
 * WHY: Barrel for emotion bursts (happy, sad, calm) and registry.
 * HOW: Re-exports EMOTION_REGISTRY and emotion motion types.
 * EDIT: Add new emotion: add motion file, add to registry, export here.
 * RELATED: useAvatarLoopMotions, useEmotionScheduler, motions/breathing
 */

export { EMOTION_REGISTRY } from './registry';
export { loopHappyMotion } from './loopHappyMotion';
export { loopSadMotion } from './loopSadMotion';
export { loopCalmMotion } from './loopCalmMotion';
export type { EmotionCode, EmotionMotion } from './types';
