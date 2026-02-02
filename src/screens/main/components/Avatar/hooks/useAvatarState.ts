import { useCallback, useMemo, useState } from 'react';
import { useWindowDimensions } from 'react-native';
import { cancelAnimation, withSpring, runOnJS, ReduceMotion } from 'react-native-reanimated';
import type { SharedValue } from 'react-native-reanimated';
import {
  loopListeningMotion,
  loopSpeakingMotion,
  loopSilentMotion,
} from '../motions';
import type { MotionContext } from '../motions';
import type { BreathingSizeRange } from '../motions';
import { APPLE_SPRING_SNAPPY, getAvatarRanges } from '../Avatar.constants';

const SPRING = { ...APPLE_SPRING_SNAPPY, reduceMotion: ReduceMotion.System };

export type AvatarStateType = 'listening' | 'speaking' | 'silent';

export interface UseAvatarStateOptions {
  size: SharedValue<number>;
  translateY: SharedValue<number>;
  scale: SharedValue<number>;
}

export interface UseAvatarStateReturn {
  setState: (state: AvatarStateType) => void;
  currentState: AvatarStateType;
}

const MOTIONS = {
  listening: loopListeningMotion,
  speaking: loopSpeakingMotion,
  silent: loopSilentMotion,
} as const;

export function useAvatarState(options: UseAvatarStateOptions): UseAvatarStateReturn {
  const { size, translateY, scale } = options;
  const { width: screenWidth } = useWindowDimensions();
  const [currentState, setCurrentState] = useState<AvatarStateType>('speaking');
  const ctx: MotionContext = { size, translateY, scale };
  const ranges = useMemo(() => getAvatarRanges(screenWidth), [screenWidth]);

  const setState = useCallback(
    (state: AvatarStateType) => {
      setCurrentState(state);
      cancelAnimation(size);
      cancelAnimation(scale);
      const range = ranges[state];
      const startLoop = () => {
        if (state === 'silent') {
          loopSilentMotion(ctx, range);
        } else {
          MOTIONS[state](ctx, range);
        }
      };
      if (state === 'silent') {
        startLoop();
      } else {
        size.value = withSpring(
          range.min,
          SPRING,
          (finished) => {
            'worklet';
            if (finished) runOnJS(startLoop)();
          }
        );
      }
    },
    [size, translateY, scale, ranges]
  );

  return { setState, currentState };
}
