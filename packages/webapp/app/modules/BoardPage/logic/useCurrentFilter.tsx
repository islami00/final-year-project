import { useSearchParams } from '@remix-run/react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { savedFilterQueries } from '../../../services/queries/savedFilters/savedFilterQueries';
import { specialFields } from '../../../utils/Form/specialFields';

export function useCurrentFilter() {
  const [search] = useSearchParams();
  const currentFilter = search.get(specialFields.filter);
  const filterQuery = useSuspenseQuery(
    savedFilterQueries.byIdCaughtFilter(currentFilter)
  );

  return filterQuery;
}
