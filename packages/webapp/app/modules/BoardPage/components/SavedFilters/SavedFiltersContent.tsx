import { useLoaderData } from '@remix-run/react';
import { BoardIdLoader } from '../../../../routes/app.$orgId.boards.$boardId/types';
import { type SavedFilterQueryData } from '../../../../services/queries/savedFilters/savedFilterQueries';
import { EmptyFilters } from './EmptyFilters/EmptyFilters';
import { SavedFiltersButton } from './SavedFiltersButton/SavedFiltersButton';

interface SavedFiltersContentProps {
  filterData: SavedFilterQueryData;
  savedFilterData: SavedFilterQueryData;
}
export function SavedFiltersContent(props: SavedFiltersContentProps) {
  const { filterData, savedFilterData } = props;

  const { users, statuses, user } = useLoaderData<BoardIdLoader>();

  if (savedFilterData?.id) {
    return (
      <SavedFiltersButton
        activeSavedFilter={savedFilterData}
        currentFilter={filterData}
      />
    );
  }
  return (
    <EmptyFilters currentFilter={filterData}>
      <SavedFiltersButton />
    </EmptyFilters>
  );
}
