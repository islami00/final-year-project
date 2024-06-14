import { forwardError } from '../../../utils/ErrorHandling/forwardError';
import { parseClientResponseError } from '../../../utils/ErrorHandling/parseClientResponseError';
import { collections } from '../../pocketbase/collections';
import { pb } from '../../pocketbase/setup';

interface DeleteTaskArgs {
  taskId: string;
}
export async function deleteTask(args: DeleteTaskArgs): Promise<void> {
  const { taskId } = args;

  await pb
    .collection(collections.task)
    .delete(taskId)
    .catch(forwardError(parseClientResponseError));
}
