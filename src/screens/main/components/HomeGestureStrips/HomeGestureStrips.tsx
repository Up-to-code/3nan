/**
 * WHY: Gesture strips are separate from content for z-index and hit area.
 * HOW: Open strip (edge), close overlay (full), hints. Uses useMenuSwipe gestures.
 * EDIT: Change strip size, position, or add new gestures.
 * RELATED: HomeScreen, useMenuSwipe, HomeGestureStrips.styles
 */
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { GestureDetector, type GestureType } from 'react-native-gesture-handler';
import { styles, getEdgeStripStyle } from './HomeGestureStrips.styles';

export interface HomeGestureStripsProps {
  panGesture: GestureType;
  closePanGesture: GestureType;
  edgeWidth: number;
  isRTL: boolean;
  isMenuOpen: boolean;
}

export function HomeGestureStrips({
  panGesture,
  closePanGesture,
  edgeWidth,
  isRTL,
  isMenuOpen,
}: HomeGestureStripsProps) {
  const openStripStyle = [styles.edgeStrip, getEdgeStripStyle(edgeWidth, isRTL, 'open')];
  const closeStripStyle = [styles.edgeStrip, getEdgeStripStyle(edgeWidth, isRTL, 'close')];
  const hintStyle = { width: edgeWidth };

  return (
    <>
      {/* Open strip - swipe from edge to open menu */}
      <GestureDetector gesture={panGesture}>
        <View style={openStripStyle} />
      </GestureDetector>
      {/* Close overlay - swipe to close when menu open */}
      <View
        style={[closeStripStyle, styles.closeStripOverlay]}
        pointerEvents={isMenuOpen ? 'auto' : 'none'}
      >
        <GestureDetector gesture={closePanGesture}>
          <View style={StyleSheet.absoluteFill} />
        </GestureDetector>
      </View>
      {/* Hints */}
      <View
        style={[styles.swipeHint, hintStyle, styles.swipeHintLeft]}
        pointerEvents="none"
      />
    </>
  );
}
