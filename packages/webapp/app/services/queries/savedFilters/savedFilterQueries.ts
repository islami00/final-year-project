import { queryOptions } from '@tanstack/react-query';
import { getSavedFilterById } from './getSavedFilterById';
import { SavedFilter } from '../../../models/SavedFilter.model';

export interface EmptyFilterQuery {
  content: null;
  id?: undefined;
}

export type DefinedSavedFilterQueryData = EmptyFilterQuery | SavedFilter;

export type SavedFilterQueryData = null | DefinedSavedFilterQueryData;
export const savedFilterQueries = {
  all: ['savedFilters'] as const,
  byId: () => [...savedFilterQueries.all, 'by-id'] as const,
  byIdCaught: () => [...savedFilterQueries.byId(), 'caught'] as const,

  byIdCaughtFilter: (id: string | null | undefined) =>
    queryOptions({
      queryKey: [...savedFilterQueries.byIdCaught(), id],
      queryFn: async (): Promise<SavedFilterQueryData> => {
        if (!id) {
          const empty: EmptyFilterQuery = { content: null };
          return empty;
        }
        return getSavedFilterById({ id }).catch(() => null);
      },
      gcTime: Infinity,
      staleTime: Infinity,
      retry: false,
    }),
};
