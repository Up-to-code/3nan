import React, { useEffect } from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
  withRepeat,
  withSpring,
  Easing,
} from 'react-native-reanimated';
import { styles } from './Avatar.styles';

const OPENING_SIZE = 24;
const REST_SIZE = 150;
const BREATH_SIZE = 170;
const OPENING_DURATION = 500;
const BREATH_DURATION = 1600;
const DROP_START_Y = -400;

export function Avatar() {
  const size = useSharedValue(OPENING_SIZE);
  const translateY = useSharedValue(DROP_START_Y);

  useEffect(() => {
    translateY.value = withSpring(0, { damping: 10, stiffness: 80, mass: 1 });
    size.value = withSequence(
      withTiming(REST_SIZE, {
        duration: OPENING_DURATION,
        easing: Easing.out(Easing.cubic),
      }),
      withRepeat(
        withSequence(
          withTiming(BREATH_SIZE, {
            duration: BREATH_DURATION,
            easing: Easing.inOut(Easing.ease),
          }),
          withTiming(REST_SIZE, {
            duration: BREATH_DURATION,
            easing: Easing.inOut(Easing.ease),
          })
        ),
        -1
      )
    );
  }, [size, translateY]);

  const animatedStyle = useAnimatedStyle(() => ({
    width: size.value,
    height: size.value,
    borderRadius: size.value / 2,
    transform: [{ translateY: translateY.value }],
  }));

  return <Animated.View style={[styles.circle, animatedStyle]} />;
}
