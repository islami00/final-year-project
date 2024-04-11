import { parseWithZod } from '@conform-to/zod';
import {
  Await,
  defer,
  json,
  useLoaderData,
  useNavigate,
  type ClientLoaderFunctionArgs,
} from '@remix-run/react';
import * as React from 'react';
import toast from 'react-hot-toast';
import { TaskDetails } from '../modules/Boards/components/TaskDetails/TaskDetails';
import { TaskDetailsLoading } from '../modules/Boards/components/TaskDetails/TaskDetails.loading';
import * as taskDetailsForm from '../modules/Boards/logic/taskDetailsForm';
import { getOrganisationUsers } from '../services/queries/organization/getOrganizationUsers';
import { deleteUnAssignTaskFromUser } from '../services/queries/task/deleteUnAssignTaskFromUser';
import { getTaskAssigneeById } from '../services/queries/task/getTaskAssigneeById';
import { getTaskAssignees } from '../services/queries/task/getTaskAssignees';
import { getTaskWithOrganisation } from '../services/queries/task/getTaskOrganisation';
import { postAssignTaskToUser } from '../services/queries/task/postAssignTaskToUser';
import { patchTaskById } from '../services/queries/task/patchTaskById';
import { castError } from '../utils/parseClientResponseError';

export async function clientLoader(args: ClientLoaderFunctionArgs) {
  const { params } = args;
  const taskId = params.taskId as string;

  const taskAssigneesPromise = getTaskAssignees({ taskId: taskId });

  const taskOrg = await getTaskWithOrganisation({ taskId });
  const allUsersPromise = getOrganisationUsers({
    organisationId: taskOrg.organisation.id,
  });
  const taskDetails = Promise.all([
    taskOrg,
    taskAssigneesPromise,
    allUsersPromise,
  ]);
  return defer({ taskDetails });
}
export async function clientAction(args: ClientLoaderFunctionArgs) {
  const { request, params } = args;
  const formData = await request.formData();

  const taskId = params.taskId as string;
  const submission = parseWithZod(formData, {
    schema: taskDetailsForm.schema,
  });

  if (submission.status !== 'success') {
    return json(submission.reply());
  }
  const { value } = submission;

  try {
    switch (value.intent) {
      case taskDetailsForm.TaskDetailsIntent.TITLE: {
        await patchTaskById({
          body: {
            title: value.title,
          },
          taskId,
        });
        return json(submission.reply({ resetForm: true }));
      }
      case taskDetailsForm.TaskDetailsIntent.ADD_ASSIGNEE:
        await postAssignTaskToUser({
          taskId,
          userId: value.assignee,
        });
        return json(submission.reply({ resetForm: true }));

      case taskDetailsForm.TaskDetailsIntent.REMOVE_ASSIGNEE: {
        const taskAssignee = await getTaskAssigneeById({
          taskId,
          assigneeId: value.assignee,
        });
        await deleteUnAssignTaskFromUser({
          taskAssigneeId: taskAssignee.id,
        });
        return json(submission.reply({ resetForm: true }));
      }

      default:
        return json(submission.reply({ resetForm: true }));
    }
  } catch (error) {
    const appError = castError(error);
    toast.error(appError.message);
    // Revert
    return json(submission.reply({ resetForm: true }));
  }
}
export default function BoardTaskDetailsRoute() {
  const loaderData = useLoaderData<typeof clientLoader>();
  const navigate = useNavigate();
  const onClose = () => navigate('../');
  return (
    <React.Suspense fallback={<TaskDetailsLoading onClose={onClose} />}>
      <Await resolve={loaderData.taskDetails}>
        {(res) => {
          const [task, assignees, allUsers] = res;

          return (
            <TaskDetails
              task={task}
              onClose={onClose}
              assignees={assignees}
              allUsers={allUsers}
            />
          );
        }}
      </Await>
    </React.Suspense>
  );
}
