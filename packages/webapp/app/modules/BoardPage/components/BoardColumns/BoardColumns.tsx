import { useLoaderData, useSearchParams } from '@remix-run/react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { BoardIdLoader } from '../../../../routes/app.$orgId.boards.$boardId/types';
import { type BoardIdParams } from '../../../../routes/app.$orgId.boards.$boardId/utils';
import { savedFilterQueries } from '../../../../services/queries/savedFilters/savedFilterQueries';
import { specialFields } from '../../../../utils/Form/specialFields';
import { StatusColumn } from '../StatusColumn/StatusColumn';
import { ReactErrorBoundaryFallback } from '../../../../components/errors/ReactErrorBoundaryFallback';
import { ErrorBoundary } from 'react-error-boundary';

interface BoardColumnsProps {
  params: BoardIdParams;
}
export function BoardColumns(props: BoardColumnsProps) {
  const { params } = props;
  const [search] = useSearchParams();
  const currentFilter = search.get(specialFields.filter);
  const data = useLoaderData<BoardIdLoader>();
  const { statuses } = data;
  const filterQuery = useSuspenseQuery(
    savedFilterQueries.byIdCaughtFilter(currentFilter)
  );

  return (
    <ErrorBoundary FallbackComponent={ReactErrorBoundaryFallback}>
      {statuses.allStatuses.map((each) => (
        <StatusColumn
          orgId={params.orgId}
          status={each}
          key={each.id}
          currentFilter={filterQuery.data}
        />
      ))}
    </ErrorBoundary>
  );
}
