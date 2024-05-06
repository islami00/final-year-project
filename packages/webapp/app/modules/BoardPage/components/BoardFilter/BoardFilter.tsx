import { useLoaderData, useSearchParams } from '@remix-run/react';
import { useQueryClient, useSuspenseQueries } from '@tanstack/react-query';
import { nanoid } from 'nanoid';
import SavedFilterModel, {
  SavedFilterKind,
  type CreateSavedFilter,
} from '../../../../models/SavedFilter.model';
import { BoardIdLoader } from '../../../../routes/app.$orgId.boards.$boardId/types';
import { postSaveTempFilter } from '../../../../services/queries/savedFilters/postSaveTempFilter';
import { savedFilterQueries } from '../../../../services/queries/savedFilters/savedFilterQueries';
import { Filter } from '../../../../utils/Filter';
import { specialFields } from '../../../../utils/Form/specialFields';
import { AddFilter } from './AddFilter/AddFilter';
import { BoardFilterButton } from './BoardFilterButton/BoardFilterButton';
import { PB_ID_LENGTH } from '../../../../utils/constants';
import { noop } from '@mantine/core';
import { ListFiltersButton } from './ListFiltersButton/ListFiltersButton';

export function BoardFilter() {
  const [search, setParams] = useSearchParams();
  const filter = search.get(specialFields.filter);
  const savedFilter = search.get(specialFields.savedFilter);

  const queryClient = useQueryClient();
  const { users, statuses, user } = useLoaderData<BoardIdLoader>();
  const [filterQuery] = useSuspenseQueries({
    queries: [
      savedFilterQueries.byIdCaughtFilter(filter),
      savedFilterQueries.byIdCaughtFilter(savedFilter),
    ],
  });

  async function applyFilter(filterData: Filter) {
    const id = filter || nanoid(PB_ID_LENGTH);
    const createFilter: CreateSavedFilter = {
      id,
      slug: id,
      content: [filterData],
      name: SavedFilterKind.TEMPORARY,
      kind: SavedFilterKind.TEMPORARY,
      createdBy: user.id,
    };
    const fullFilter = await SavedFilterModel.fromApi(createFilter);
    // Set client state
    queryClient.setQueryData(
      savedFilterQueries.byIdCaughtFilter(id).queryKey,
      fullFilter
    );
    // At the same time, save and try to do a bookmark
    setParams((prev) => {
      const newParams = new URLSearchParams(prev);
      newParams.set(specialFields.filter, id);
      return newParams;
    });
    postSaveTempFilter({ body: createFilter, userId: user.id }).catch(noop);
  }

  if (!filterQuery.data?.content?.length) {
    return (
      <AddFilter
        statuses={statuses.allStatuses}
        users={users}
        onChange={applyFilter}
      >
        <BoardFilterButton />
      </AddFilter>
    );
  }

  return <ListFiltersButton filters={filterQuery.data.content} />;
}
