import { useCallback, useState } from 'react';
import { cancelAnimation, withSpring, runOnJS, ReduceMotion } from 'react-native-reanimated';
import type { SharedValue } from 'react-native-reanimated';
import {
  loopListeningMotion,
  loopSpeakingMotion,
  loopSilentMotion,
} from '../motions';
import type { MotionContext } from '../motions';
import { APPLE_SPRING_SNAPPY } from '../Avatar.constants';
import {
  LISTENING_SIZE_MIN,
  LISTENING_SIZE_MAX,
  SPEAKING_SIZE_MIN,
  SPEAKING_SIZE_MAX,
  SILENT_SIZE_MIN,
  SILENT_SIZE_MAX,
} from '../Avatar.constants';

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

const RANGES = {
  listening: { min: LISTENING_SIZE_MIN, max: LISTENING_SIZE_MAX },
  speaking: { min: SPEAKING_SIZE_MIN, max: SPEAKING_SIZE_MAX },
  silent: { min: SILENT_SIZE_MIN, max: SILENT_SIZE_MAX },
} as const;

const MOTIONS = {
  listening: loopListeningMotion,
  speaking: loopSpeakingMotion,
  silent: loopSilentMotion,
} as const;

export function useAvatarState(options: UseAvatarStateOptions): UseAvatarStateReturn {
  const { size, translateY, scale } = options;
  const [currentState, setCurrentState] = useState<AvatarStateType>('speaking');
  const ctx: MotionContext = { size, translateY, scale };

  const setState = useCallback(
    (state: AvatarStateType) => {
      setCurrentState(state);
      cancelAnimation(size);
      const range = RANGES[state];
      const startLoop = () => MOTIONS[state](ctx);
      size.value = withSpring(
        range.min,
        SPRING,
        (finished) => {
          'worklet';
          if (finished) runOnJS(startLoop)();
        }
      );
    },
    [size, translateY, scale]
  );

  return { setState, currentState };
}
