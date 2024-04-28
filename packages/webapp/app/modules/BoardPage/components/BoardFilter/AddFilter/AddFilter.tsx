import * as React from 'react';
import { useReducer } from 'react';
import { addFilterReducer } from './AddFilter.utils';
import { AddFilterMenu } from '../AddFilterMenu/AddFilterMenu';
import { Filter } from '../../../../../utils/Filter';

export interface AddFilterProps {
  children: React.ReactElement;
  onChange: (filter: Filter) => void;
}

export function AddFilter(props: AddFilterProps) {
  const { children } = props;
  const [state, dispatch] = useReducer(addFilterReducer, { stage: 0 });

  switch (state.stage) {
    case 1:
      return children;
    default:
      return <AddFilterMenu dispatch={dispatch}>{children}</AddFilterMenu>;
  }
}
