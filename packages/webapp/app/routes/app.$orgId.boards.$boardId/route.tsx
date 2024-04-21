import {
  Outlet,
  defer,
  useParams,
  type ClientLoaderFunctionArgs,
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

export async function clientLoader(args: ClientLoaderFunctionArgs) {
  const { params } = args;
  const user = await requireUser();
  await requireOrganizations(user.id);
  const boardId = params.boardId as string;
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
