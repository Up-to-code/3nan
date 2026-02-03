import React, {
  useCallback,
  useImperativeHandle,
  forwardRef,
  useEffect,
  useMemo,
  useState,
  useRef,
} from 'react';
import { StyleSheet } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useAnimatedProps,
  withTiming,
  Easing,
  runOnJS,
  ReduceMotion,
} from 'react-native-reanimated';
import type { SharedValue } from 'react-native-reanimated';
import Svg, { Line } from 'react-native-svg';
import { styles } from './Avatar.styles';
import { useAvatarMotions } from './hooks';
import {
  ASSISTANT_VIEW_SIZE,
  LINE_ANIM_DURATION,
  LINE_OPACITY,
  LINE_STROKE_WIDTH,
  getLineCoords,
} from './Avatar.constants';
import { useHapticFeedback } from '@/hooks';

const AnimatedLine = Animated.createAnimatedComponent(Line);

const DOUBLE_TAP_COOLDOWN_MS = 500;

import type { AvatarStateType } from './hooks/useAvatarState';
import type { EmotionCode, MotionTimeline } from '@/hooks/tone';

export interface AvatarRef {
  transitionToViewerContent: () => void;
  transitionToAssistantView: (onComplete?: () => void) => void;
  playHappy: () => void;
  playSad: () => void;
  playCalm: () => void;
  playEmotion: (code: EmotionCode) => void;
  setState: (state: AvatarStateType) => void;
  scheduleFromTimeline: (timeline: MotionTimeline) => void;
  contentOpacity: SharedValue<number>;
}

export interface AvatarProps {
  /** Y position of the Avatar's parent center (from onLayout). Used for viewer content positioning. */
  parentCenterY?: number;
  /** Called when contentOpacity is available for the content overlay. */
  onContentOpacityReady?: (contentOpacity: SharedValue<number>) => void;
}

const AvatarComponent = forwardRef<AvatarRef, AvatarProps>(function Avatar(
  { parentCenterY, onContentOpacityReady },
  ref
) {
  const { trigger } = useHapticFeedback();
  const lastDoubleTapTime = useRef(0);

  const {
    size,
    translateY,
    scale,
    lineVisible,
    contentOpacity,
    transitionToViewerContent,
    transitionToAssistantView,
    pauseBreathing,
    resumeBreathing,
    playHappy,
    playSad,
    playCalm,
    playEmotion,
    setState,
    currentState,
    scheduleFromTimeline,
  } = useAvatarMotions({ parentCenterY });

  const [lineShown, setLineShown] = useState(false);

  useEffect(() => {
    onContentOpacityReady?.(contentOpacity);
  }, [contentOpacity, onContentOpacityReady]);

  useEffect(() => {
    setLineShown(currentState === 'silent');
  }, [currentState]);

  useImperativeHandle(
    ref,
    () => ({
      transitionToViewerContent,
      transitionToAssistantView,
      playHappy,
      playSad,
      playCalm,
      playEmotion,
      setState,
      scheduleFromTimeline,
      contentOpacity,
    }),
    [
      transitionToViewerContent,
      transitionToAssistantView,
      playHappy,
      playSad,
      playCalm,
      playEmotion,
      setState,
      scheduleFromTimeline,
      contentOpacity,
    ]
  );

  useEffect(() => {
    lineVisible.value = withTiming(lineShown ? 1 : 0, {
      duration: LINE_ANIM_DURATION,
      easing: Easing.out(Easing.ease),
      reduceMotion: ReduceMotion.System,
    });
  }, [lineShown, lineVisible]);

  const onDoubleTap = useCallback(() => {
    const now = Date.now();
    if (now - lastDoubleTapTime.current < DOUBLE_TAP_COOLDOWN_MS) {
      return;
    }
    lastDoubleTapTime.current = now;
    trigger('light');
    setState(currentState === 'silent' ? 'speaking' : 'silent');
  }, [trigger, setState, currentState]);

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

  const composedGesture = useMemo(
    () => Gesture.Simultaneous(doubleTapGesture, touchGesture),
    [doubleTapGesture, touchGesture]
  );

  const circleAnimatedStyle = useAnimatedStyle(() => ({
    width: size.value,
    height: size.value,
    borderRadius: size.value / 2,
    transform: [{ translateY: translateY.value }, { scale: scale.value }],
  }));

  const { x1, y1, x2, y2, length } = getLineCoords(ASSISTANT_VIEW_SIZE);

  const lineAnimatedProps = useAnimatedProps(() => {
    const progress = lineVisible?.value ?? 0;
    const offset = length * (1 - progress);
    return {
      strokeDasharray: [length, length],
      strokeDashoffset: offset,
      opacity: LINE_OPACITY * progress,
    };
  });

  return (
    <GestureDetector gesture={composedGesture}>
      <Animated.View style={[styles.circleContainer, styles.circle, circleAnimatedStyle]}>
        <Animated.View style={[StyleSheet.absoluteFill, styles.lineSvg]} pointerEvents="none">
          <Svg width="100%" height="100%" viewBox={`0 0 ${ASSISTANT_VIEW_SIZE} ${ASSISTANT_VIEW_SIZE}`}>
            <AnimatedLine
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="white"
              strokeWidth={LINE_STROKE_WIDTH}
              animatedProps={lineAnimatedProps}
            />
          </Svg>
        </Animated.View>
      </Animated.View>
    </GestureDetector>
  );
});

AvatarComponent.displayName = 'Avatar';

export const Avatar = AvatarComponent;
