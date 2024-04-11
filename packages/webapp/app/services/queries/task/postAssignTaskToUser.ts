import type { RecordModel } from 'pocketbase';
import { collections } from '../../pocketbase/collections';
import { pb } from '../../pocketbase/setup';
import { forwardError } from '../../../utils/forwardError';
import { parseClientResponseError } from '../../../utils/parseClientResponseError';

interface PostAssignTaskToUserArgs {
  userId: string;
  taskId: string;
}

interface TaskAssigneeCreate {
  taskId: string;
  assigneeId: string;
}
export async function postAssignTaskToUser(
  args: PostAssignTaskToUserArgs
): Promise<RecordModel> {
  const { taskId, userId } = args;
  const createData: TaskAssigneeCreate = {
    taskId,
    assigneeId: userId,
  };
  return pb
    .collection(collections.task_assignee)
    .create(createData)
    .catch(forwardError(parseClientResponseError));
}
