import { Await, useLoaderData, useSearchParams } from '@remix-run/react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Suspense } from 'react';
import { DefaultAwaitErrorElement } from '../../../../components/errors/DefaultAwaitErrorElement';
import { BoardIdLoader } from '../../../../routes/app.$orgId.boards.$boardId/types';
import { type BoardIdParams } from '../../../../routes/app.$orgId.boards.$boardId/utils';
import { savedFilterQueries } from '../../../../services/queries/savedFilters/savedFilterQueries';
import { specialFields } from '../../../../utils/Form/specialFields';
import { StatusColumn } from '../StatusColumn/StatusColumn';
import { BoardColumnsLoading } from './BoardColumns.loading';

interface BoardColumnsProps {
  params: BoardIdParams;
}
export function BoardColumns(props: BoardColumnsProps) {
  const { params } = props;
  const [search] = useSearchParams();
  const currentFilter = search.get(specialFields.filter);
  const data = useLoaderData<BoardIdLoader>();
  const { statusQueries, statuses } = data;
  const filterQuery = useSuspenseQuery(
    savedFilterQueries.byIdCaughtFilter(currentFilter)
  );

  return (
    <Suspense fallback={<BoardColumnsLoading />}>
      <Await
        resolve={statusQueries}
        errorElement={<DefaultAwaitErrorElement />}
      >
        {statuses.allStatuses.map((each) => (
          <StatusColumn
            orgId={params.orgId}
            status={each}
            key={each.id}
            currentFilter={filterQuery.data}
          />
        ))}
      </Await>
    </Suspense>
  );
}
