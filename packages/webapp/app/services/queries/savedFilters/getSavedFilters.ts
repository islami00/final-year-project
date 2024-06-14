import SavedFilterModel, {
  SavedFilterApi,
  SavedFilterKind,
  type SavedFilter,
} from '../../../models/SavedFilter.model';
import { collections } from '../../pocketbase/collections';
import { pb } from '../../pocketbase/setup';
import { forwardError } from '../../../utils/ErrorHandling/forwardError';
import { parseClientResponseError } from '../../../utils/ErrorHandling/parseClientResponseError';
import {
  Connectives,
  FilterDataType,
  Operators,
  parseFilters,
} from '../../../utils/Filter';

interface GetSavedFiltersArgs {
  organisationId: string;
}
export async function getSavedFilters(
  args: GetSavedFiltersArgs
): Promise<SavedFilter[]> {
  const { organisationId } = args;
  const filter = parseFilters(
    [
      {
        meta: {
          field: 'kind',
          label: 'kind',
          dataType: FilterDataType.SELECT,
          id: '',
        },
        operatorChip: { operator: Operators.EQ, label: '' },
        value: SavedFilterKind.NORMAL,
        values: null,
        id: '0',
      },
      {
        meta: {
          field: `organisationId`,
          label: 'organisationId',
          dataType: FilterDataType.TEXT,
          id: '',
        },
        operatorChip: { operator: Operators.EQ, label: '' },
        value: organisationId,
        values: null,
        id: '1',
      },
    ],
    { connective: Connectives.OR }
  );

  const res = await pb
    .collection<SavedFilterApi>(collections.saved_filters)
    .getFullList({ filter: pb.filter(filter.template, filter.params) })
    .catch(forwardError(parseClientResponseError));

  return SavedFilterModel.fromArrayApi(res);
}
