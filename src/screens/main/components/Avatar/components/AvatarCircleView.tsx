/**
 * WHY: Renders the animated circle and line overlay. Single visual unit.
 * HOW: Uses SharedValues for size/translateY/scale/lineVisible; line coords from config.
 * EDIT: Change styles in styles/; line coords in config/constants.
 * RELATED: Avatar.tsx, config/constants, styles/Avatar.styles
 */

import { StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useAnimatedProps,
} from 'react-native-reanimated';
import type { SharedValue } from 'react-native-reanimated';
import Svg, { Line } from 'react-native-svg';
import { styles } from '../styles/Avatar.styles';
import {
  ASSISTANT_VIEW_SIZE,
  LINE_OPACITY,
  LINE_STROKE_WIDTH,
  getLineCoords,
} from '../config/constants';

const AnimatedLine = Animated.createAnimatedComponent(Line);

const LINE_COORDS = getLineCoords(ASSISTANT_VIEW_SIZE);

export interface AvatarCircleViewProps {
  size: SharedValue<number>;
  translateY: SharedValue<number>;
  scale: SharedValue<number>;
  lineVisible: SharedValue<number>;
}

export function AvatarCircleView({
  size,
  translateY,
  scale,
  lineVisible,
}: AvatarCircleViewProps) {
  const circleAnimatedStyle = useAnimatedStyle(() => ({
    width: size.value,
    height: size.value,
    borderRadius: size.value / 2,
    transform: [{ translateY: translateY.value }, { scale: scale.value }],
  }));

  const lineAnimatedProps = useAnimatedProps(() => {
    const progress = lineVisible.value ?? 0;
    const offset = LINE_COORDS.length * (1 - progress);
    return {
      strokeDasharray: [LINE_COORDS.length, LINE_COORDS.length],
      strokeDashoffset: offset,
      opacity: LINE_OPACITY * progress,
    };
  });

  return (
    <Animated.View style={[styles.circleContainer, styles.circle, circleAnimatedStyle]}>
      <Animated.View style={[StyleSheet.absoluteFill, styles.lineSvg]} pointerEvents="none">
        <Svg
          width="100%"
          height="100%"
          viewBox={`0 0 ${ASSISTANT_VIEW_SIZE} ${ASSISTANT_VIEW_SIZE}`}
        >
          <AnimatedLine
            x1={LINE_COORDS.x1}
            y1={LINE_COORDS.y1}
            x2={LINE_COORDS.x2}
            y2={LINE_COORDS.y2}
            stroke="white"
            strokeWidth={LINE_STROKE_WIDTH}
            animatedProps={lineAnimatedProps}
          />
        </Svg>
      </Animated.View>
    </Animated.View>
  );
}
