import { useRouteLoaderData } from '@remix-run/react';
import { StatusListWithDefault } from '../../../models/Status.model';
import { AppError } from '../../../utils/AppError';

export interface BoardIdLoaderData {
  statuses: StatusListWithDefault;
}

export function useBoardIdLoaderData(): BoardIdLoaderData {
  const data = useRouteLoaderData<BoardIdLoaderData | undefined>(
    'routes/app.boards.$boardId'
  );
  if (!data) {
    throw new AppError('routes/boards.$boardId loader data missing');
  }

  return data;
}
