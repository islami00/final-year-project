import { Menu } from '@mantine/core';
import * as React from 'react';
import { taskFilterOptions } from '../../../../../utils/FilterFields/TaskFilterFields';
import { type AddFilterActions } from '../AddFilter/AddFilter.types';

interface AddFilterMenuProps {
  children: React.ReactNode;
  dispatch: (value: AddFilterActions) => void;
}
export function AddFilterMenu(props: AddFilterMenuProps) {
  const { children, dispatch } = props;
  const selectedRef = React.useRef(false);
  return (
    <Menu
      onClose={() => {
        if (selectedRef.current) return;
        dispatch({ type: 'close' });
      }}
    >
      <Menu.Target>{children}</Menu.Target>
      <Menu.Dropdown>
        {taskFilterOptions.map((each) => {
          const { label, id } = each;
          return (
            <Menu.Item
              key={id}
              onClick={() => {
                selectedRef.current = true;
                dispatch({ filter: each, type: 'select' });
              }}
            >
              {label}
            </Menu.Item>
          );
        })}
      </Menu.Dropdown>
    </Menu>
  );
}
