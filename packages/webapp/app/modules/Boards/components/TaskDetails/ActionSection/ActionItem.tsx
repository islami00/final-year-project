import { P } from '../../../../../components/P';
import * as classes from './ActionSection.styles';
import * as React from 'react';

export interface ActionItemProps {
  title: string;
  children: React.ReactNode;
}

export function ActionItem(props: ActionItemProps) {
  const { children, title } = props;
  return (
    <div className={classes.actionItem}>
      <P textStyle="2xsSemiBold" color="white">
        {title}
      </P>
      {children}
    </div>
  );
}
