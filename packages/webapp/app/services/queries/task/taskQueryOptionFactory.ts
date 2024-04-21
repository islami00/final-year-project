import { infiniteQueryOptions } from '@tanstack/react-query';
import { getTasksByStatus } from './getTasksByStatus';
import { paginationConsts } from '../../../utils/constants';
export const taskQueries = {
  all: ['all'] as const,
  listByStatus: () => [...taskQueries.all, 'list-by-status'],
  listByStatusFilter: (statusId: string) =>
    infiniteQueryOptions({
      queryKey: [...taskQueries.listByStatus(), statusId],
      queryFn: ({ pageParam }) =>
        getTasksByStatus({ statusId, page: pageParam }),
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
