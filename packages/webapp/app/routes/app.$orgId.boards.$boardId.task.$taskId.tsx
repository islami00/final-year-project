import { parseWithZod } from '@conform-to/zod';
import {
  Await,
  generatePath,
  redirect,
  useLoaderData,
  useNavigate,
  type ClientLoaderFunctionArgs,
} from '@remix-run/react';
import omitBy from 'lodash/fp/omitBy';
import * as React from 'react';
import { TaskDetails } from '../modules/BoardPage/components/TaskDetails/TaskDetails';
import { TaskDetailsLoading } from '../modules/BoardPage/components/TaskDetails/TaskDetails.loading';
import * as taskDetailsForm from '../modules/BoardPage/logic/taskDetailsForm';
import { getOrganisationUsers } from '../services/queries/organization/getOrganizationUsers';
import { deleteTask } from '../services/queries/task/deleteTask';
import { deleteUnAssignTaskFromUser } from '../services/queries/task/deleteUnAssignTaskFromUser';
import { getTaskAssigneeById } from '../services/queries/task/getTaskAssigneeById';
import { getTaskAssignees } from '../services/queries/task/getTaskAssignees';
import { getTaskWithOrganisation } from '../services/queries/task/getTaskOrganisation';
import {
  patchTaskById,
  type PatchTaskByIdBody,
} from '../services/queries/task/patchTaskById';
import { postAssignTaskToUser } from '../services/queries/task/postAssignTaskToUser';
import { catchPostSubmissionError } from '../utils/Form/catchPostSubmissionError';
import { routeConfig } from '../utils/routeConfig';

interface TaskPropertySubmission {
  priority?: taskDetailsForm.PriorityFormData['priority'];
  title?: string;
  sprintPoints?: number;
  description?: taskDetailsForm.DescriptionFormData['description'];
  statusId?: taskDetailsForm.StatusFormData['statusId'];
}
function parseTaskPropertySubmission(
  possible: TaskPropertySubmission
): PatchTaskByIdBody {
  const res: PatchTaskByIdBody = {
    priority: possible.priority,
    description: possible.description,
    sprintPoints: possible.sprintPoints,
    statusId: possible.statusId,
    title: possible.title,
  };
  // Omit empty.
  return omitBy((v) => v === undefined, res);
}

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
  return { taskDetails };
}
export async function clientAction(args: ClientLoaderFunctionArgs) {
  const { request, params } = args;
  const formData = await request.formData();

  const taskId = params.taskId as string;
  const boardId = params.boardId as string;
  const orgId = params.orgId as string;
  const submission = parseWithZod(formData, {
    schema: taskDetailsForm.schema,
  });

  if (submission.status !== 'success') {
    return submission.reply();
  }
  const { value } = submission;

  try {
    switch (value.intent) {
      case taskDetailsForm.TaskDetailsIntent.PRIORITY:
      case taskDetailsForm.TaskDetailsIntent.STATUS:
      case taskDetailsForm.TaskDetailsIntent.DESCRIPTION:
      case taskDetailsForm.TaskDetailsIntent.SPRINT_POINTS:
      case taskDetailsForm.TaskDetailsIntent.TITLE: {
        await patchTaskById({
          body: parseTaskPropertySubmission(value),
          taskId,
        });
        return submission.reply({ resetForm: true });
      }
      case taskDetailsForm.TaskDetailsIntent.ADD_ASSIGNEE:
        await postAssignTaskToUser({
          taskId,
          userId: value.assignee,
        });
        return submission.reply({ resetForm: true });

      case taskDetailsForm.TaskDetailsIntent.REMOVE_ASSIGNEE: {
        const taskAssignee = await getTaskAssigneeById({
          taskId,
          assigneeId: value.assignee,
        });
        await deleteUnAssignTaskFromUser({
          taskAssigneeId: taskAssignee.id,
        });
        return submission.reply({ resetForm: true });
      }

      case taskDetailsForm.TaskDetailsIntent.DELETE_TASK:
        await deleteTask({ taskId });
        return redirect(
          generatePath(routeConfig.board.param, {
            boardId,
            orgId,
          })
        );
      default:
        return submission.reply({ resetForm: true });
    }
  } catch (error) {
    return catchPostSubmissionError(error, submission);
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
