import { queryOptions } from '@tanstack/react-query';
import { getSavedFilterById } from './getSavedFilterById';

export const savedFilterQueries = {
  all: ['savedFilters'] as const,
  byId: () => [...savedFilterQueries.all, 'by-id'] as const,
  byIdCaught: () => [...savedFilterQueries.byId(), 'caught'] as const,

  byIdCaughtFilter: (id: string | null | undefined) =>
    queryOptions({
      queryKey: [...savedFilterQueries.byIdCaught(), id],
      queryFn: async () => {
        if (!id) return false;
        return getSavedFilterById({ id }).catch(() => null);
      },
      gcTime: Infinity,
      staleTime: Infinity,
    }),
};
