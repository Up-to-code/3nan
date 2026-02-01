import { Stack } from 'expo-router';

export const unstable_settings = {
  anchor: 'index',
};

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'fade',
        animationDuration: 200,
        gestureEnabled: true,
        fullScreenGestureEnabled: true,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen
        name="email"
        options={{
          presentation: 'card',
          animation: 'fade',
          animationDuration: 200,
          gestureEnabled: true,
        }}
      />
    </Stack>
  );
}
