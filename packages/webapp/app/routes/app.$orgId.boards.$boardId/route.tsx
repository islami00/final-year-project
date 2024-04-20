import {
  Outlet,
  defer,
  useLoaderData,
  type ClientLoaderFunctionArgs,
} from '@remix-run/react';
import { BoardPage } from '../../modules/BoardPage/BoardPage';
import {
  requireOrganizations,
  requireUser,
} from '../../services/pocketbase/auth';
import { getStatusByBoardId } from '../../services/queries/status/getStatusByBoardId';
import type { BoardIdLoaderData } from './types';
import { getBoardById } from '../../services/queries/board/getBoardById';

export async function clientLoader(args: ClientLoaderFunctionArgs) {
  const { params } = args;
  const user = await requireUser();
  await requireOrganizations(user.id);
  const boardId = params.boardId as string;
  const statuses = await getStatusByBoardId({
    boardId,
  });
  const board = await getBoardById({
    id: boardId,
  });

  return defer<BoardIdLoaderData>({ statuses, board });
}
export default function BoardRoute() {
  const data = useLoaderData<typeof clientLoader>();
  return (
    <>
      <BoardPage statuses={data.statuses.allStatuses} />
      <Outlet />
    </>
  );
}
