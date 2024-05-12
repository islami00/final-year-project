import { useLoaderData } from '@remix-run/react';
import { ErrorBoundary } from 'react-error-boundary';
import { BoardIdLoader } from '../../../../routes/app.$orgId.boards.$boardId/types';
import { type BoardIdParams } from '../../../../routes/app.$orgId.boards.$boardId/types';
import { StatusColumn } from '../StatusColumn/StatusColumn';
import { BoardColumnsError } from './BoardColumns.error';
import { useCurrentFilter } from '../../logic/useCurrentFilter';

interface BoardColumnsProps {
  params: BoardIdParams;
}
export function BoardColumns(props: BoardColumnsProps) {
  const { params } = props;
  const data = useLoaderData<BoardIdLoader>();
  const { statuses } = data;
  const filterQuery = useCurrentFilter();
  return (
    <ErrorBoundary
      fallbackRender={(fallbackProps) => (
        <BoardColumnsError savedFilter={filterQuery.data} {...fallbackProps} />
      )}
    >
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
