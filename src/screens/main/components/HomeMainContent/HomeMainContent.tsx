/**
 * WHY: Main content (Avatar + overlay) is one logical block.
 * HOW: Conditionally shows ViewerContentLayout when isViewerContent.
 * EDIT: Change content layout or add new content types.
 * RELATED: HomeScreen, Avatar, ViewerContentLayout, useHomeScreen
 */
import React from 'react';
import { View } from 'react-native';
import type { LayoutChangeEvent } from 'react-native';
import type { RefObject } from 'react';
import { Avatar, type AvatarRef } from '../Avatar';
import { ViewerContentLayout } from '../ViewerContentLayout';
import type { OpacitySharedValue } from '@/types/reanimated';
import { styles } from '../../HomeScreen.styles';

export interface HomeMainContentProps {
  avatarRef: RefObject<AvatarRef | null>;
  avatarParentCenterY: number | undefined;
  contentOpacity: OpacitySharedValue | null;
  onContentOpacityReady: (opacity: OpacitySharedValue) => void;
  onAvatarLayout: (e: LayoutChangeEvent) => void;
  isViewerContent: boolean;
}

export function HomeMainContent({
  avatarRef,
  avatarParentCenterY,
  contentOpacity,
  onContentOpacityReady,
  onAvatarLayout,
  isViewerContent,
}: HomeMainContentProps) {
  return (
    <View style={styles.mainArea}>
      {/* Viewer overlay */}
      {isViewerContent && contentOpacity && (
        <ViewerContentLayout contentOpacity={contentOpacity} />
      )}
      {/* Avatar */}
      <View style={styles.avatarContainer} onLayout={onAvatarLayout}>
        <Avatar
          ref={avatarRef}
          parentCenterY={avatarParentCenterY}
          onContentOpacityReady={onContentOpacityReady}
        />
      </View>
    </View>
  );
}
