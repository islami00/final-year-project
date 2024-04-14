import { forwardError } from '../../../utils/forwardError';
import { collections } from '../../pocketbase/collections';
import { pb } from '../../pocketbase/setup';
import { parseClientResponseError } from '../../../utils/parseClientResponseError';

interface DeleteUnAssignTaskFromUserArgs {
  /** This is from the result of getTaskAssignee, not userId */
  taskAssigneeId: string;
}

export async function deleteUnAssignTaskFromUser(
  args: DeleteUnAssignTaskFromUserArgs
): Promise<void> {
  const { taskAssigneeId } = args;

  await pb
    .collection(collections.task_assignee)
    .delete(taskAssigneeId)
    .catch(forwardError(parseClientResponseError));
}
