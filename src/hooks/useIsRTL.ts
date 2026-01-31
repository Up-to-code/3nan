import { I18nManager } from 'react-native';

interface UseIsRTLReturn {
  isRTL: boolean;
  forceRTL: (forceRTL: boolean) => void;
  allowRTL: (allowRTL: boolean) => void;
}

export function useIsRTL(): UseIsRTLReturn {
  return {
    isRTL: I18nManager.isRTL,
    forceRTL: I18nManager.forceRTL,
    allowRTL: I18nManager.allowRTL,
  };
}
