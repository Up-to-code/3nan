import type { MotionTimeline } from '@/hooks/tone';
import { useAvatarLoopMotions } from './useAvatarLoopMotions';
import { useTransitionMotions } from './useTransitionMotions';
import { useAvatarState } from './useAvatarState';
import { useEmotionScheduler } from './useEmotionScheduler';

export interface UseAvatarMotionsOptions {
  /** Y position of the Avatar's parent center (from onLayout). Used for viewer content positioning. */
  parentCenterY?: number;
}

export interface UseAvatarMotionsReturn {
  size: ReturnType<typeof useAvatarLoopMotions>['size'];
  translateY: ReturnType<typeof useAvatarLoopMotions>['translateY'];
  scale: ReturnType<typeof useAvatarLoopMotions>['scale'];
  lineVisible: ReturnType<typeof useAvatarLoopMotions>['lineVisible'];
  contentOpacity: ReturnType<typeof useAvatarLoopMotions>['contentOpacity'];
  transitionToViewerContent: () => void;
  transitionToAssistantView: (onComplete?: () => void) => void;
  pauseBreathing: () => void;
  resumeBreathing: ReturnType<typeof useAvatarLoopMotions>['resumeBreathing'];
  playHappy: () => void;
  playSad: () => void;
  playCalm: () => void;
  playEmotion: ReturnType<typeof useAvatarLoopMotions>['playEmotion'];
  setState: ReturnType<typeof useAvatarState>['setState'];
  currentState: ReturnType<typeof useAvatarState>['currentState'];
  scheduleFromTimeline: (timeline: MotionTimeline) => void;
}

export function useAvatarMotions(
  options: UseAvatarMotionsOptions = {}
): UseAvatarMotionsReturn {
  const loopMotions = useAvatarLoopMotions();
  const transitions = useTransitionMotions({
    size: loopMotions.size,
    translateY: loopMotions.translateY,
    scale: loopMotions.scale,
    contentOpacity: loopMotions.contentOpacity,
    parentCenterY: options.parentCenterY,
  });

  const avatarState = useAvatarState({
    size: loopMotions.size,
    translateY: loopMotions.translateY,
    scale: loopMotions.scale,
  });

  const emotionScheduler = useEmotionScheduler({
    playEmotion: loopMotions.playEmotion,
    setState: avatarState.setState,
  });

  return {
    ...loopMotions,
    ...transitions,
    setState: avatarState.setState,
    currentState: avatarState.currentState,
    scheduleFromTimeline: emotionScheduler.scheduleFromTimeline,
  };
}
