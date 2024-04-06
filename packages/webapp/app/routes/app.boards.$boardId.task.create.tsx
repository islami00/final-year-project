import {
  useNavigate,
  useParams,
  type ClientActionFunctionArgs,
  json,
} from '@remix-run/react';
import { CreateTask } from '../modules/Boards/components/CreateTask';
import { useMemo } from 'react';
import { boardIdSchema } from './utils';
import { parseWithYup } from '@conform-to/yup';
import * as createTaskForm from '../modules/Boards/logic/createTaskForm';
import { postCreateTask } from '../services/queries/task/postCreateTask';
import { useBoardIdLoaderData } from '../modules/Boards/logic/useBoardIdLoaderData';
import toast from 'react-hot-toast';
import { castError } from '../utils/parseClientResponseError';

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
    const task = await postCreateTask({
      body: {
        boardId: value.boardId,
        statusId: value.statusId,
        title: value.title,
      },
    });
    return json({ task });
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
