import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactElement } from 'react';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 2,
    },
  },
});
const Providers = ({ children }: { children: ReactElement }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <GluestackUIProvider mode="dark">{children}</GluestackUIProvider>
    </QueryClientProvider>
  );
};

export default Providers;
