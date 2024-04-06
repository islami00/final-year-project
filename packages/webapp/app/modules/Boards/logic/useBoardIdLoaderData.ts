import { useRouteLoaderData } from '@remix-run/react';
import { AppInternalError } from '../../../utils/AppInternalError';
import { StatusListWithDefault } from '../../../models/Status.model';

export interface BoardIdLoaderData {
  statuses: StatusListWithDefault;
}

export function useBoardIdLoaderData(): BoardIdLoaderData {
  const data = useRouteLoaderData<BoardIdLoaderData | undefined>(
    'routes/app.boards.$boardId'
  );
  if (!data) {
    throw new AppInternalError('routes/boards.$boardId loader data missing');
  }

  return data;
}
