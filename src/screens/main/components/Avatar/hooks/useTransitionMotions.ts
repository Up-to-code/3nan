/**
 * WHY: One-time transitions (viewer content <-> assistant view).
 * HOW: Springs size/translateY; fades contentOpacity; starts breathing on complete.
 * EDIT: Change target sizes in config/constants; motion in motions/transitions.
 * RELATED: motions/transitions, useAvatarMotions, config/constants
 */

import { useCallback, useEffect, useRef } from 'react';
import { useWindowDimensions } from 'react-native';
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
  getAvatarBaseSize,
  VIEWER_CONTENT_CIRCLE_MIN,
  VIEWER_CONTENT_CIRCLE_MAX,
  CONTENT_FADE_DURATION,
} from '../config/constants';
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
  const { width: screenWidth } = useWindowDimensions();
  const { insets, contentCenterY } = useMotionScreen();
  const baseSize = getAvatarBaseSize(screenWidth);

  const ctx = { size, translateY, scale };
  const onCompleteRef = useRef<(() => void) | undefined>(undefined);

  useEffect(() => {
    transitionToAssistantViewMotion(ctx, baseSize);
  }, [baseSize]);

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

  const onFadeComplete = useCallback(() => {
    transitionToAssistantViewMotion(ctx, baseSize);
    onCompleteRef.current?.();
    onCompleteRef.current = undefined;
  }, [baseSize]);

  const transitionToAssistantView = useCallback(
    (onComplete?: () => void) => {
      onCompleteRef.current = onComplete;
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
            runOnJS(onFadeComplete)();
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
