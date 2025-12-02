import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import { useResolvedTheme } from '@/store/theme';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 2,
    },
  },
});

const Providers = ({ children }: { children: ReactNode }) => {
  const theme = useResolvedTheme();

  return (
    <QueryClientProvider client={queryClient}>
      <GluestackUIProvider mode={theme}>{children}</GluestackUIProvider>
    </QueryClientProvider>
  );
};

export default Providers;
