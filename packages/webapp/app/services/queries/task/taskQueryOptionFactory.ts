import { infiniteQueryOptions } from '@tanstack/react-query';
import { paginationConsts } from '../../../utils/constants';
import type { SavedFilterQueryData } from '../savedFilters/savedFilterQueries';
import {
  getTasksByStatus,
  type GetTasksByStatusArgs,
} from './getTasksByStatus';

interface ListByStatusArgs {
  statusId: string;
  q: GetTasksByStatusArgs['q'];

  savedFilter: SavedFilterQueryData;
}
export const taskQueries = {
  all: ['task'] as const,
  listByStatus: () => [...taskQueries.all, 'list-by-status'] as const,
  listByStatusFilterKey: (args: ListByStatusArgs) =>
    [...taskQueries.listByStatus(), args] as const,
  listByStatusFilterQuery: (args: ListByStatusArgs) =>
    infiniteQueryOptions({
      queryKey: taskQueries.listByStatusFilterKey(args),
      queryFn: ({ pageParam, signal }) =>
        getTasksByStatus({
          statusId: args.statusId,
          page: pageParam,
          q: args.q,
          filter: args.savedFilter?.content || undefined,
          signal,
        }),
      initialPageParam: paginationConsts.defaultPage,
      getNextPageParam: (lastPage) => {
        if (lastPage.totalPages === paginationConsts.noPages) return null;
        return lastPage.page === lastPage.totalPages ? null : lastPage.page + 1;
      },
      getPreviousPageParam: (firstPage) => {
        if (firstPage.totalPages === paginationConsts.noPages) return null;
        return firstPage.page === 0 ? null : firstPage.page - 1;
      },
    }),
};
