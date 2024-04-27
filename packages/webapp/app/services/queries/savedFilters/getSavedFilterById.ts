import SavedFilterModel, {
  SavedFilterApi,
  type SavedFilter,
} from '../../../models/SavedFilter.model';
import { collections } from '../../pocketbase/collections';
import { pb } from '../../pocketbase/setup';
import { forwardError } from '../../../utils/forwardError';
import { parseClientResponseError } from '../../../utils/parseClientResponseError';

interface GetSavedFilterByIdArgs {
  id: string;
}
export async function getSavedFilterById(
  args: GetSavedFilterByIdArgs
): Promise<SavedFilter> {
  const { id } = args;

  const res = await pb
    .collection<SavedFilterApi>(collections.saved_filters)
    .getOne(id)
    .catch(forwardError(parseClientResponseError));

  return SavedFilterModel.fromApi(res);
}
