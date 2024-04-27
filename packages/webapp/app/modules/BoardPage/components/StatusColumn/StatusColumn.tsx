import { Suspense, type CSSProperties } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { P } from '../../../../components/P/P';
import { Status } from '../../../../models/Status.model';
import * as classes from './StatusColumn.styles';
import { defineStatusColVars } from './StatusColumn.utils';
import { StatusColumnQueryLoading } from './StatusColumn.loading';
import { ReactErrorBoundaryFallback } from '../../../../components/errors/ReactErrorBoundaryFallback';
import { StatusColumnRaw, type StatusColumnRawProps } from './StatusColumn.raw';
export interface StatusColumnProps {
  status: Status;
  orgId: string;
  currentFilter: StatusColumnRawProps['currentFilter'];
}

export function StatusColumn(props: StatusColumnProps) {
  const { status, orgId, currentFilter } = props;
  const colorStyle = defineStatusColVars(status.color) as CSSProperties;

  return (
    <div className={classes.bg} style={colorStyle}>
      <P textStyle="lgBold" color="dark.0" className={classes.titleText}>
        {status.name}
      </P>

      <ErrorBoundary FallbackComponent={ReactErrorBoundaryFallback}>
        <Suspense fallback={<StatusColumnQueryLoading />}>
          <StatusColumnRaw
            currentFilter={currentFilter}
            orgId={orgId}
            statusId={status.id}
          />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
