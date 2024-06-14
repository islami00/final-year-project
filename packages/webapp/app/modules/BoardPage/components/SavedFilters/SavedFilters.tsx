import { useSearchParams } from '@remix-run/react';
import {
  useQueryClient,
  useSuspenseQueries,
  type QueryKey,
} from '@tanstack/react-query';
import { useRouteLoaderDataOrThrow } from '../../../../hooks/useRouteLoaderDataOrThrow';
import { SavedFilter } from '../../../../models/SavedFilter.model';
import { AppLoaderData } from '../../../../routes/app.$orgId/types';
import { savedFilterQueries } from '../../../../services/queries/savedFilters/savedFilterQueries';
import { specialFields } from '../../../../utils/Form/specialFields';
import { modalIds } from '../../../../utils/modalIds';
import { routeConfig } from '../../../../utils/routeConfig';
import { GlobalApplySavedFilter } from './ApplySavedFilter/ApplySavedFilter';
import { SaveNewFilter } from './SaveNewFilter/SaveNewFilter';
import { SavedFiltersContent } from './SavedFiltersContent';
import { removeSearchQueries } from '../../../../utils/removeSearchQueries';

interface SavedFiltersProps {
  queryKeys: QueryKey[];
}
export function SavedFilters(props: SavedFiltersProps) {
  const { queryKeys } = props;
  const [search, setParams] = useSearchParams();
  const filter = search.get(specialFields.filter);
  const savedFilter = search.get(specialFields.savedFilter);

  const [filterQuery, savedFilterQuery] = useSuspenseQueries({
    queries: [
      savedFilterQueries.byIdCaughtFilter(filter),
      savedFilterQueries.byIdCaughtFilter(savedFilter),
    ],
  });
  const queryClient = useQueryClient();
  function applySavedFilter(savedFilterArg: SavedFilter) {
    // Set client state
    queryClient.setQueryData(
      savedFilterQueries.byIdCaughtFilter(savedFilterArg.slug).queryKey,
      savedFilterArg
    );
    setParams((prev) => {
      const newParams = new URLSearchParams(prev);
      newParams.set(specialFields.filter, savedFilterArg.slug);
      newParams.set(specialFields.savedFilter, savedFilterArg.id);
      return newParams;
    });

    const finalQueryKeyList = queryKeys.concat([
      savedFilterQueries.byIdCaught(),
    ]);
    removeSearchQueries(queryClient, finalQueryKeyList);
  }
  const { currentOrganisation } = useRouteLoaderDataOrThrow<AppLoaderData>(
    routeConfig.org.routeId
  );

  return (
    <>
      {filterQuery.data?.id ? (
        <SaveNewFilter filter={filterQuery.data} id={modalIds.saveNewFilter} />
      ) : null}
      <GlobalApplySavedFilter
        id={modalIds.applySavedFilter}
        onApply={applySavedFilter}
        organisationId={currentOrganisation.id}
      />
      <SavedFiltersContent
        filterData={filterQuery.data}
        savedFilterData={savedFilterQuery.data}
      />
    </>
  );
}
