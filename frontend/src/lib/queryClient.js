import { QueryClient } from '@tanstack/react-query';

// Configure React Query with optimized settings
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Cache data for 10 minutes
      staleTime: 10 * 60 * 1000,
      // Keep unused data in cache for 15 minutes
      cacheTime: 15 * 60 * 1000,
      // Retry failed requests 2 times
      retry: 2,
      // Don't refetch on window focus (prevents unnecessary API calls)
      refetchOnWindowFocus: false,
      // Don't refetch on reconnect
      refetchOnReconnect: false,
      // Don't refetch on mount if data is fresh
      refetchOnMount: false,
    },
  },
});
