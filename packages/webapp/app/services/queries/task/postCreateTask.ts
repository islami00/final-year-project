import TaskModel, {
  type Task,
  type TaskApi,
  type TaskCreate,
} from '../../../models/Task.model';
import { forwardError } from '../../../utils/ErrorHandling/forwardError';
import { parseClientResponseError } from '../../../utils/ErrorHandling/parseClientResponseError';
import { collections } from '../../pocketbase/collections';
import { pb } from '../../pocketbase/setup';

interface PostCreateTaskArgs {
  body: TaskCreate;
}
export async function postCreateTask(args: PostCreateTaskArgs): Promise<Task> {
  const { body } = args;

  const data = await pb
    .collection<TaskApi>(collections.task)
    .create(body)
    .catch(forwardError(parseClientResponseError));

  return TaskModel.fromApi(data);
}
