import type { ListResult } from 'pocketbase';
import TaskWithAssigneesModel, {
  TaskWithAssigneeApi,
  type TaskWithAssignees,
} from '../../../models/TaskWithAssignees.model';
import { FilterDataType, Operators, parseFilters } from '../../../utils/Filter';
import { paginationConsts } from '../../../utils/constants';
import { forwardError } from '../../../utils/forwardError';
import { parseClientResponseError } from '../../../utils/parseClientResponseError';
import { collections } from '../../pocketbase/collections';
import { pb } from '../../pocketbase/setup';
import { SavedFilter } from '../../../models/SavedFilter.model';

export interface GetTasksByStatusArgs {
  statusId: string;
  page: number;
  q?: string | null;
  filter?: SavedFilter['content'];
  signal?: AbortSignal;
}
export async function getTasksByStatus(
  args: GetTasksByStatusArgs
): Promise<ListResult<TaskWithAssignees>> {
  const { statusId, page, q = null, filter = [], signal } = args;

  const filters = parseFilters([
    {
      operatorChip: { operator: Operators.EQ, label: '' },
      meta: {
        field: 'statusId',
        label: 'statusId',
        dataType: FilterDataType.SELECT,
        id: '',
      },
      value: statusId,
      values: null,
      id: '0',
    },
    {
      operatorChip: { operator: Operators.CONTAINS, label: '' },
      meta: {
        field: 'title',
        label: 'q',
        dataType: FilterDataType.TEXT,
        id: '',
      },
      value: q,
      values: null,
      id: '1',
    },
    ...filter,
  ]);

  const tasks = await pb
    .collection<TaskWithAssigneeApi>(collections.task)
    .getList(page, paginationConsts.pageSize, {
      filter: pb.filter(filters.template, filters.params),
      expand: `${collections.task_assignee}_via_taskId.assigneeId`,
      signal,
    })
    .catch(forwardError(parseClientResponseError));

  return TaskWithAssigneesModel.fromListResult(tasks);
}
