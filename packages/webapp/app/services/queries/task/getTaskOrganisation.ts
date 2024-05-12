import { pb } from '../../pocketbase/setup';
import { collections } from '../../pocketbase/collections';
import TaskWithOrganisationModel, {
  TaskWithOrganisationApi,
  type TaskWithOrganisation,
} from '../../../models/TaskWithOrganisation.model';
import { forwardError } from '../../../utils/ErrorHandling/forwardError';
import { parseClientResponseError } from '../../../utils/ErrorHandling/parseClientResponseError';
import { parseZodError } from '../../../utils/ErrorHandling/parseZodError';

interface GetTaskOrganisationArgs {
  taskId: string;
}

export async function getTaskWithOrganisation(
  args: GetTaskOrganisationArgs
): Promise<TaskWithOrganisation> {
  const { taskId } = args;

  const res = await pb
    .collection<TaskWithOrganisationApi>(collections.task)
    .getOne(taskId, {
      expand: 'boardId.departmentId.organisationId',
    })
    .catch(forwardError(parseClientResponseError, parseZodError));
  return TaskWithOrganisationModel.fromApi(res);
}
