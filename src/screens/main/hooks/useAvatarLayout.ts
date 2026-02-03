/**
 * WHY: Avatar center Y needed for viewer content positioning.
 * HOW: onLayout callback computes center; insets.top for safe area.
 * EDIT: Change center calculation or add more layout data.
 * RELATED: useHomeScreen, useViewerContent, HomeMainContent, Avatar
 */
import { useCallback, useState } from 'react';
import type { LayoutChangeEvent } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export function useAvatarLayout() {
  const insets = useSafeAreaInsets();
  const [avatarParentCenterY, setAvatarParentCenterY] = useState<number | undefined>();

  const handleAvatarContainerLayout = useCallback(
    (e: LayoutChangeEvent) => {
      const { y, height } = e.nativeEvent.layout;
      // Center Y = top inset + layout y + half height
      setAvatarParentCenterY(insets.top + y + height / 2);
    },
    [insets.top]
  );

  return { avatarParentCenterY, handleAvatarContainerLayout };
}
