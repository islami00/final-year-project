import { infiniteQueryOptions } from '@tanstack/react-query';
import { getTasksByStatus } from './getTasksByStatus';
import { paginationConsts } from '../../../utils/constants';
interface ListByStatusArgs {
  statusId: string;
  q: string | null;
}

export const taskQueries = {
  all: ['all'] as const,
  listByStatus: () => [...taskQueries.all, 'list-by-status'],
  listByStatusFilter: (args: ListByStatusArgs) =>
    infiniteQueryOptions({
      queryKey: [...taskQueries.listByStatus(), args],
      queryFn: ({ pageParam }) =>
        getTasksByStatus({
          statusId: args.statusId,
          page: pageParam,
          q: args.q,
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
