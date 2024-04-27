import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { useRef } from 'react';
import { InfiniteLoader } from '../../../../components/InfiniteLoader/InfiniteLoader';
import { taskQueries } from '../../../../services/queries/task/taskQueryOptionFactory';
import { combinePages } from '../../../../utils/combinePages';
import { ScrollArea } from '@mantine/core';
import * as classes from './StatusColumn.styles';
import { TaskCard } from '../TaskCard/TaskCard';
import { useSearchParams } from '@remix-run/react';
import { specialFields } from '../../../../utils/Form/specialFields';
import { BoardIdFilterData } from '../../../../routes/app.$orgId.boards.$boardId/types';
export interface StatusColumnRawProps {
  statusId: string;
  orgId: string;
  currentFilter: BoardIdFilterData['currentFilter'];
}

export function StatusColumnRaw(props: StatusColumnRawProps) {
  const { statusId, orgId, currentFilter } = props;

  const [search] = useSearchParams();
  const query = useSuspenseInfiniteQuery(
    taskQueries.listByStatusFilter({
      statusId,
      q: search.get(specialFields.q),
      filter: currentFilter && currentFilter.content,
    })
  );

  const container = useRef<HTMLDivElement | null>(null);
  const reducedData = combinePages(query.data);
  return (
    <ScrollArea ref={container}>
      <div className={classes.column}>
        {reducedData.map((each) => (
          <TaskCard task={each} key={each.id} orgId={orgId} />
        ))}
        <InfiniteLoader
          containerRef={container}
          fetchNextPage={query.fetchNextPage}
          hasNextPage={query.hasNextPage}
          isFetchingNextPage={query.isFetchingNextPage}
        />
      </div>
    </ScrollArea>
  );
}
