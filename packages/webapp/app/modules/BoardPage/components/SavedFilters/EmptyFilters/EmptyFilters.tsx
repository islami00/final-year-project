import NiceModal from '@ebay/nice-modal-react';
import * as React from 'react';
import { SavedFilterQueryData } from '../../../../../services/queries/savedFilters/savedFilterQueries';
import { modalIds } from '../../../../../utils/modalIds';
import { EmptyFiltersMenu } from '../EmptyFiltersMenu/EmptyFiltersMenu';

export interface EmptyFiltersProps {
  currentFilter: SavedFilterQueryData;
  children: React.ReactNode;
}

export function EmptyFilters(props: EmptyFiltersProps) {
  const { children, currentFilter } = props;

  return (
    <EmptyFiltersMenu
      setAction={(value) => {
        switch (value.type) {
          case 'save-new':
            {
              NiceModal.show(modalIds.saveNewFilter);
            }
            break;
          case 'apply-saved': {
            NiceModal.show(modalIds.applySavedFilter);
            break;
          }
          default:
            break;
        }
      }}
      currentFilter={currentFilter}
    >
      {children}
    </EmptyFiltersMenu>
  );
}
