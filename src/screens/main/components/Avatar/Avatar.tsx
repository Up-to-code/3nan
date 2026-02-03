/**
 * WHY: Main Avatar component - animated circle with state-based breathing and gestures.
 * HOW: Composes useAvatarMotions + useAvatarGestures + useAvatarLineVisibility; exposes ref.
 * EDIT: Add prop: config/types; add motion: config/avatarRoles + motions/.
 * RELATED: hooks/, config/, motions/, styles/, components/
 */

import React, { useImperativeHandle, forwardRef, useEffect } from 'react';
import { GestureDetector } from 'react-native-gesture-handler';
import { useAvatarMotions, useAvatarGestures, useAvatarLineVisibility } from './hooks';
import { AvatarCircleView } from './components';
import { useHapticFeedback } from '@/hooks';
import type { AvatarRef, AvatarProps } from './config/types';

export type { AvatarRef, AvatarProps };

const AvatarComponent = forwardRef<AvatarRef, AvatarProps>(function Avatar(
  { parentCenterY, onContentOpacityReady, gestureMode = 'full' },
  ref
) {
  const { trigger } = useHapticFeedback();
  const motions = useAvatarMotions({ parentCenterY });

  const { composedGesture } = useAvatarGestures({
    setState: motions.setState,
    currentState: motions.currentState,
    pauseBreathing: motions.pauseBreathing,
    resumeBreathing: motions.resumeBreathing,
    triggerHaptic: trigger,
    gestureMode,
  });

  useAvatarLineVisibility({
    currentState: motions.currentState,
    lineVisible: motions.lineVisible,
  });

  useEffect(() => {
    onContentOpacityReady?.(motions.contentOpacity);
  }, [motions.contentOpacity, onContentOpacityReady]);

  useImperativeHandle(
    ref,
    () => ({
      transitionToViewerContent: motions.transitionToViewerContent,
      transitionToAssistantView: motions.transitionToAssistantView,
      playHappy: motions.playHappy,
      playSad: motions.playSad,
      playCalm: motions.playCalm,
      playEmotion: motions.playEmotion,
      setState: motions.setState,
      scheduleFromTimeline: motions.scheduleFromTimeline,
      contentOpacity: motions.contentOpacity,
    }),
    [motions]
  );

  const content = (
    <AvatarCircleView
      size={motions.size}
      translateY={motions.translateY}
      scale={motions.scale}
      lineVisible={motions.lineVisible}
    />
  );

  if (composedGesture) {
    return <GestureDetector gesture={composedGesture}>{content}</GestureDetector>;
  }
  return content;
});

AvatarComponent.displayName = 'Avatar';

export const Avatar = AvatarComponent;
