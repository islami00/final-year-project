import { noop } from '@mantine/core';
import { useLoaderData, useSearchParams } from '@remix-run/react';
import {
  useQueryClient,
  useSuspenseQuery,
  type QueryKey,
} from '@tanstack/react-query';
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
import { PB_ID_LENGTH } from '../../../../utils/constants';
import { AddFilter } from './AddFilter/AddFilter';
import { BoardFilterButton } from './BoardFilterButton/BoardFilterButton';
import { ListFiltersButton } from './ListFiltersButton/ListFiltersButton';
import { removeSearchQueries } from '../../../../utils/removeSearchQueries';

interface BoardFilterProps {
  organisationId: string;
  /** Used to ensure each filter leads to a hard loading state */
  queryKeys: QueryKey[];
}
export function BoardFilter(props: BoardFilterProps) {
  const { organisationId, queryKeys } = props;
  const [search, setParams] = useSearchParams();
  const filter = search.get(specialFields.filter);

  const queryClient = useQueryClient();
  const { users, statuses, user } = useLoaderData<BoardIdLoader>();
  const filterQuery = useSuspenseQuery(
    savedFilterQueries.byIdCaughtFilter(filter)
  );
  async function prepareFilterToApply(filterData: Filter | Filter[]) {
    const newSlug = nanoid(PB_ID_LENGTH);
    const normalFilter = Array.isArray(filterData) ? filterData : [filterData];
    // Prep a filter to upsert.
    const createFilter: CreateSavedFilter = {
      id: newSlug,
      slug: newSlug,
      content: normalFilter,
      name: SavedFilterKind.TEMPORARY,
      kind: SavedFilterKind.TEMPORARY,
      createdBy: user.id,
      organisationId: organisationId,
    };
    const fullFilter = await SavedFilterModel.fromApi(createFilter);
    // Set client state
    queryClient.setQueryData(
      savedFilterQueries.byIdCaughtFilter(newSlug).queryKey,
      fullFilter
    );

    return { newSlug, createFilter };
  }

  async function applyFilter(filterData: Filter | Filter[]) {
    const { newSlug, createFilter } = await prepareFilterToApply(filterData);

    // At the same time, save and try to do a bookmark
    setParams((prev) => {
      const newParams = new URLSearchParams(prev);
      newParams.set(specialFields.filter, newSlug);
      return newParams;
    });
    // It doesn't matter if this fails.
    postSaveTempFilter({ body: createFilter, userId: user.id }).catch(noop);
    removeSearchQueries(queryClient, queryKeys);
  }

  async function clearFilters() {
    const { newSlug, createFilter } = await prepareFilterToApply([]);

    // At the same time, save and try to do a bookmark
    // and Clear any selected saved filters
    setParams((prev) => {
      const newParams = new URLSearchParams(prev);
      newParams.set(specialFields.filter, newSlug);
      newParams.delete(specialFields.savedFilter);
      return newParams;
    });
    // It doesn't matter if this fails.
    postSaveTempFilter({ body: createFilter, userId: user.id }).catch(noop);
    removeSearchQueries(queryClient, queryKeys);
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

  return (
    <ListFiltersButton
      onChange={applyFilter}
      filters={filterQuery.data.content}
      statuses={statuses.allStatuses}
      users={users}
      onClear={clearFilters}
    />
  );
}
