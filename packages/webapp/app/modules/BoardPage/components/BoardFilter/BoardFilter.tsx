import { useLoaderData, useSearchParams } from '@remix-run/react';
import { useSuspenseQueries } from '@tanstack/react-query';
import * as React from 'react';
import { savedFilterQueries } from '../../../../services/queries/savedFilters/savedFilterQueries';
import { specialFields } from '../../../../utils/Form/specialFields';
import { AddFilter } from './AddFilter/AddFilter';
import { BoardFilterButton } from './BoardFilterButton/BoardFilterButton';
import { BoardIdLoader } from '../../../../routes/app.$orgId.boards.$boardId/types';

export function BoardFilter() {
  const [search] = useSearchParams();
  const filter = search.get(specialFields.filter);
  const savedFilter = search.get(specialFields.savedFilter);

  const { users, statuses } = useLoaderData<BoardIdLoader>();
  const [filterQuery] = useSuspenseQueries({
    queries: [
      savedFilterQueries.byIdCaughtFilter(filter),
      savedFilterQueries.byIdCaughtFilter(savedFilter),
    ],
  });

  if (!filterQuery.data?.content?.length) {
    return (
      <AddFilter
        statuses={statuses.allStatuses}
        users={users}
        onChange={console.log}
      >
        <BoardFilterButton />
      </AddFilter>
    );
  }

  return null;
}
