import { Menu } from '@mantine/core';
import { SavedFilterQueryData } from '../../../../../services/queries/savedFilters/savedFilterQueries';
import * as React from 'react';
import type { EmptyFiltersAction } from '../EmptyFilters/EmptyFilters.types';

export interface EmptyFiltersMenuProps {
  children: React.ReactNode;
  currentFilter: SavedFilterQueryData;
  setAction: (value: EmptyFiltersAction) => void;
}

export function EmptyFiltersMenu(props: EmptyFiltersMenuProps) {
  const { children, currentFilter, setAction } = props;
  return (
    <Menu>
      <Menu.Target>{children}</Menu.Target>
      <Menu.Dropdown>
        <Menu.Item
          disabled={!currentFilter?.content?.length}
          onClick={() => {
            if (!currentFilter?.id) return;
            setAction({ type: 'save-new' });
          }}
        >
          Save New Filter
        </Menu.Item>
        <Menu.Item
          onClick={() => {
            setAction({ type: 'apply-saved' });
          }}
        >
          Apply Saved Filter
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
