import { useCallback, useEffect } from 'react';
import {
  cancelAnimation,
  withTiming,
  Easing,
  runOnJS,
  ReduceMotion,
} from 'react-native-reanimated';
import type { SharedValue } from 'react-native-reanimated';
import { useMotionScreen } from '@/hooks';
import {
  getViewerContentTranslateY,
  VIEWER_CONTENT_CIRCLE_MIN,
  VIEWER_CONTENT_CIRCLE_MAX,
  CONTENT_FADE_DURATION,
} from '../Avatar.constants';
import {
  transitionToViewerContentMotion,
  transitionToAssistantViewMotion,
  loopBreathingMotion,
} from '../motions';

const VIEWER_CONTENT_BREATHING_RANGE = {
  min: VIEWER_CONTENT_CIRCLE_MIN,
  max: VIEWER_CONTENT_CIRCLE_MAX,
};

export interface UseTransitionMotionsOptions {
  size: SharedValue<number>;
  translateY: SharedValue<number>;
  scale: SharedValue<number>;
  contentOpacity: SharedValue<number>;
  /** Y position of the Avatar's parent center (from onLayout). Used for viewer content positioning. */
  parentCenterY?: number;
}

export interface UseTransitionMotionsReturn {
  transitionToViewerContent: () => void;
  transitionToAssistantView: (onComplete?: () => void) => void;
}

export function useTransitionMotions(
  options: UseTransitionMotionsOptions
): UseTransitionMotionsReturn {
  const { size, translateY, scale, contentOpacity, parentCenterY } = options;
  const { insets, contentCenterY } = useMotionScreen();

  const ctx = { size, translateY, scale };

  useEffect(() => {
    transitionToAssistantViewMotion(ctx);
  }, []);

  const transitionToViewerContent = useCallback(() => {
    cancelAnimation(contentOpacity);
    const centerY = parentCenterY ?? contentCenterY;
    const targetTranslateY = getViewerContentTranslateY(
      insets.top,
      VIEWER_CONTENT_CIRCLE_MIN,
      centerY
    );
    const onCircleComplete = () => {
      try {
        contentOpacity.value = withTiming(1, {
          duration: CONTENT_FADE_DURATION,
          easing: Easing.out(Easing.ease),
          reduceMotion: ReduceMotion.System,
        });
        loopBreathingMotion(ctx, VIEWER_CONTENT_BREATHING_RANGE);
      } catch (_) {
        // Guard against worklet/JS thread errors
      }
    };
    transitionToViewerContentMotion(ctx, targetTranslateY, onCircleComplete);
  }, [insets.top, contentCenterY, parentCenterY, contentOpacity]);

  const onFadeComplete = useCallback((complete?: () => void) => {
    transitionToAssistantViewMotion(ctx);
    complete?.();
  }, []);

  const transitionToAssistantView = useCallback(
    (onComplete?: () => void) => {
      cancelAnimation(contentOpacity);
      contentOpacity.value = withTiming(
        0,
        {
          duration: CONTENT_FADE_DURATION,
          easing: Easing.in(Easing.ease),
          reduceMotion: ReduceMotion.System,
        },
        (finished) => {
          'worklet';
          if (finished) {
            runOnJS(onFadeComplete)(onComplete);
          }
        }
      );
    },
    [contentOpacity, onFadeComplete]
  );

  return {
    transitionToViewerContent,
    transitionToAssistantView,
  };
}
