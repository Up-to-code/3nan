import { useCallback, useRef, useEffect } from 'react';
import type { MotionTimeline, EmotionCode, AvatarState } from '@/hooks/tone';
import type { AvatarStateType } from './useAvatarState';

export interface UseEmotionSchedulerOptions {
  playEmotion: (code: EmotionCode) => void;
  setState: (state: AvatarStateType) => void;
}

export interface UseEmotionSchedulerReturn {
  scheduleFromTimeline: (timeline: MotionTimeline) => void;
  cancel: () => void;
}

const STATE_MAP: Record<AvatarState, AvatarStateType> = {
  listen: 'listening',
  speak: 'speaking',
  idle: 'silent',
};

export function useEmotionScheduler(
  options: UseEmotionSchedulerOptions
): UseEmotionSchedulerReturn {
  const { playEmotion, setState } = options;
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const cancel = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
  }, []);

  useEffect(() => {
    return cancel;
  }, [cancel]);

  const scheduleFromTimeline = useCallback(
    (timeline: MotionTimeline) => {
      cancel();

      if (timeline.states) {
        for (const seg of timeline.states) {
          const id = setTimeout(() => {
            const state = STATE_MAP[seg.st];
            if (state) setState(state);
          }, seg.f);
          timeoutsRef.current.push(id);
        }
      }

      if (timeline.emotions) {
        for (const seg of timeline.emotions) {
          const id = setTimeout(() => playEmotion(seg.e), seg.f);
          timeoutsRef.current.push(id);
        }
      }
    },
    [playEmotion, setState, cancel]
  );

  return { scheduleFromTimeline, cancel };
}
