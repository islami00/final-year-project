import { Outlet, type ClientLoaderFunctionArgs, json } from '@remix-run/react';
import { getStatusByBoardId } from '../../services/queries/status/getStatusByBoardId';
import {
  requireOrganizations,
  requireUser,
} from '../../services/pocketbase/auth';
import type { BoardIdLoaderData } from './types';

export async function clientLoader(args: ClientLoaderFunctionArgs) {
  const { params } = args;
  const user = await requireUser();
  await requireOrganizations(user.id);
  const statuses = await getStatusByBoardId({
    boardId: params.boardId as string,
  });

  return json<BoardIdLoaderData>({ statuses });
}
export default function BoardRoute() {
  return (
    <>
      Board With outlet below for tasks
      <Outlet />
    </>
  );
}
