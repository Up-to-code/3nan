import React, { useEffect } from 'react';
import { useRouter, useRootNavigationState } from 'expo-router';
import { authClient } from '@/lib/auth-client';
import { LoadingView, ErrorView } from '@/shared/components';

export default function Index() {
  const router = useRouter();
  const navigationState = useRootNavigationState();
  const { data: session, isPending, error, refetch } = authClient.useSession();

  useEffect(() => {
    // Wait for navigator to be ready
    if (!navigationState?.key) return;
    if (isPending) return;

    if (session) {
      router.replace('/(main)/home');
    } else {
      router.replace('/(auth)');
    }
  }, [navigationState?.key, isPending, session, router]);

  if (isPending || !navigationState?.key) {
    return <LoadingView />;
  }

  if (error) {
    return <ErrorView message={error.message} onRetry={refetch} />;
  }

  return <LoadingView />;
}
