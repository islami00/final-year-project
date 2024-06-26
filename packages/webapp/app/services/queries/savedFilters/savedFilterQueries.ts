import { queryOptions } from '@tanstack/react-query';
import { getSavedFilterById } from './getSavedFilterById';
import { SavedFilter } from '../../../models/SavedFilter.model';
import { getSavedFilters } from './getSavedFilters';

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
  list: () => [...savedFilterQueries.all, 'list'] as const,

  listFilter: (orgId: string) =>
    queryOptions({
      queryKey: [...savedFilterQueries.list(), orgId] as const,
      queryFn: async () => getSavedFilters({ organisationId: orgId }),
    }),

  byIdCaughtFilter: (idOrSlug: string | null | undefined) =>
    queryOptions({
      queryKey: [...savedFilterQueries.byIdCaught(), idOrSlug],
      queryFn: async (): Promise<SavedFilterQueryData> => {
        if (!idOrSlug) {
          const empty: EmptyFilterQuery = { content: null };
          return empty;
        }
        return getSavedFilterById({ id: idOrSlug, slug: idOrSlug }).catch(
          () => null
        );
      },
      gcTime: Infinity,
      staleTime: Infinity,
      retry: false,
    }),
};
