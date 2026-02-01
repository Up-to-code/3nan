import { useCallback } from 'react';
import * as Haptics from 'expo-haptics';

export type HapticFeedbackType =
  | 'selection'
  | 'light'
  | 'medium'
  | 'heavy'
  | 'soft'
  | 'rigid'
  | 'success'
  | 'warning'
  | 'error';

export interface UseHapticFeedbackReturn {
  trigger: (type: HapticFeedbackType) => Promise<void>;
}

async function triggerHaptic(type: HapticFeedbackType): Promise<void> {
  try {
    switch (type) {
      case 'selection':
        await Haptics.selectionAsync();
        break;
      case 'light':
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        break;
      case 'medium':
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        break;
      case 'heavy':
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
        break;
      case 'soft':
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
        break;
      case 'rigid':
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);
        break;
      case 'success':
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        break;
      case 'warning':
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
        break;
      case 'error':
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        break;
    }
  } catch {
    // No-op on unsupported environments (e.g. web) or when haptics are unavailable
  }
}

export function useHapticFeedback(): UseHapticFeedbackReturn {
  const trigger = useCallback((type: HapticFeedbackType) => triggerHaptic(type), []);
  return { trigger };
}
