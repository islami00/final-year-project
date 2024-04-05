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

  // Pass statusId
  console.log(value);
  postCreateTask;
  return null;
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
