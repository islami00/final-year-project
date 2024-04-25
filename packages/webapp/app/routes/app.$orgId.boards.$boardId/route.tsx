import {
  Outlet,
  defer,
  useParams,
  type ClientLoaderFunctionArgs,
  type ClientActionFunctionArgs,
  json,
  redirect,
} from '@remix-run/react';
import { BoardPage } from '../../modules/BoardPage/BoardPage';
import {
  requireOrganizations,
  requireUser,
} from '../../services/pocketbase/auth';
import { getBoardById } from '../../services/queries/board/getBoardById';
import { getStatusByBoardId } from '../../services/queries/status/getStatusByBoardId';
import { taskQueries } from '../../services/queries/task/taskQueryOptionFactory';
import { queryClient } from '../../utils/queryClient';
import { type BoardIdLoaderData } from './types';
import { useMemo } from 'react';
import { boardIdSchema } from './utils';
import { parseWithZod } from '@conform-to/zod';
import * as boardIdForm from './form';
import { deleteBoard } from '../../services/queries/board/deleteBoard';
import { catchPostSubmissionError } from '../../utils/Form/catchPostSubmissionError';
import { patchBoardById } from '../../services/queries/board/patchBoardById';

export async function clientAction(args: ClientActionFunctionArgs) {
  const { request } = args;
  const formData = await request.formData();
  const submission = parseWithZod(formData, {
    schema: boardIdForm.schema,
  });
  if (submission.status !== 'success') {
    return json(submission.reply());
  }
  const { value } = submission;
  try {
    switch (value.intent) {
      case boardIdForm.BoardIdFormIntent.DELETE_BOARD:
        await deleteBoard({ boardId: value.boardId });
        return redirect('../');
      case boardIdForm.BoardIdFormIntent.NAME:
        await patchBoardById({ body: { name: value.name }, id: value.id });
        break;
      default:
        break;
    }
    return json(submission.reply({ resetForm: true }));
  } catch (error) {
    return catchPostSubmissionError(error, submission);
  }
}

export async function clientLoader(args: ClientLoaderFunctionArgs) {
  const user = await requireUser();
  await requireOrganizations(user.id);
  const { boardId } = await boardIdSchema.parseAsync(args.params);
  const statuses = await getStatusByBoardId({
    boardId,
  });
  const statusQueries = statuses.allStatuses.map((each) =>
    queryClient.fetchInfiniteQuery(taskQueries.listByStatusFilter(each.id))
  );

  const board = await getBoardById({
    id: boardId,
  });

  return defer<BoardIdLoaderData>({
    statuses,
    board,
    statusQueries: Promise.all(statusQueries),
  });
}
export default function BoardRoute() {
  const rawParams = useParams();
  const params = useMemo(() => boardIdSchema.parse(rawParams), [rawParams]);
  return (
    <>
      <BoardPage key={params.boardId} params={params} />
      <Outlet />
    </>
  );
}
