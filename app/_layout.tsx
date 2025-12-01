import '@/global.css';
import Providers from '@/providers/Providers';
import { useAuthStore } from '@/store/auth';
import { useOnboardingStore } from '@/store/onboarding';
import { checkNetwork } from '@/utils/checkNetwork';
import { Stack } from 'expo-router';
import { useEffect } from 'react';

export default function RootLayout() {
  const { session } = useAuthStore();
  const { hasCompletedOnboarding, isLoading, checkOnboardingStatus } =
    useOnboardingStore();

  useEffect(() => {
    checkOnboardingStatus();
    checkNetwork();
  }, [checkOnboardingStatus]);

  if (isLoading) {
    return null;
  }

  if (!hasCompletedOnboarding) {
    return (
      <Providers>
        <Stack>
          <Stack.Screen name="(onBoarding)" options={{ headerShown: false }} />
        </Stack>
      </Providers>
    );
  }

  return (
    <Providers>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Protected guard={!!session}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="recipes" />
        </Stack.Protected>
        <Stack.Screen name="(auth)/login" />
        <Stack.Screen name="(auth)/signup" />
      </Stack>
    </Providers>
  );
}
