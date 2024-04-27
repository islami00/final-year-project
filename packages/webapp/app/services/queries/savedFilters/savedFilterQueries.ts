import { queryOptions } from '@tanstack/react-query';
import { getSavedFilterById } from './getSavedFilterById';

export const savedFilterQueries = {
  all: ['savedFilters'] as const,
  byId: () => [...savedFilterQueries.all, 'by-id'] as const,
  byIdCaught: () => [...savedFilterQueries.byId(), 'caught'] as const,

  byIdCaughtFilter: (id: string) =>
    queryOptions({
      queryKey: [...savedFilterQueries.byIdCaught(), id],
      queryFn: () => getSavedFilterById({ id }).catch(() => null),
    }),
};
