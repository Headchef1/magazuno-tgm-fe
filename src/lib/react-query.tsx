import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';

// Initialize QueryClient
const queryClient = new QueryClient();

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
