import { parseWithYup } from '@conform-to/yup';
import {
  generatePath,
  json,
  redirect,
  useNavigate,
  useParams,
  type ClientActionFunctionArgs,
} from '@remix-run/react';
import { useMemo } from 'react';
import toast from 'react-hot-toast';
import { CreateTask } from '../modules/Boards/components/CreateTask';
import * as createTaskForm from '../modules/Boards/logic/createTaskForm';
import { useBoardIdLoaderData } from '../modules/Boards/logic/useBoardIdLoaderData';
import { getNextTaskColumnOrder } from '../services/queries/task/getNextTaskColumnOrder';
import { postCreateTask } from '../services/queries/task/postCreateTask';
import { castError } from '../utils/parseClientResponseError';
import { boardIdSchema, routeConfig } from './utils';

export async function clientAction(args: ClientActionFunctionArgs) {
  const { request } = args;

  const formData = await request.formData();
  const submission = parseWithYup(formData, {
    schema: createTaskForm.schema,
  });

  if (submission.status !== 'success') {
    return json(submission.reply());
  }
  const { value } = submission;

  try {
    const nextColumnOrder = await getNextTaskColumnOrder({
      boardId: value.boardId as string,
    });
    const task = await postCreateTask({
      body: {
        boardId: value.boardId,
        statusId: value.statusId,
        title: value.title,
        columnOrder: nextColumnOrder,
      },
    });
    return redirect(
      generatePath(routeConfig.boardTasks, {
        boardId: task.boardId,
        taskId: task.id,
      })
    );
  } catch (error) {
    const appError = castError(error);
    toast.error(appError.message);
    return json(submission.reply({ resetForm: false }));
  }
}

export default function BoardTaskCreateRoute() {
  const navigate = useNavigate();
  const onClose = () => {
    navigate('../');
  };

  const rawParams = useParams();
  // If this isn't defined, it's likely a dev error.
  const params = useMemo(() => boardIdSchema.cast(rawParams), [rawParams]);
  const { statuses } = useBoardIdLoaderData();

  return (
    <CreateTask
      key={params.boardId}
      boardId={params.boardId}
      onClose={onClose}
      defaultStatusId={statuses.defaultStatus.id}
    />
  );
}
