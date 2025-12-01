import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import '@/global.css';
import { useAuthStore } from '@/store/auth';
import { checkNetwork } from '@/utils/checkNetwork';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 2,
    },
  },
});

export default function RootLayout() {
  const { session } = useAuthStore();
  checkNetwork();

  return (
    <QueryClientProvider client={queryClient}>
      <GluestackUIProvider mode="dark">
        <Stack>
          <Stack.Protected guard={!session}>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          </Stack.Protected>
          <Stack.Screen name="recipes" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)/login" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)/signup" options={{ headerShown: false }} />
        </Stack>
      </GluestackUIProvider>
    </QueryClientProvider>
  );
}
