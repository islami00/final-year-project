import { ScrollArea } from '@mantine/core';
import { useSearchParams } from '@remix-run/react';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { useRef } from 'react';
import { InfiniteLoader } from '../../../../components/InfiniteLoader/InfiniteLoader';
import { BoardIdFilterData } from '../../../../routes/app.$orgId.boards.$boardId/types';
import { taskQueries } from '../../../../services/queries/task/taskQueryOptionFactory';
import { specialFields } from '../../../../utils/Form/specialFields';
import { combinePages } from '../../../../utils/combinePages';
import { TaskCard } from '../TaskCard/TaskCard';
import * as classes from './StatusColumn.styles';
export interface StatusColumnRawProps {
  statusId: string;
  orgId: string;
  currentFilter: BoardIdFilterData['currentFilter'];
}

export function StatusColumnRaw(props: StatusColumnRawProps) {
  const { statusId, orgId, currentFilter } = props;

  const [search] = useSearchParams();
  const currentQ = search.get(specialFields.q);

  const query = useSuspenseInfiniteQuery(
    taskQueries.listByStatusFilterQuery({
      statusId,
      q: currentQ,
      savedFilter: currentFilter,
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
