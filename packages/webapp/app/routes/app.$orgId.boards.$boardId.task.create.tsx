import { parseWithYup } from '@conform-to/yup';
import {
  generatePath,
  redirect,
  useNavigate,
  useParams,
  type ClientActionFunctionArgs,
} from '@remix-run/react';
import { useMemo } from 'react';
import toast from 'react-hot-toast';
import { CreateTask } from '../modules/BoardPage/components/CreateTask';
import * as createTaskForm from '../modules/BoardPage/logic/createTaskForm';
import { useRouteLoaderDataOrThrow } from '../hooks/useRouteLoaderDataOrThrow';
import { type BoardIdLoaderData } from './app.$orgId.boards.$boardId/types';
import { getNextTaskColumnOrder } from '../services/queries/task/getNextTaskColumnOrder';
import { postCreateTask } from '../services/queries/task/postCreateTask';
import { castError } from '../utils/ErrorHandling/parseClientResponseError';
import { routeConfig } from '../utils/routeConfig';
import { boardIdSchema } from './app.$orgId.boards.$boardId/utils';

export async function clientAction(args: ClientActionFunctionArgs) {
  const { request, params } = args;

  const formData = await request.formData();
  const submission = parseWithYup(formData, {
    schema: createTaskForm.schema,
  });

  if (submission.status !== 'success') {
    return submission.reply();
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
      generatePath(routeConfig.boardTasks.param, {
        boardId: task.boardId,
        taskId: task.id,
        orgId: params.orgId as string,
      })
    );
  } catch (error) {
    const appError = castError(error);
    toast.error(appError.message);
    return submission.reply({ resetForm: false });
  }
}

export default function BoardTaskCreateRoute() {
  const navigate = useNavigate();
  const onClose = () => {
    navigate('../');
  };

  const rawParams = useParams();
  // If this isn't defined, it's likely a dev error.
  const params = useMemo(() => boardIdSchema.parse(rawParams), [rawParams]);
  const { statuses } = useRouteLoaderDataOrThrow<BoardIdLoaderData>(
    routeConfig.board.routeId
  );

  return (
    <CreateTask
      key={params.boardId}
      boardId={params.boardId}
      onClose={onClose}
      defaultStatusId={statuses.defaultStatus.id}
    />
  );
}
