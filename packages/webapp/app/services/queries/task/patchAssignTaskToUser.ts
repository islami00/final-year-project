import type { RecordModel } from 'pocketbase';
import { collections } from '../../pocketbase/collections';
import { pb } from '../../pocketbase/setup';

interface PatchAssignTaskToUserArgs {
  userId: string;
  taskId: string;
}

interface TaskAssigneeCreate {
  taskId: string;
  assigneeId: string;
}
export async function patchAssignTaskToUser(
  args: PatchAssignTaskToUserArgs
): Promise<RecordModel> {
  const { taskId, userId } = args;
  const createData: TaskAssigneeCreate = {
    taskId,
    assigneeId: userId,
  };
  return pb.collection(collections.task_assignee).create(createData);
}
