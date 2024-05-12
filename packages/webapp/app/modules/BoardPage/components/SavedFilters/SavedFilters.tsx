import { useLoaderData, useSearchParams } from '@remix-run/react';
import { useQueryClient, useSuspenseQueries } from '@tanstack/react-query';
import { BoardIdLoader } from '../../../../routes/app.$orgId.boards.$boardId/types';
import { savedFilterQueries } from '../../../../services/queries/savedFilters/savedFilterQueries';
import { specialFields } from '../../../../utils/Form/specialFields';
import { SavedFiltersButton } from './SavedFiltersButton/SavedFiltersButton';

export interface SavedFiltersProps {}

export function SavedFilters(props: SavedFiltersProps) {
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

  return <SavedFiltersButton />;
}
