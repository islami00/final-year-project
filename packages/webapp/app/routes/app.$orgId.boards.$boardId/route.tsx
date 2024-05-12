import { noop } from '@mantine/core';
import {
  Outlet,
  useParams,
  type ClientActionFunctionArgs,
  type ClientLoaderFunctionArgs,
  type ShouldRevalidateFunctionArgs,
} from '@remix-run/react';
import { useMemo } from 'react';
import { BoardPage } from '../../modules/BoardPage/BoardPage';
import {
  requireOrganizations,
  requireUser,
} from '../../services/pocketbase/auth';
import { getBoardById } from '../../services/queries/board/getBoardById';
import { getOrganisationUsers } from '../../services/queries/organization/getOrganizationUsers';
import { savedFilterQueries } from '../../services/queries/savedFilters/savedFilterQueries';
import { getStatusByBoardId } from '../../services/queries/status/getStatusByBoardId';
import { taskQueries } from '../../services/queries/task/taskQueryOptionFactory';
import { specialFields } from '../../utils/Form/specialFields';
import {
  isFilterRequest,
  isSavedFilterRequest,
  isSearchRequest,
} from '../../utils/Routes/isSearchRequest';
import { queryClient } from '../../utils/queryClient';
import { type BoardIdFilterData } from './types';
import { boardIdSchema } from './utils';
import { formDataHandler } from './formDataHandler';
import { jsonHandler } from './jsonHandler';

export async function clientAction(args: ClientActionFunctionArgs) {
  const { request } = args;

  switch (request.headers.get('content-type')) {
    case 'application/json':
      return jsonHandler(args);
    default:
      return formDataHandler(args);
  }
}

export async function clientLoader(args: ClientLoaderFunctionArgs) {
  const { request } = args;
  const user = await requireUser();
  await requireOrganizations(user.id);
  const { boardId, orgId } = await boardIdSchema.parseAsync(args.params);
  const statuses = await getStatusByBoardId({
    boardId,
  });
  const search = new URL(request.url).searchParams;

  // Filters
  const savedFilterParam = search.get(specialFields.savedFilter);
  const filterParam = search.get(specialFields.filter);
  const savedFilterPromise = queryClient.fetchQuery(
    savedFilterQueries.byIdCaughtFilter(savedFilterParam)
  );
  const filterPromise = queryClient.fetchQuery(
    savedFilterQueries.byIdCaughtFilter(filterParam)
  );

  async function filterQueries(): Promise<BoardIdFilterData> {
    const savedFilter = await savedFilterPromise;
    const currentFilter = await filterPromise;
    return {
      savedFilter,
      currentFilter,
    };
  }
  async function getStatusQueries() {
    const currentFilter = await filterPromise;
    const statusQueries = statuses.allStatuses.map((each) =>
      queryClient.fetchInfiniteQuery(
        taskQueries.listByStatusFilterQuery({
          statusId: each.id,
          q: search.get(specialFields.q),
          savedFilter: currentFilter,
        })
      )
    );
    const result = await Promise.all(statusQueries);
    return result;
  }
  filterQueries().catch(noop);
  getStatusQueries().catch(noop);

  // Users
  const users = await getOrganisationUsers({
    organisationId: orgId,
  });
  const board = await getBoardById({
    id: boardId,
  });

  return {
    statuses,
    board,
    users,
    user,
  };
}

export function shouldRevalidate(args: ShouldRevalidateFunctionArgs) {
  const { defaultShouldRevalidate } = args;

  // Ignore searches
  // Todo: Check if filter and saved filter works.
  if (
    isSearchRequest(args) ||
    isFilterRequest(args) ||
    isSavedFilterRequest(args)
  ) {
    return false;
  }

  return defaultShouldRevalidate;
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
