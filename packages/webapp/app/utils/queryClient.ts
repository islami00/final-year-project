import { QueryClient } from '@tanstack/react-query';

// Todo: Move this to a factory that returns the same thing for client, else a different one each time for server.
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Don't trigger an immediate refetch
      gcTime: 1000,
      // Remix will handle refetching, aka make it opt-in
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    },
  },
});
