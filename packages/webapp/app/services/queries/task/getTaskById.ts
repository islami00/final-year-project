import TaskModel, { TaskApi, Task } from '../../../models/Task.model';
import { collections } from '../../pocketbase/collections';
import { pb } from '../../pocketbase/setup';

interface GetTaskByIdArgs {
  taskId: string;
}
export async function getTaskById(args: GetTaskByIdArgs): Promise<Task> {
  const { taskId } = args;
  const task = await pb.collection<TaskApi>(collections.task).getOne(taskId);
  return TaskModel.fromApi(task);
}
