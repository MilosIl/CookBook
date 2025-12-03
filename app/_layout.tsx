import '@/global.css';
import Providers from '@/providers/Providers';
import { useAuthStore } from '@/store/auth';
import useOnboardingStore from '@/store/onboarding';
import { useTheme } from '@/store/theme';
import { checkNetwork } from '@/utils/checkNetwork';
import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { StatusBar } from 'react-native';

export default function RootLayout() {
  const { checkSession } = useAuthStore();
  const { hasCompletedOnboarding, isLoading, checkOnboardingStatus } =
    useOnboardingStore();
  const { isDark } = useTheme();

  useEffect(() => {
    checkOnboardingStatus();
    checkSession();
    checkNetwork();
  }, [checkOnboardingStatus, checkSession]);

  if (isLoading) {
    return null;
  }

  if (!hasCompletedOnboarding) {
    return (
      <Providers>
        <>
          <StatusBar
            barStyle={isDark ? 'light-content' : 'dark-content'}
            backgroundColor={isDark ? '#1f2937' : '#ffffff'}
          />
          <Stack>
            <Stack.Screen
              name="(onBoarding)"
              options={{ headerShown: false }}
            />
          </Stack>
        </>
      </Providers>
    );
  }

  return (
    <Providers>
      <>
        <StatusBar
          barStyle={isDark ? 'light-content' : 'dark-content'}
          backgroundColor={isDark ? '#1f2937' : '#ffffff'}
        />
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="recipes" />
          <Stack.Screen name="(auth)/login" />
          <Stack.Screen name="(auth)/signup" />
        </Stack>
      </>
    </Providers>
  );
}
