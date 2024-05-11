import { ClientResponseError } from 'pocketbase';
import SavedFilterModel, {
  SavedFilter,
  SavedFilterApi,
  type CreateSavedFilter,
  SavedFilterKind,
} from '../../../models/SavedFilter.model';
import { forwardError } from '../../../utils/forwardError';
import { parseClientResponseError } from '../../../utils/parseClientResponseError';
import { collections } from '../../pocketbase/collections';
import { pb } from '../../pocketbase/setup';
import { parseFilters, FilterDataType, Operators } from '../../../utils/Filter';
import omit from 'lodash/fp/omit';

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
      meta: {
        field: 'kind',
        label: 'kind',
        dataType: FilterDataType.SELECT,
        id: '',
      },
      operatorChip: { operator: Operators.EQ, label: '' },
      value: SavedFilterKind.TEMPORARY,
      values: null,
    },
    {
      meta: {
        field: 'createdBy',
        label: 'createdBy',
        dataType: FilterDataType.SELECT,
        id: '',
      },
      operatorChip: { operator: Operators.EQ, label: '' },
      value: userId,
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
    // Exclude the id in this case.
    const res = await savedFiltersCollection
      .update(savedFilter.id, omit('id', body))
      .catch(forwardError(parseClientResponseError));
    return SavedFilterModel.fromApi(res);
  } catch (error) {
    // It's fine if it's not found.
    if (error instanceof ClientResponseError && error.status !== 404) {
      forwardError(parseClientResponseError)(error);
    }
  }

  // Else add it
  // Remove the one we just referenced to be safe
  await savedFiltersCollection.delete(body.id).catch((error) => {
    // It's fine if it's not found.
    if (error instanceof ClientResponseError && error.status === 404) return;
    forwardError(parseClientResponseError)(error);
  });
  const res = await savedFiltersCollection.create(body);
  return SavedFilterModel.fromApi(res);
}
