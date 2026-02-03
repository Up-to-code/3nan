/**
 * WHY: Avatar layout and visual styles (circle, line overlay).
 * HOW: StyleSheet used by Avatar.tsx for the animated circle and SVG line.
 * EDIT: Change circle/container styles here; motion logic stays in motions/.
 * RELATED: Avatar.tsx
 */

import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  circle: {
    backgroundColor: 'black',
  },
  circleContainer: {
    overflow: 'hidden',
  },
  lineSvg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
