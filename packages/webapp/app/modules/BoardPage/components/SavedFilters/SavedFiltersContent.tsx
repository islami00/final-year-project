import { useLoaderData } from '@remix-run/react';
import { BoardIdLoader } from '../../../../routes/app.$orgId.boards.$boardId/types';
import { type SavedFilterQueryData } from '../../../../services/queries/savedFilters/savedFilterQueries';
import { EmptyFilters } from './EmptyFilters/EmptyFilters';
import { SavedFiltersButton } from './SavedFiltersButton/SavedFiltersButton';
import { FilledFilters } from './FilledFilters/FilledFilters';

interface SavedFiltersContentProps {
  filterData: SavedFilterQueryData;
  savedFilterData: SavedFilterQueryData;
}
export function SavedFiltersContent(props: SavedFiltersContentProps) {
  const { filterData, savedFilterData } = props;

  const { users, statuses, user } = useLoaderData<BoardIdLoader>();

  if (savedFilterData?.id) {
    return (
      <FilledFilters currentFilter={filterData}>
        <SavedFiltersButton
          activeSavedFilter={savedFilterData}
          currentFilter={filterData}
        />
      </FilledFilters>
    );
  }
  return (
    <EmptyFilters currentFilter={filterData}>
      <SavedFiltersButton />
    </EmptyFilters>
  );
}
