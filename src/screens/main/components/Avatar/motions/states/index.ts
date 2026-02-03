/**
 * WHY: Barrel for state-based loops (listening, speaking, silent).
 * HOW: Re-exports loop motions used by useAvatarState.
 * EDIT: Add new state loop here and in useAvatarState.
 * RELATED: useAvatarState, motions/breathing, config/avatarRoles
 */

export { loopListeningMotion } from './loopListeningMotion';
export { loopSpeakingMotion } from './loopSpeakingMotion';
export { loopSilentMotion } from './loopSilentMotion';
