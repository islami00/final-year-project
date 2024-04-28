import { parseWithZod } from '@conform-to/zod';
import { noop } from '@mantine/core';
import {
  Outlet,
  defer,
  json,
  redirect,
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
import { deleteBoard } from '../../services/queries/board/deleteBoard';
import { getBoardById } from '../../services/queries/board/getBoardById';
import { patchBoardById } from '../../services/queries/board/patchBoardById';
import { savedFilterQueries } from '../../services/queries/savedFilters/savedFilterQueries';
import { getStatusByBoardId } from '../../services/queries/status/getStatusByBoardId';
import { taskQueries } from '../../services/queries/task/taskQueryOptionFactory';
import { catchPostSubmissionError } from '../../utils/Form/catchPostSubmissionError';
import { specialFields } from '../../utils/Form/specialFields';
import { queryClient } from '../../utils/queryClient';
import * as boardIdForm from './form';
import { type BoardIdFilterData, type BoardIdLoaderData } from './types';
import { boardIdSchema } from './utils';
import { isSearchRequest } from '../../utils/Routes/isSearchRequest';

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
  const { request } = args;
  const user = await requireUser();
  await requireOrganizations(user.id);
  const { boardId } = await boardIdSchema.parseAsync(args.params);
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
          filter: currentFilter?.content,
        })
      )
    );
    const result = await Promise.all(statusQueries);
    return result;
  }
  filterQueries().catch(noop);
  getStatusQueries().catch(noop);
  const board = await getBoardById({
    id: boardId,
  });

  return defer<BoardIdLoaderData>({
    statuses,
    board,
  });
}

export function shouldRevalidate(args: ShouldRevalidateFunctionArgs) {
  const { defaultShouldRevalidate } = args;

  // Ignore searches
  if (isSearchRequest(args)) return false;

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
