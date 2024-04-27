import SavedFilterModel, {
  SavedFilter,
  type CreateSavedFilter,
  type SavedFilterApi,
} from '../../../models/SavedFilter.model';
import { collections } from '../../pocketbase/collections';
import { pb } from '../../pocketbase/setup';

interface PatchUpdateSavedFilterArgs {
  body: Partial<CreateSavedFilter>;
  id: string;
}

export async function patchUpdateSavedFilter(
  args: PatchUpdateSavedFilterArgs
): Promise<SavedFilter> {
  const { id, body } = args;

  const res = await pb
    .collection<SavedFilterApi>(collections.saved_filters)
    .update(id, body);
  return SavedFilterModel.fromApi(res);
}
