import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { useRef } from 'react';
import { InfiniteLoader } from '../../../../components/InfiniteLoader/InfiniteLoader';
import { taskQueries } from '../../../../services/queries/task/taskQueryOptionFactory';
import { combinePages } from '../../../../utils/combinePages';
import { ScrollArea } from '@mantine/core';
import * as classes from './StatusColumn.styles';
import { TaskCard } from '../TaskCard/TaskCard';
export interface StatusColumnRawProps {
  statusId: string;
}

export function StatusColumnRaw(props: StatusColumnRawProps) {
  const { statusId } = props;
  const query = useSuspenseInfiniteQuery(
    taskQueries.listByStatusFilter(statusId)
  );

  const container = useRef<HTMLDivElement | null>(null);
  const reducedData = combinePages(query.data);
  return (
    <ScrollArea ref={container}>
      <div className={classes.column}>
        {reducedData.map((each) => (
          <TaskCard task={each} key={each.id} />
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
