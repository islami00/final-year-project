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

export async function clientLoader(args: ClientLoaderFunctionArgs) {
  const { params } = args;
  const user = await requireUser();
  await requireOrganizations(user.id);
  const statuses = await getStatusByBoardId({
    boardId: params.boardId as string,
  });

  return defer<BoardIdLoaderData>({ statuses });
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
