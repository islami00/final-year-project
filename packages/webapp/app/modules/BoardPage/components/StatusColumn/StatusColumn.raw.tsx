import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { useRef } from 'react';
import { InfiniteLoader } from '../../../../components/InfiniteLoader/InfiniteLoader';
import { taskQueries } from '../../../../services/queries/task/taskQueryOptionFactory';
import { combinePages } from '../../../../utils/combinePages';

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
    <div ref={container}>
      {reducedData.map((each) => (
        <div>{each.title}</div>
      ))}
      <InfiniteLoader
        containerRef={container}
        fetchNextPage={query.fetchNextPage}
        hasNextPage={query.hasNextPage}
        isFetchingNextPage={query.isFetchingNextPage}
      />
    </div>
  );
}
