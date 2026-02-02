import React, { useRef, useCallback, useState, useEffect } from 'react';
import { View, StyleSheet, LayoutChangeEvent, Text } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../../theme';
import { useDebugPerformance } from '@/hooks';
import { Avatar, type AvatarRef, AvatarAnimationTestPanel } from './components/Avatar';
import { ViewerContentLayout } from './components/ViewerContentLayout';

export function HomeScreen() {
  const avatarRef = useRef<AvatarRef>(null);
  const insets = useSafeAreaInsets();
  const { fps, isLow, memory } = useDebugPerformance();
  const [isViewerContent, setIsViewerContent] = useState(false);
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

  const handleTransitionToViewerContent = useCallback(() => {
    try {
      setIsViewerContent(true);
    } catch (err) {
      console.error('[HomeScreen] transitionToViewerContent failed:', err);
    }
  }, []);

  const handleTransitionToAssistantView = useCallback(() => {
    try {
      avatarRef.current?.transitionToAssistantView(() => {
        try {
          setIsViewerContent(false);
        } catch (_) {
          console.error('[HomeScreen] onComplete callback failed');
        }
      });
    } catch (err) {
      console.error('[HomeScreen] transitionToAssistantView failed:', err);
      setIsViewerContent(false);
    }
  }, []);

  const handlePlayHappy = useCallback(() => {
    avatarRef.current?.playHappy();
  }, []);

  const handlePlaySad = useCallback(() => {
    avatarRef.current?.playSad();
  }, []);

  const handlePlayCalm = useCallback(() => {
    avatarRef.current?.playCalm();
  }, []);

  const handleSetState = useCallback((state: 'listening' | 'speaking' | 'silent') => {
    avatarRef.current?.setState(state);
  }, []);

  const handlePlayNeutral = useCallback(() => {
    avatarRef.current?.playEmotion('n');
  }, []);

  const handleScheduleDemo = useCallback(() => {
    avatarRef.current?.scheduleFromTimeline({
      states: [
        { st: 'listen', f: 0, to: 1500 },
        { st: 'speak', f: 1500, to: 4000 },
      ],
      emotions: [
        { e: 'n', f: 0, to: 1500 },
        { e: 'h', f: 1500, to: 3000 },
        { e: 'c', f: 3000, to: 4000 },
      ],
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={[styles.fpsOverlay, { top: insets.top }]}
        pointerEvents="none"
      >
        <Text style={[styles.fpsText, isLow && styles.fpsTextLow]}>
          {fps} FPS
          {memory.available ? ` | ${memory.usedMB}MB` : ' | RAM: N/A'}
        </Text>
      </View>
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
      <AvatarAnimationTestPanel
        onTransitionToViewerContent={handleTransitionToViewerContent}
        onTransitionToAssistantView={handleTransitionToAssistantView}
        onPlayHappy={handlePlayHappy}
        onPlaySad={handlePlaySad}
        onPlayCalm={handlePlayCalm}
        onPlayNeutral={handlePlayNeutral}
        onSetState={handleSetState}
        onScheduleDemo={handleScheduleDemo}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  mainArea: {
    flex: 1,
  },
  avatarContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fpsOverlay: {
    position: 'absolute',
    right: 12,
    zIndex: 10,
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 4,
  },
  fpsText: {
    color: '#7fff7f',
    fontSize: 12,
    fontVariant: ['tabular-nums'],
  },
  fpsTextLow: {
    color: '#ff7f7f',
  },
});
