import { unstable_ClientAction, useFetcher } from '@remix-run/react';
import { useQueryClient } from '@tanstack/react-query';
import { DEFAULT_ERROR_MESSAGE } from '../../../utils/Form/reactHookForm';
import { nanoid } from 'nanoid';
import { useState } from 'react';
import { type FieldErrors } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useRouteLoaderDataOrThrow } from '../../../hooks/useRouteLoaderDataOrThrow';
import SavedFilterModel, {
  SavedFilter,
  SavedFilterKind,
} from '../../../models/SavedFilter.model';
import { AppLoader } from '../../../routes/app.$orgId/types';
import { savedFilterQueries } from '../../../services/queries/savedFilters/savedFilterQueries';
import { JsonValue } from '../../../types/JsonValue';
import { PB_ID_LENGTH } from '../../../utils/constants';
import { routeConfig } from '../../../utils/routeConfig';
import * as saveNewFilterForm from './saveNewFilterForm';
import { castError } from '../../../utils/ErrorHandling/parseClientResponseError';

interface UseSubmitSaveNewFilterArgs {
  filter: SavedFilter;
}
export function useSubmitSaveNewFilter(args: UseSubmitSaveNewFilterArgs) {
  const { filter } = args;
  const [slug] = useState(() => nanoid(PB_ID_LENGTH));

  const { currentOrganisation, user } = useRouteLoaderDataOrThrow<AppLoader>(
    routeConfig.org.routeId
  );

  const fetcher = useFetcher<unstable_ClientAction>();

  const queryClient = useQueryClient();
  async function handleSubmit(data: saveNewFilterForm.SaveNewFilterUIForm) {
    try {
      const prep: saveNewFilterForm.SaveNewFilterFormRequestOutput = {
        data: {
          content: filter.content,
          createdBy: user.id,
          slug,
          id: slug,
          kind: SavedFilterKind.NORMAL,
          organisationId: currentOrganisation.id,
          name: data.name,
        },
        intent: saveNewFilterForm.SaveNewFilterFormIntent.SAVE_NEW_FILTER,
      };
      // Set client State
      const savedFilter = await SavedFilterModel.fromApi(prep.data);
      queryClient.setQueryData(
        savedFilterQueries.byIdCaughtFilter(prep.data.slug).queryKey,
        savedFilter
      );
      queryClient.setQueryData(
        savedFilterQueries.byIdCaughtFilter(prep.data.id).queryKey,
        savedFilter
      );
      // Submit
      fetcher.submit(prep as JsonValue, {
        encType: 'application/json',
        method: 'POST',
      });
    } catch (error) {
      toast.error(castError(error).message);
    }
  }
  function handleError(
    error: FieldErrors<saveNewFilterForm.SaveNewFilterUIForm>
  ) {
    toast.error(error.name?.message || DEFAULT_ERROR_MESSAGE);
  }

  return { handleSubmit, handleError };
}
