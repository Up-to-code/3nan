import { Redirect } from 'expo-router';

export default function Index() {
  // Start at auth screen
  return <Redirect href="/(auth)" />;
}
