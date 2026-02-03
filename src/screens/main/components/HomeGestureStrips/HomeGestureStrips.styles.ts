/**
 * WHY: Edge strip and swipe hint styles for gesture zones.
 * HOW: getEdgeStripStyle returns RTL-aware position. RTL flips left/right.
 * EDIT: Change strip size or hint appearance.
 * RELATED: HomeGestureStrips, useMenuSwipe
 */
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
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
});

export function getEdgeStripStyle(
  edgeWidth: number,
  isRTL: boolean,
  variant: 'open' | 'close'
): object {
  const base = { width: edgeWidth, top: 0, bottom: 0 };
  if (variant === 'open') {
    return isRTL ? { ...base, right: 0 } : { ...base, left: 0 };
  }
  return isRTL ? { ...base, left: 0 } : { ...base, right: 0 };
}
