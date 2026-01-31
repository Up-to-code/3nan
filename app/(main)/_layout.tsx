import { Stack } from 'expo-router';
import { useIsRTL } from '../../src/hooks';

export default function MainLayout() {
  const { isRTL } = useIsRTL();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: isRTL ? 'slide_from_left' : 'slide_from_right',
        animationDuration: 250,
        gestureEnabled: true,
        fullScreenGestureEnabled: true,
        presentation: 'card',
      }}
    />
  );
}
