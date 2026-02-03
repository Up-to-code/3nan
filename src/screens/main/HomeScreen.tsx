import React, { useRef, useCallback, useState, useEffect } from 'react';
import { View, StyleSheet, LayoutChangeEvent, Text } from 'react-native';
import { GestureDetector } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../../theme';
import { useIsRTL } from '@/hooks';
import { Avatar, type AvatarRef } from './components/Avatar';
import { useAvatarInteraction } from './components/Avatar/hooks';
import { ViewerContentLayout } from './components/ViewerContentLayout';
import { MenuScreen } from './components/MenuScreen';
import { useMenuSwipe } from './hooks';

export function HomeScreen() {
  const avatarRef = useRef<AvatarRef>(null);
  const insets = useSafeAreaInsets();
  const { isRTL } = useIsRTL();
  const [isViewerContent, setIsViewerContent] = useState(false);
  const { panGesture, closePanGesture, mainAnimatedStyle, close, edgeWidth, isMenuOpen } =
    useMenuSwipe(isRTL);
  useAvatarInteraction({ avatarRef, setIsViewerContent });
  const [avatarParentCenterY, setAvatarParentCenterY] = useState<number | undefined>();
  const [contentOpacity, setContentOpacity] = useState<
    import('react-native-reanimated').SharedValue<number> | null
  >(null);

  const handleContentOpacityReady = useCallback(
    (opacity: import('react-native-reanimated').SharedValue<number>) => {
      setContentOpacity(opacity);
    },
    []
  );

  const hasStartedTransition = useRef(false);

  const handleAvatarContainerLayout = useCallback(
    (e: LayoutChangeEvent) => {
      const { y, height } = e.nativeEvent.layout;
      setAvatarParentCenterY(insets.top + y + height / 2);
    },
    [insets.top]
  );

  useEffect(() => {
    if (isViewerContent && avatarParentCenterY != null && !hasStartedTransition.current) {
      hasStartedTransition.current = true;
      avatarRef.current?.transitionToViewerContent();
    }
    if (!isViewerContent) hasStartedTransition.current = false;
  }, [isViewerContent, avatarParentCenterY]);

  const edgeStripStyle = isRTL
    ? [styles.edgeStrip, { right: 0, width: edgeWidth, top: 0, bottom: 0 }]
    : [styles.edgeStrip, { left: 0, width: edgeWidth, top: 0, bottom: 0 }];

  const closeStripStyle = isRTL
    ? [styles.edgeStrip, { left: 0, width: edgeWidth, top: 0, bottom: 0 }]
    : [styles.edgeStrip, { right: 0, width: edgeWidth, top: 0, bottom: 0 }];

  const leftHintStyle = { width: edgeWidth };
  const rightHintStyle = { width: edgeWidth };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <View style={[StyleSheet.absoluteFill, styles.menuLayer]}>
          <MenuScreen onClose={close} />
          <View style={[styles.swipeHint, rightHintStyle, styles.swipeHintRight]} pointerEvents="none" />
        </View>
        <Animated.View style={[StyleSheet.absoluteFill, styles.mainLayer, mainAnimatedStyle]}>
          <View style={styles.mainArea}>
            {isViewerContent && contentOpacity && (
              <ViewerContentLayout contentOpacity={contentOpacity} />
            )}
            <View style={styles.avatarContainer} onLayout={handleAvatarContainerLayout}>
              <Avatar
                ref={avatarRef}
                parentCenterY={avatarParentCenterY}
                onContentOpacityReady={handleContentOpacityReady}
              />
            </View>
          </View>
        </Animated.View>
        <GestureDetector gesture={panGesture}>
          <View style={edgeStripStyle} />
        </GestureDetector>
        <View
          style={[closeStripStyle, styles.closeStripOverlay]}
          pointerEvents={isMenuOpen ? 'auto' : 'none'}
        >
          <GestureDetector gesture={closePanGesture}>
            <View style={StyleSheet.absoluteFill} />
          </GestureDetector>
        </View>
        <View style={[styles.swipeHint, leftHintStyle, styles.swipeHintLeft]} pointerEvents="none" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  wrapper: {
    flex: 1,
  },
  menuLayer: {
    zIndex: 0,
    backgroundColor: colors.background,
  },
  mainLayer: {
    zIndex: 1,
    backgroundColor: colors.background,
  },
  edgeStrip: {
    position: 'absolute',
    zIndex: 2,
  },
  closeStripOverlay: {
    zIndex: 2,
  },
  swipeHint: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.03)',
    zIndex: 1,
  },
  swipeHintLeft: {
    left: 0,
  },
  swipeHintRight: {
    right: 0,
  },
  mainArea: {
    flex: 1,
  },
  avatarContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
