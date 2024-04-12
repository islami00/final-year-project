import { forwardError } from '../../../utils/forwardError';
import TaskModel, {
  Priority,
  type Task,
  type TaskApi,
} from '../../../models/Task.model';
import { collections } from '../../pocketbase/collections';
import { pb } from '../../pocketbase/setup';
import { parseClientResponseError } from '../../../utils/parseClientResponseError';

interface PatchTaskByIdBody {
  statusId?: string;
  title?: string;
  priority?: Priority | '';
  columnOrder?: number;
  sprintPoints?: number;
  description?: TaskApi['description'];
}
interface PatchTaskByIdArgs {
  body: PatchTaskByIdBody;
  taskId: string;
}

export async function patchTaskById(args: PatchTaskByIdArgs): Promise<Task> {
  const { body, taskId } = args;

  const record = await pb
    .collection<TaskApi>(collections.task)
    .update(taskId, body)
    .catch(forwardError(parseClientResponseError));

  return TaskModel.fromApi(record);
}
