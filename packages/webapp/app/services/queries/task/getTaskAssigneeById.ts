import { forwardError } from '../../../utils/forwardError';
import { collections } from '../../pocketbase/collections';
import { pb } from '../../pocketbase/setup';
import { parseClientResponseError } from '../../../utils/parseClientResponseError';
import type { RecordModel } from 'pocketbase';

interface GetTaskAssigneeArgs {
  taskId: string;
  assigneeId: string;
}

export async function getTaskAssigneeById(
  args: GetTaskAssigneeArgs
): Promise<RecordModel> {
  const { taskId, assigneeId } = args;
  const data = await pb
    .collection(collections.task_assignee)
    .getFirstListItem(
      pb.filter(
        `
      (taskId = {:taskId}) &&
      (assigneeId = {:assigneeId})
    `,
        { taskId, assigneeId }
      )
    )
    .catch(forwardError(parseClientResponseError));
  return data;
}
