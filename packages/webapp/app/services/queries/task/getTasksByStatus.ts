import { Operators, parseFilters } from '../../../utils/Filter';
import { paginationConsts } from '../../../utils/constants';
import { collections } from '../../pocketbase/collections';
import { pb } from '../../pocketbase/setup';
import TaskModel, { TaskApi } from '../../../models/Task.model';
import { forwardError } from '../../../utils/forwardError';
import { parseClientResponseError } from '../../../utils/parseClientResponseError';

interface GetTasksByStatusArgs {
  statusId: string;
  page: number;
  q?: string;
}
export async function getTasksByStatus(args: GetTasksByStatusArgs) {
  const { statusId, page, q } = args;

  const filters = parseFilters([
    {
      operator: Operators.EQ,
      field: 'statusId',
      value: statusId,
      placeholder: 'statusId',
    },
    {
      operator: Operators.CONTAINS,
      field: 'title',
      value: q,
      placeholder: 'q',
    },
  ]);

  const tasks = await pb
    .collection<TaskApi>(collections.task)
    .getList(page, paginationConsts.pageSize, {
      filter: pb.filter(filters.template, filters.params),
    })
    .catch(forwardError(parseClientResponseError));

  return TaskModel.fromListResult(tasks);
}
