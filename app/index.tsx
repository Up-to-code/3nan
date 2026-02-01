import React from 'react';
import { Redirect } from 'expo-router';
import { authClient } from '@/lib/auth-client';
import { LoadingView, ErrorView } from '@/shared/components';

export default function Index() {
  const { data: session, isPending, error, refetch } = authClient.useSession();

  if (isPending) {
    return <LoadingView />;
  }

  if (error) {
    return <ErrorView message={error.message} onRetry={refetch} />;
  }

  if (session) {
    return <Redirect href="/(main)" />;
  }

  return <Redirect href="/(auth)" />;
}
