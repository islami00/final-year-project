import { ClientResponseError } from 'pocketbase';
import SavedFilterModel, {
  SavedFilter,
  SavedFilterApi,
  type CreateSavedFilter,
} from '../../../models/SavedFilter.model';
import { forwardError } from '../../../utils/forwardError';
import { parseClientResponseError } from '../../../utils/parseClientResponseError';
import { collections } from '../../pocketbase/collections';
import { pb } from '../../pocketbase/setup';

interface PostSaveTempFilterArgs {
  body: CreateSavedFilter;
}
export async function postSaveTempFilter(
  args: PostSaveTempFilterArgs
): Promise<SavedFilter> {
  const { body } = args;

  const savedFiltersCollection = pb.collection<SavedFilterApi>(
    collections.saved_filters
  );

  // Find the filter if it exists
  try {
    const savedFilter = await savedFiltersCollection.getOne(body.id);

    // Then Update its value. This must succeed
    const res = await savedFiltersCollection
      .update(savedFilter.id, body)
      .catch(forwardError(parseClientResponseError));
    return SavedFilterModel.fromApi(res);
  } catch (error) {
    // It's fine if it's not found.
    if (error instanceof ClientResponseError && error.status !== 404) {
      forwardError(parseClientResponseError)(error);
    }
  }

  // Else add it
  const res = await savedFiltersCollection.create(body);
  return SavedFilterModel.fromApi(res);
}
