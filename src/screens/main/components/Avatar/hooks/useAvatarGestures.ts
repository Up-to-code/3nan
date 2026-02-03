/**
 * WHY: Centralizes Avatar gesture logic (double-tap, touch) for reuse and testability.
 * HOW: Returns composed gesture when gestureMode allows; double-tap toggles silent/speaking.
 * EDIT: Add new gesture: add here; change gestureMode in Avatar.tsx.
 * RELATED: Avatar.tsx, useAvatarMotions, config/types (AvatarGestureMode)
 */

import { useCallback, useMemo, useRef } from 'react';
import { Gesture } from 'react-native-gesture-handler';
import { runOnJS } from 'react-native-reanimated';
import type { AvatarGestureMode, AvatarStateType } from '../config/types';

const DOUBLE_TAP_COOLDOWN_MS = 500;

export interface UseAvatarGesturesOptions {
  setState: (state: AvatarStateType) => void;
  currentState: AvatarStateType;
  pauseBreathing: () => void;
  resumeBreathing: () => void;
  triggerHaptic: (type: 'light' | 'medium' | 'heavy') => void;
  gestureMode?: AvatarGestureMode;
}

export interface UseAvatarGesturesReturn {
  /** Undefined when gestureMode is 'none'. */
  composedGesture: ReturnType<typeof Gesture.Simultaneous> | ReturnType<typeof Gesture.Tap> | undefined;
}

export function useAvatarGestures(
  options: UseAvatarGesturesOptions
): UseAvatarGesturesReturn {
  const {
    setState,
    currentState,
    pauseBreathing,
    resumeBreathing,
    triggerHaptic,
    gestureMode = 'full',
  } = options;

  if (gestureMode === 'none') {
    return { composedGesture: undefined };
  }
  const lastDoubleTapTimeRef = useRef(0);

  const onDoubleTap = useCallback(() => {
    const now = Date.now();
    if (now - lastDoubleTapTimeRef.current < DOUBLE_TAP_COOLDOWN_MS) {
      return;
    }
    lastDoubleTapTimeRef.current = now;
    triggerHaptic('light');
    setState(currentState === 'silent' ? 'speaking' : 'silent');
  }, [triggerHaptic, setState, currentState]);

  const doubleTapGesture = useMemo(
    () =>
      Gesture.Tap()
        .numberOfTaps(2)
        .maxDuration(300)
        .onStart(() => runOnJS(onDoubleTap)()),
    [onDoubleTap]
  );

  const handleTouchEnd = useCallback(() => {
    if (currentState !== 'silent') {
      resumeBreathing();
    }
  }, [currentState, resumeBreathing]);

  const touchGesture = useMemo(
    () =>
      Gesture.Pan()
        .minPointers(1)
        .onStart(() => runOnJS(pauseBreathing)())
        .onFinalize(() => runOnJS(handleTouchEnd)()),
    [pauseBreathing, handleTouchEnd]
  );

  const composedGesture = useMemo(() => {
    if (gestureMode === 'doubleTap') {
      return doubleTapGesture;
    }
    return Gesture.Simultaneous(doubleTapGesture, touchGesture);
  }, [gestureMode, doubleTapGesture, touchGesture]);

  return { composedGesture };
}
