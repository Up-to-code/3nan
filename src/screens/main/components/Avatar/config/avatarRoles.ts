/**
 * WHY: Role-based motion mapping. Add a role = add one line here.
 * HOW: Maps AvatarRole to motion config (state loop, breathing, or transition).
 * EDIT: Add new role: add entry; add new motion: add to motions/ then reference here.
 * RELATED: types.ts, useAvatarState, useAvatarMotions, motions/states, motions/breathing
 */

import type { AvatarRole, AvatarStateType } from './types';

export type RoleMotionType = 'state' | 'breathing' | 'transition';

export interface RoleMotionConfig {
  type: RoleMotionType;
  /** For type 'state': which state loop to run. */
  state?: AvatarStateType;
  /** For type 'transition': which transition. */
  transition?: 'viewerContent' | 'assistantView';
}

/** Role -> motion config. Add role = add motion. */
export const AVATAR_ROLES: Record<AvatarRole, RoleMotionConfig> = {
  listening: { type: 'state', state: 'listening' },
  speaking: { type: 'state', state: 'speaking' },
  silent: { type: 'state', state: 'silent' },
  idle: { type: 'breathing' },
  contentShowing: { type: 'transition', transition: 'viewerContent' },
};
