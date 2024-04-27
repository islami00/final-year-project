import SavedFilterModel, {
  SavedFilter,
  SavedFilterApi,
  type CreateSavedFilter,
} from '../../../models/SavedFilter.model';
import { collections } from '../../pocketbase/collections';
import { pb } from '../../pocketbase/setup';

interface PostSavedFilterArgs {
  body: CreateSavedFilter;
}

export async function postSavedFilter(
  args: PostSavedFilterArgs
): Promise<SavedFilter> {
  const { body } = args;
  const res = await pb
    .collection<SavedFilterApi>(collections.saved_filters)
    .create(body);

  return SavedFilterModel.fromApi(res);
}
