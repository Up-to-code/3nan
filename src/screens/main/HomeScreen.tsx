/**
 * WHY: Main home screen composes layers; no logic here.
 * HOW: useMenuSwipe + useHomeScreen; renders 3 layers.
 * EDIT: Add/remove layers or change composition order.
 * RELATED: README, HomeMenuLayer, HomeMainContent, HomeGestureStrips, useMenuSwipe, useHomeScreen
 */
import React from 'react';
import { View, StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useIsRTL } from '@/hooks';
import { HomeMenuLayer } from './components/HomeMenuLayer';
import { HomeMainContent } from './components/HomeMainContent';
import { HomeGestureStrips } from './components/HomeGestureStrips';
import { useMenuSwipe, useHomeScreen } from './hooks';
import { styles } from './HomeScreen.styles';

export function HomeScreen() {
  const { isRTL } = useIsRTL();
  const { panGesture, closePanGesture, mainAnimatedStyle, close, edgeWidth, isMenuOpen } =
    useMenuSwipe(isRTL);
  const {
    avatarRef,
    avatarParentCenterY,
    contentOpacity,
    handleContentOpacityReady,
    handleAvatarContainerLayout,
    isViewerContent,
  } = useHomeScreen();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        {/* Menu layer: full-screen background. Shows Circle.AI menu, profile, items. Thin hint strip on edge. */}
        <HomeMenuLayer onClose={close} edgeWidth={edgeWidth} isRTL={isRTL} />
        {/* Main content: white card that slides left/right. Center: Avatar circle. Overlay when in viewer mode. */}
        <Animated.View style={[StyleSheet.absoluteFill, styles.mainLayer, mainAnimatedStyle]}>
          <HomeMainContent
            avatarRef={avatarRef}
            avatarParentCenterY={avatarParentCenterY}
            contentOpacity={contentOpacity}
            onContentOpacityReady={handleContentOpacityReady}
            onAvatarLayout={handleAvatarContainerLayout}
            isViewerContent={isViewerContent}
          />
        </Animated.View>
        {/* Gesture strips: invisible hit areas. Edge strip = swipe to reveal menu. Full overlay = swipe to close when menu open. */}
        <HomeGestureStrips
          panGesture={panGesture}
          closePanGesture={closePanGesture}
          edgeWidth={edgeWidth}
          isRTL={isRTL}
          isMenuOpen={isMenuOpen}
        />
      </View>
    </SafeAreaView>
  );
}
