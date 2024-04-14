import UserModel, { UserApi, User } from '../../../models/User.model';
import { collections } from '../../pocketbase/collections';
import { pb } from '../../pocketbase/setup';
import { forwardError } from '../../../utils/forwardError';
import { parseClientResponseError } from '../../../utils/parseClientResponseError';

interface GetTaskAssigneesArgs {
  taskId: string;
}
export async function getTaskAssignees(
  args: GetTaskAssigneesArgs
): Promise<User[]> {
  const { taskId } = args;
  const users = await pb
    .collection<UserApi>(collections.users)
    .getFullList({
      filter: pb.filter(
        `${collections.task_assignee}_via_assigneeId.taskId = {:taskId}`,
        { taskId }
      ),
    })
    .catch(forwardError(parseClientResponseError));

  return UserModel.fromArrayApi(users);
}
