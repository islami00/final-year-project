import { Suspense, type CSSProperties, useMemo } from 'react';
import { P } from '../../../../components/P/P';
import { Status } from '../../../../models/Status.model';
import * as classes from './StatusColumn.styles';
import { defineStatusColVars } from './StatusColumn.utils';
import { StatusColumnQueryLoading } from './StatusColumn.loading';
import { StatusColumnRaw, type StatusColumnRawProps } from './StatusColumn.raw';
import { useSearchParams } from '@remix-run/react';
import { specialFields } from '../../../../utils/Form/specialFields';
import { hashKey } from '@tanstack/react-query';
import { taskQueries } from '../../../../services/queries/task/taskQueryOptionFactory';
export interface StatusColumnProps {
  status: Status;
  orgId: string;
  currentFilter: StatusColumnRawProps['currentFilter'];
}

export function StatusColumn(props: StatusColumnProps) {
  const { status, orgId, currentFilter } = props;
  const colorStyle = defineStatusColVars(status.color) as CSSProperties;
  const [search] = useSearchParams();
  const currentQ = search.get(specialFields.q);

  const queryKeyHash = useMemo(
    () =>
      hashKey(
        taskQueries.listByStatusFilterKey({
          q: currentQ,
          statusId: status.id,
          filter: currentFilter?.content,
        })
      ),
    [currentQ, status.id, currentFilter?.content]
  );

  return (
    <div className={classes.bg} style={colorStyle}>
      <P textStyle="lgBold" color="dark.0" className={classes.titleText}>
        {status.name}
      </P>

      <Suspense fallback={<StatusColumnQueryLoading />} key={queryKeyHash}>
        <StatusColumnRaw
          currentFilter={currentFilter}
          orgId={orgId}
          statusId={status.id}
        />
      </Suspense>
    </div>
  );
}
