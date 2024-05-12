import { ScrollArea, Skeleton } from '@mantine/core';
import * as classes from './StatusColumn.styles';

export function StatusColumnQueryLoading() {
  return (
    <ScrollArea>
      <div className={classes.column}>
        <Skeleton h={150} />
        <Skeleton h={150} />
        <Skeleton h={150} />
      </div>
    </ScrollArea>
  );
}
