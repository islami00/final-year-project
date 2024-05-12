import { SavedFilterQueryData } from '../../../../../services/queries/savedFilters/savedFilterQueries';
import * as React from 'react';
import { EmptyFiltersAction } from './EmptyFilters.types';
import { EmptyFiltersMenu } from '../EmptyFiltersMenu/EmptyFiltersMenu';
import { ApplySavedFilter } from '../ApplySavedFilter/ApplySavedFilter';
import { SavedFilter } from '../../../../../models/SavedFilter.model';

export interface EmptyFiltersProps {
  currentFilter: SavedFilterQueryData;
  children: React.ReactNode;
  onApply: (value: SavedFilter) => void;
  organisationId: string;
}

export function EmptyFilters(props: EmptyFiltersProps) {
  const { children, currentFilter, onApply, organisationId } = props;
  const [action, setAction] = React.useState<EmptyFiltersAction | null>(null);
  return (
    <>
      <EmptyFiltersMenu setAction={setAction} currentFilter={currentFilter}>
        {children}
      </EmptyFiltersMenu>
      {action?.type === 'apply-saved' ? (
        <ApplySavedFilter
          onClose={() => setAction(null)}
          onApply={onApply}
          organisationId={organisationId}
        />
      ) : null}
    </>
  );
}
