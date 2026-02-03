/**
 * WHY: Viewer mode + opacity + transition must stay in sync.
 * HOW: Avatar gives contentOpacity; useEffect triggers transition when ready.
 * EDIT: Change transition logic or add new viewer states.
 * RELATED: useHomeScreen, useAvatarLayout, Avatar, ViewerContentLayout
 */
import { useRef, useCallback, useState, useEffect } from 'react';
import type { AvatarRef } from '../components/Avatar';
import { useAvatarInteraction } from '../components/Avatar/hooks';
import type { OpacitySharedValue } from '@/types/reanimated';

export function useViewerContent(avatarParentCenterY: number | undefined) {
  const avatarRef = useRef<AvatarRef>(null);
  const [isViewerContent, setIsViewerContent] = useState(false);
  const [contentOpacity, setContentOpacity] = useState<OpacitySharedValue | null>(null);
  const hasStartedTransition = useRef(false);

  useAvatarInteraction({ avatarRef, setIsViewerContent });

  const handleContentOpacityReady = useCallback((opacity: OpacitySharedValue) => {
    setContentOpacity(opacity);
  }, []);

  // Transition effect: trigger avatar animation when viewer mode + layout ready
  useEffect(() => {
    if (isViewerContent && avatarParentCenterY != null && !hasStartedTransition.current) {
      hasStartedTransition.current = true;
      avatarRef.current?.transitionToViewerContent();
    }
    if (!isViewerContent) hasStartedTransition.current = false;
  }, [isViewerContent, avatarParentCenterY]);

  return {
    avatarRef,
    isViewerContent,
    contentOpacity,
    handleContentOpacityReady,
  };
}
