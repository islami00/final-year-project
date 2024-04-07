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
import {
  TaskDetailsIntent,
  taskDetailsForm,
} from '../modules/Boards/logic/taskDetailsForm';
import { getTaskById } from '../services/queries/task/getTaskById';

export async function clientLoader(args: ClientLoaderFunctionArgs) {
  const { params } = args;

  const task = getTaskById({ taskId: params.taskId as string });
  return defer({ task });
}
export async function clientAction(args: ClientLoaderFunctionArgs) {
  const { request } = args;
  const formData = await request.formData();

  const submission = parseWithZod(formData, {
    schema: taskDetailsForm,
  });

  if (submission.status !== 'success') {
    return json(submission.reply());
  }
  const { value } = submission;

  switch (value.intent) {
    case TaskDetailsIntent.TITLE:
      value;
      break;

    default:
      break;
  }
  return json({});
}
export default function BoardTaskDetailsRoute() {
  const loaderData = useLoaderData<typeof clientLoader>();
  const navigate = useNavigate();
  const onClose = () => navigate('../');
  return (
    <React.Suspense fallback={<TaskDetailsLoading onClose={onClose} />}>
      <Await resolve={loaderData.task}>
        {(task) => <TaskDetails task={task} onClose={onClose} />}
      </Await>
    </React.Suspense>
  );
}
