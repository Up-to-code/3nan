/**
 * WHY: Menu is a separate layer; swipe hint shows where to swipe.
 * HOW: Renders MenuScreen + right-edge hint. No gestures (handled by parent).
 * EDIT: Change menu UI or hint style.
 * RELATED: HomeScreen, MenuScreen, HomeScreen.styles
 */
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { MenuScreen } from '../MenuScreen';
import { styles } from '../../HomeScreen.styles';

export interface HomeMenuLayerProps {
  onClose: () => void;
  edgeWidth: number;
  isRTL: boolean;
}

export function HomeMenuLayer({ onClose, edgeWidth, isRTL }: HomeMenuLayerProps) {
  const hintStyle = { width: edgeWidth };
  const hintPosition = isRTL ? styles.swipeHintLeft : styles.swipeHintRight;

  return (
    <View style={[StyleSheet.absoluteFill, styles.menuLayer]}>
      <MenuScreen onClose={onClose} />
      <View
        style={[styles.swipeHint, hintStyle, hintPosition]}
        pointerEvents="none"
      />
    </View>
  );
}
