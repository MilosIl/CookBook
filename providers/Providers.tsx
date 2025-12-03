import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import { useTheme } from '@/store/theme';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 1,
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
    },
  },
});

const Providers = ({ children }: { children: ReactNode }) => {
  const { isDark } = useTheme();

  return (
    <QueryClientProvider client={queryClient}>
      <GluestackUIProvider mode={isDark ? 'dark' : 'light'}>
        {children}
      </GluestackUIProvider>
    </QueryClientProvider>
  );
};

export default Providers;
