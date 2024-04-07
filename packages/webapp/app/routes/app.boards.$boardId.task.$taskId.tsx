import { parseWithZod } from '@conform-to/zod';
import {
  json,
  useLoaderData,
  useNavigate,
  type ClientLoaderFunctionArgs,
  defer,
  Await,
} from '@remix-run/react';
import * as React from 'react';
import { TaskDetails } from '../modules/Boards/components/TaskDetails/TaskDetails';
import { TaskDetailsLoading } from '../modules/Boards/components/TaskDetails/TaskDetails.loading';
import * as taskDetailsForm from '../modules/Boards/logic/taskDetailsForm';
import { getTaskById } from '../services/queries/task/getTaskById';
import { getTaskAssignees } from '../services/queries/task/getTaskAssignees';
import { patchTaskById } from '../services/queries/task/patchTaskById';
import { patchAssignTaskToUser } from '../services/queries/task/patchAssignTaskToUser';
import { getTaskAssigneeById } from '../services/queries/task/getTaskAssigneeById';
import { deleteUnAssignTaskFromUser } from '../services/queries/task/deleteUnAssignTaskFromUser';
import toast from 'react-hot-toast';
import { castError } from '../utils/parseClientResponseError';

export async function clientLoader(args: ClientLoaderFunctionArgs) {
  const { params } = args;
  const taskId = params.taskId as string;

  const taskDetails = Promise.all([
    getTaskById({ taskId: taskId }),
    getTaskAssignees({ taskId: taskId }),
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
      case taskDetailsForm.TaskDetailsIntent.ASSIGNEES:
        {
          if (!value.remove) {
            await patchAssignTaskToUser({
              taskId,
              userId: value.assignee,
            });
          } else {
            const taskAssignee = await getTaskAssigneeById({
              taskId,
              assigneeId: value.assignee,
            });
            await deleteUnAssignTaskFromUser({
              taskAssigneeId: taskAssignee.id,
            });
          }
        }
        return json(submission.reply({ resetForm: true }));

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
          const [task, assignees] = res;

          return <TaskDetails task={task} onClose={onClose} />;
        }}
      </Await>
    </React.Suspense>
  );
}