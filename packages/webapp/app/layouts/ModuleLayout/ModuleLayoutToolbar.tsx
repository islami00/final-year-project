import { P } from '../../components/P/P';
import * as React from 'react';
import * as classes from './ModuleLayout.styles';

export interface ModuleLayoutToolbarProps {
  title: React.ReactNode;
  actions: React.ReactNode;
}

export function ModuleLayoutToolbar(props: ModuleLayoutToolbarProps) {
  const { title, actions } = props;
  return (
    <div className={classes.toolbar}>
      {React.isValidElement(title) ? title : <P textStyle="lgBold">{title}</P>}
      <div className={classes.toolbarItems}>{actions}</div>
    </div>
  );
}
