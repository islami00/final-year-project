import * as React from 'react';
import { SavedFilterQueryData } from '../../../../../services/queries/savedFilters/savedFilterQueries';
import { FilledFiltersMenu } from '../FilledFiltersMenu/FillerdFiltersMenu';
import NiceModal from '@ebay/nice-modal-react';
import { modalIds } from '../../../../../utils/modalIds';

export interface FilledFiltersProps {
  children: React.ReactNode;
  currentFilter: SavedFilterQueryData;
}

export function FilledFilters(props: FilledFiltersProps) {
  const { children, currentFilter } = props;

  return (
    <FilledFiltersMenu
      currentFilter={currentFilter}
      setAction={(value) => {
        switch (value.type) {
          case 'save-new':
            NiceModal.show(modalIds.saveNewFilter);
            break;
          case 'change-saved':
            NiceModal.show(modalIds.applySavedFilter);
            break;
          default:
            break;
        }
      }}
    >
      {children}
    </FilledFiltersMenu>
  );
}
