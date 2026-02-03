/**
 * WHY: Syncs line visibility with Avatar state (silent = line shown).
 * HOW: Animates lineVisible SharedValue when currentState changes.
 * EDIT: Change timing in config/constants; state mapping here.
 * RELATED: Avatar.tsx, useAvatarMotions, config/constants
 */

import { useEffect } from 'react';
import { withTiming, Easing, ReduceMotion } from 'react-native-reanimated';
import type { SharedValue } from 'react-native-reanimated';
import type { AvatarStateType } from '../config/types';
import { LINE_ANIM_DURATION } from '../config/constants';

const LINE_VISIBILITY_TIMING = {
  duration: LINE_ANIM_DURATION,
  easing: Easing.out(Easing.ease),
  reduceMotion: ReduceMotion.System,
} as const;

export interface UseAvatarLineVisibilityOptions {
  currentState: AvatarStateType;
  lineVisible: SharedValue<number>;
}

export function useAvatarLineVisibility(
  options: UseAvatarLineVisibilityOptions
): void {
  const { currentState, lineVisible } = options;
  const lineShown = currentState === 'silent';

  useEffect(() => {
    lineVisible.value = withTiming(lineShown ? 1 : 0, LINE_VISIBILITY_TIMING);
  }, [lineShown, lineVisible]);
}
