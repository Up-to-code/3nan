import { Platform } from 'react-native';

export function usePlatform() {
  return {
    isIOS: Platform.OS === 'ios',
    isAndroid: Platform.OS === 'android',
    isWeb: Platform.OS === 'web',
    platform: Platform.OS,
  };
}
