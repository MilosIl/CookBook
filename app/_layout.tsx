import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import '@/global.css';
import { useAuthStore } from '@/store/auth';
import { Stack } from 'expo-router';

export default function RootLayout() {
  const { session } = useAuthStore();
  return (
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
  );
}
