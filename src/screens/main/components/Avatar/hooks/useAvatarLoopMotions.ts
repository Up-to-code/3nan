import { useCallback } from 'react';
import { useSharedValue, cancelAnimation } from 'react-native-reanimated';
import { OPENING_SIZE } from '../Avatar.constants';
import {
  loopBreathingMotion,
  loopHappyMotion,
  loopSadMotion,
  loopCalmMotion,
  EMOTION_REGISTRY,
} from '../motions';
import type { BreathingSizeRange } from '../motions';
import type { EmotionCode } from '../motions';
import {
  ASSISTANT_VIEW_SIZE,
  BREATH_SIZE,
  VIEWER_CONTENT_CIRCLE_MIN,
  VIEWER_CONTENT_CIRCLE_MAX,
} from '../Avatar.constants';

export interface UseAvatarLoopMotionsReturn {
  size: ReturnType<typeof useSharedValue<number>>;
  translateY: ReturnType<typeof useSharedValue<number>>;
  scale: ReturnType<typeof useSharedValue<number>>;
  lineVisible: ReturnType<typeof useSharedValue<number>>;
  contentOpacity: ReturnType<typeof useSharedValue<number>>;
  pauseBreathing: () => void;
  resumeBreathing: (range?: BreathingSizeRange) => void;
  playHappy: () => void;
  playSad: () => void;
  playCalm: () => void;
  playEmotion: (code: EmotionCode) => void;
}

const ASSISTANT_BREATHING_RANGE: BreathingSizeRange = {
  min: ASSISTANT_VIEW_SIZE,
  max: BREATH_SIZE,
};

export function useAvatarLoopMotions(): UseAvatarLoopMotionsReturn {
  const size = useSharedValue(OPENING_SIZE);
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);
  const lineVisible = useSharedValue(0);
  const contentOpacity = useSharedValue(0);

  const ctx = { size, translateY, scale };

  const pauseBreathing = useCallback(() => {
    cancelAnimation(size);
  }, [size]);

  const resumeBreathing = useCallback(
    (range: BreathingSizeRange = ASSISTANT_BREATHING_RANGE) => {
      loopBreathingMotion(ctx, range);
    },
    []
  );

  const playHappy = useCallback(() => {
    loopHappyMotion(ctx);
  }, []);

  const playSad = useCallback(() => {
    loopSadMotion(ctx);
  }, []);

  const playCalm = useCallback(() => {
    loopCalmMotion(ctx);
  }, []);

  const playEmotion = useCallback((code: EmotionCode) => {
    const motion = EMOTION_REGISTRY[code];
    if (motion) motion(ctx);
  }, []);

  return {
    size,
    translateY,
    scale,
    lineVisible,
    contentOpacity,
    pauseBreathing,
    resumeBreathing,
    playHappy,
    playSad,
    playCalm,
    playEmotion,
  };
}
