import SavedFilterModel, {
  SavedFilterApi,
  type SavedFilter,
} from '../../../models/SavedFilter.model';
import { collections } from '../../pocketbase/collections';
import { pb } from '../../pocketbase/setup';
import { forwardError } from '../../../utils/forwardError';
import { parseClientResponseError } from '../../../utils/parseClientResponseError';
import {
  Connectives,
  FilterDataType,
  Operators,
  parseFilters,
} from '../../../utils/Filter';

interface GetSavedFilterByIdArgs {
  id?: string;
  slug?: string;
}
export async function getSavedFilterById(
  args: GetSavedFilterByIdArgs
): Promise<SavedFilter> {
  const { id, slug } = args;

  const filter = parseFilters(
    [
      {
        meta: {
          field: 'id',
          label: 'id',
          dataType: FilterDataType.TEXT,
          id: '',
        },
        operator: Operators.EQ,
        value: id || null,
        values: null,
      },
      {
        meta: {
          field: 'slug',
          label: 'slug',
          dataType: FilterDataType.TEXT,
          id: '',
        },
        operator: Operators.EQ,
        value: slug || null,
        values: null,
      },
    ],
    { connective: Connectives.OR }
  );

  const res = await pb
    .collection<SavedFilterApi>(collections.saved_filters)
    .getFirstListItem(pb.filter(filter.template, filter.params))
    .catch(forwardError(parseClientResponseError));

  return SavedFilterModel.fromApi(res);
}
