import { Operators, parseFilters } from '../../../utils/Filter';
import SavedFilterModel, {
  SavedFilter,
  SavedFilterApi,
  SavedFilterKind,
  type CreateSavedFilter,
} from '../../../models/SavedFilter.model';
import { collections } from '../../pocketbase/collections';
import { pb } from '../../pocketbase/setup';
import { ClientResponseError } from 'pocketbase';
import { forwardError } from '../../../utils/forwardError';
import { parseClientResponseError } from '../../../utils/parseClientResponseError';

interface PostSaveTempFilterArgs {
  body: CreateSavedFilter;
  userId: string;
}
export async function postSaveTempFilter(
  args: PostSaveTempFilterArgs
): Promise<SavedFilter> {
  const { body, userId } = args;
  const filter = parseFilters([
    {
      field: 'kind',
      operator: Operators.EQ,
      value: SavedFilterKind.TEMPORARY,
      placeholder: 'kind',
      values: null,
    },
    {
      field: 'createdBy',
      operator: Operators.EQ,
      value: userId,
      placeholder: 'createdBy',
      values: null,
    },
  ]);

  const savedFiltersCollection = pb.collection<SavedFilterApi>(
    collections.saved_filters
  );

  // Find the filter if it exists
  try {
    const savedFilter = await savedFiltersCollection.getFirstListItem(
      pb.filter(filter.template, filter.params)
    );

    // Then Update its value. This must succeed
    if (savedFilter?.id) {
      const res = await savedFiltersCollection
        .update(savedFilter.id, body)
        .catch(forwardError(parseClientResponseError));
      return SavedFilterModel.fromApi(res);
    }
  } catch (error) {
    // It's fine if it's not found.
    if (error instanceof ClientResponseError && error.status !== 404) {
      forwardError(parseClientResponseError)(error);
    }
  }

  // Else remove it
  const res = await savedFiltersCollection.create(body);
  return SavedFilterModel.fromApi(res);
}
