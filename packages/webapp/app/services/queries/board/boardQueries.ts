import type { GetDepartmentBoardsArgs } from '../department/getDepartmentBoards';

export const boardQueries = {
  all: ['board'] as const,
  byDepartment: () => [...boardQueries.all, 'by-department'],
  byDepartmentFilter: (args: GetDepartmentBoardsArgs) => [
    ...boardQueries.byDepartment(),
    args,
  ],
};
