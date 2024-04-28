import { infiniteQueryOptions } from '@tanstack/react-query';
import {
  getTasksByStatus,
  type GetTasksByStatusArgs,
} from './getTasksByStatus';
import { paginationConsts } from '../../../utils/constants';
interface ListByStatusArgs {
  statusId: string;
  q: GetTasksByStatusArgs['q'];
  filter: GetTasksByStatusArgs['filter'] | undefined | null;
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
          filter: args.filter || undefined,
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
