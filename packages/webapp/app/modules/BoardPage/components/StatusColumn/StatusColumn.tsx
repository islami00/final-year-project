import { useSearchParams } from '@remix-run/react';
import { hashKey } from '@tanstack/react-query';
import { Suspense, useMemo } from 'react';
import { P } from '../../../../components/P/P';
import { Status } from '../../../../models/Status.model';
import { taskQueries } from '../../../../services/queries/task/taskQueryOptionFactory';
import { specialFields } from '../../../../utils/Form/specialFields';
import { StatusColumnQueryLoading } from './StatusColumn.loading';
import { StatusColumnRaw, type StatusColumnRawProps } from './StatusColumn.raw';
import * as classes from './StatusColumn.styles';
import { defineStatusColVars } from './StatusColumn.utils';
export interface StatusColumnProps {
  status: Status;
  orgId: string;
  currentFilter: StatusColumnRawProps['currentFilter'];
}

export function StatusColumn(props: StatusColumnProps) {
  const { status, orgId, currentFilter } = props;
  const colorStyle = defineStatusColVars(status.color);
  const [search] = useSearchParams();
  const currentQ = search.get(specialFields.q);

  const queryKeyHash = useMemo(
    () =>
      hashKey(
        taskQueries.listByStatusFilterKey({
          q: currentQ,
          statusId: status.id,
          savedFilter: currentFilter,
        })
      ),
    [currentQ, status.id, currentFilter]
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
