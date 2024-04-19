import type { CSSProperties } from 'react';
import { P } from '../../../../components/P/P';
import { Status } from '../../../../models/Status.model';
import * as classes from './StatusColumn.styles';
import { defineStatusColVars } from './StatusColumn.utils';

export interface StatusColumnProps {
  status: Status;
}

export function StatusColumn(props: StatusColumnProps) {
  const { status } = props;
  const colorStyle = defineStatusColVars(status.color) as CSSProperties;
  return (
    <div className={classes.bg} style={colorStyle}>
      <P textStyle="lgBold" color="dark.0" className={classes.titleText}>
        {status.name}
      </P>
    </div>
  );
}
