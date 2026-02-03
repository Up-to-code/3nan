/**
 * WHY: Parent facade for Avatar ref methods (transitions, emotions, setState).
 * HOW: Wraps avatarRef.current calls with error handling.
 * EDIT: Add new ref method: add here; ensure AvatarRef exposes it.
 * RELATED: Avatar.tsx, useAvatarMotions, config/types (AvatarRef)
 */

import { useCallback, type RefObject } from 'react';
import type { AvatarRef } from '../config/types';
import type { AvatarStateType } from '../config/types';
import type { MotionTimeline } from '@/hooks/tone';


export interface UseAvatarInteractionOptions {
  avatarRef: RefObject<AvatarRef | null>;
  setIsViewerContent: (value: boolean) => void;
}

export function useAvatarInteraction({
  avatarRef,
  setIsViewerContent,
}: UseAvatarInteractionOptions) {
  const transitionToViewerContent = useCallback(() => {
    try {
      setIsViewerContent(true);
    } catch (err) {
      console.error('[useAvatarInteraction] transitionToViewerContent failed:', err);
    }
  }, [setIsViewerContent]);

  const transitionToAssistantView = useCallback(() => {
    try {
      avatarRef.current?.transitionToAssistantView(() => {
        try {
          setIsViewerContent(false);
        } catch (_) {
          console.error('[useAvatarInteraction] onComplete callback failed');
        }
      });
    } catch (err) {
      console.error('[useAvatarInteraction] transitionToAssistantView failed:', err);
      setIsViewerContent(false);
    }
  }, [avatarRef, setIsViewerContent]);

  const playHappy = useCallback(() => {
    avatarRef.current?.playHappy();
  }, [avatarRef]);

  const playSad = useCallback(() => {
    avatarRef.current?.playSad();
  }, [avatarRef]);

  const playCalm = useCallback(() => {
    avatarRef.current?.playCalm();
  }, [avatarRef]);

  const playNeutral = useCallback(() => {
    avatarRef.current?.playEmotion('n');
  }, [avatarRef]);

  const setState = useCallback(
    (state: AvatarStateType) => {
      avatarRef.current?.setState(state);
    },
    [avatarRef]
  );

  const scheduleDemo = useCallback(() => {
    avatarRef.current?.scheduleFromTimeline({
      states: [
        { st: 'listen', f: 0, to: 1500 },
        { st: 'speak', f: 1500, to: 4000 },
      ],
      emotions: [
        { e: 'n', f: 0, to: 1500 },
        { e: 'h', f: 1500, to: 3000 },
        { e: 'c', f: 3000, to: 4000 },
      ],
    });
  }, [avatarRef]);

  return {
    transitionToViewerContent,
    transitionToAssistantView,
    playHappy,
    playSad,
    playCalm,
    playNeutral,
    setState,
    scheduleDemo,
  };
}
