import { useRouteLoaderData } from '@remix-run/react';
import { AppInternalError } from '../../../utils/AppInternalError';
import { StatusListWithDefault } from '../../../models/Status.model';
import { routeConfig } from '../../../routes/utils';

export interface BoardIdLoaderData {
  statuses: StatusListWithDefault;
}

export function useBoardIdLoaderData(): BoardIdLoaderData {
  const data = useRouteLoaderData<BoardIdLoaderData | undefined>(
    routeConfig.board.routeId
  );
  if (!data) {
    throw new AppInternalError(
      `${routeConfig.board.routeId} loader data missing`
    );
  }

  return data;
}
