import * as React from 'react';
import { useReducer } from 'react';
import { addFilterReducer } from './AddFilter.utils';
import { AddFilterMenu } from '../AddFilterMenu/AddFilterMenu';
import { Filter } from '../../../../../utils/Filter';
import { FilterValueDialog } from '../FilterValueDialog/FilterValueDialog';
import { User } from '../../../../../models/User.model';
import { Status } from '../../../../../models/Status.model';

export interface AddFilterProps {
  children: React.ReactElement;
  onChange: (filter: Filter) => void;
  users: User[];
  statuses: Status[];
}

export function AddFilter(props: AddFilterProps) {
  const { children, users, statuses } = props;
  const [state, dispatch] = useReducer(addFilterReducer, { stage: 0 });

  switch (state.stage) {
    case 1:
      return (
        <>
          {children}
          <FilterValueDialog
            meta={state.filter}
            onClose={dispatch}
            onChange={console.log}
            statuses={statuses}
            users={users}
          />
        </>
      );
    default:
      return <AddFilterMenu dispatch={dispatch}>{children}</AddFilterMenu>;
  }
}
