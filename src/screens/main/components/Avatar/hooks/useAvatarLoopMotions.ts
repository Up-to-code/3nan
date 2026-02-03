/**
 * WHY: SharedValues and loop/emotion motion triggers for Avatar.
 * HOW: Creates size, translateY, scale, etc.; exposes pause/resume, playHappy, etc.
 * EDIT: Add new emotion: add to motions/emotions, add playX here.
 * RELATED: motions/breathing, motions/emotions, useAvatarMotions, useTransitionMotions
 */

import { useCallback } from 'react';
import { useWindowDimensions } from 'react-native';
import { useSharedValue, cancelAnimation } from 'react-native-reanimated';
import { OPENING_SIZE, getAvatarBaseSize } from '../config/constants';
import {
  loopBreathingMotion,
  loopHappyMotion,
  loopSadMotion,
  loopCalmMotion,
  EMOTION_REGISTRY,
} from '../motions';
import type { BreathingSizeRange } from '../motions';
import type { EmotionCode } from '../motions';

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

export function useAvatarLoopMotions(): UseAvatarLoopMotionsReturn {
  const { width: screenWidth } = useWindowDimensions();
  const baseSize = getAvatarBaseSize(screenWidth);
  const size = useSharedValue(OPENING_SIZE);
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);
  const lineVisible = useSharedValue(0);
  const contentOpacity = useSharedValue(0);

  const ctx = { size, translateY, scale };

  const pauseBreathing = useCallback(() => {
    cancelAnimation(size);
    cancelAnimation(scale);
  }, [size, scale]);

  const resumeBreathing = useCallback(
    (range?: BreathingSizeRange) => {
      loopBreathingMotion(ctx, range ?? { min: baseSize, max: baseSize });
    },
    [baseSize]
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
