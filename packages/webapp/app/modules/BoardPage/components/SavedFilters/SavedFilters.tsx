import { useLoaderData, useSearchParams } from '@remix-run/react';
import { useQueryClient, useSuspenseQueries } from '@tanstack/react-query';
import { BoardIdLoader } from '../../../../routes/app.$orgId.boards.$boardId/types';
import { savedFilterQueries } from '../../../../services/queries/savedFilters/savedFilterQueries';
import { specialFields } from '../../../../utils/Form/specialFields';
import { SavedFiltersButton } from './SavedFiltersButton/SavedFiltersButton';
import { EmptyFilters } from './EmptyFilters/EmptyFilters';
import { SavedFilter } from '../../../../models/SavedFilter.model';

export interface SavedFiltersProps {
  organisationId: string;
}

export function SavedFilters(props: SavedFiltersProps) {
  const { organisationId } = props;
  const [search, setParams] = useSearchParams();
  const filter = search.get(specialFields.filter);
  const savedFilter = search.get(specialFields.savedFilter);

  const queryClient = useQueryClient();
  const { users, statuses, user } = useLoaderData<BoardIdLoader>();
  const [filterQuery, savedFilterQuery] = useSuspenseQueries({
    queries: [
      savedFilterQueries.byIdCaughtFilter(filter),
      savedFilterQueries.byIdCaughtFilter(savedFilter),
    ],
  });

  function applySavedFilter(savedFilterArg: SavedFilter) {
    // Set client state
    queryClient.setQueryData(
      savedFilterQueries.byIdCaughtFilter(savedFilterArg.slug).queryKey,
      savedFilterArg
    );
    // At the same time, save and try to do a bookmark
    setParams((prev) => {
      const newParams = new URLSearchParams(prev);
      newParams.set(specialFields.filter, savedFilterArg.slug);
      newParams.set(specialFields.savedFilter, savedFilterArg.id);
      return newParams;
    });
  }

  if (savedFilterQuery.data?.id) {
    return (
      <SavedFiltersButton
        activeSavedFilter={savedFilterQuery.data}
        currentFilter={filterQuery.data}
      />
    );
  }
  return (
    <EmptyFilters
      onApply={applySavedFilter}
      organisationId={organisationId}
      currentFilter={filterQuery.data}
    >
      <SavedFiltersButton />
    </EmptyFilters>
  );
}
