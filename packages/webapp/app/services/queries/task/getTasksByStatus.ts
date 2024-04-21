import TaskWithAssigneesModel, {
  TaskWithAssigneeApi,
} from '../../../models/TaskWithAssignees.model';
import { Operators, parseFilters } from '../../../utils/Filter';
import { paginationConsts } from '../../../utils/constants';
import { forwardError } from '../../../utils/forwardError';
import { parseClientResponseError } from '../../../utils/parseClientResponseError';
import { collections } from '../../pocketbase/collections';
import { pb } from '../../pocketbase/setup';

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
    .collection<TaskWithAssigneeApi>(collections.task)
    .getList(page, paginationConsts.pageSize, {
      filter: pb.filter(filters.template, filters.params),
      expand: `${collections.task_assignee}_via_taskId.assigneeId`,
    })
    .catch(forwardError(parseClientResponseError));

  return TaskWithAssigneesModel.fromListResult(tasks);
}
