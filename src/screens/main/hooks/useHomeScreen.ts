/**
 * WHY: Single hook for HomeScreen to get avatar + viewer API.
 * HOW: Composes useAvatarLayout and useViewerContent.
 * EDIT: Add new sub-hooks or change wiring here.
 * RELATED: HomeScreen, useAvatarLayout, useViewerContent
 */
import { useAvatarLayout } from './useAvatarLayout';
import { useViewerContent } from './useViewerContent';

export function useHomeScreen() {
  const { avatarParentCenterY, handleAvatarContainerLayout } = useAvatarLayout();
  const {
    avatarRef,
    isViewerContent,
    contentOpacity,
    handleContentOpacityReady,
  } = useViewerContent(avatarParentCenterY);

  return {
    avatarRef,
    avatarParentCenterY,
    contentOpacity,
    handleContentOpacityReady,
    handleAvatarContainerLayout,
    isViewerContent,
  };
}
