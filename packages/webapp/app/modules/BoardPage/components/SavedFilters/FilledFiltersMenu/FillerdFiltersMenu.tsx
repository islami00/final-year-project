import { Menu } from '@mantine/core';
import * as React from 'react';
import type { FilledFiltersAction } from '../FilledFilters/FilledFilters.types';
import { SavedFilterQueryData } from '../../../../../services/queries/savedFilters/savedFilterQueries';

export interface FilledFiltersMenuProps {
  children: React.ReactNode;
  setAction: (value: FilledFiltersAction) => void;
  currentFilter: SavedFilterQueryData;
}

export function FilledFiltersMenu(props: FilledFiltersMenuProps) {
  const { children, setAction, currentFilter } = props;
  return (
    <Menu>
      <Menu.Target>{children}</Menu.Target>
      <Menu.Dropdown>
        <Menu.Label>Saved Filter Options</Menu.Label>
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
            setAction({ type: 'change-saved' });
          }}
        >
          Change Saved Filter
        </Menu.Item>
        <Menu.Label>Actions</Menu.Label>
        <Menu.Item>Rename</Menu.Item>
        <Menu.Item>Update</Menu.Item>
        <Menu.Item>Delete</Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
