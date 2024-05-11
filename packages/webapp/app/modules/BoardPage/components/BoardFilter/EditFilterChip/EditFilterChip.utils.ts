import { Filter } from '../../../../../utils/Filter';
import type { FilterValueForm } from '../../../logic/filterValueForm';

export function mapFilterToFormData(filter: Filter): FilterValueForm {
  return {
    data: {
      operatorChip: filter.operatorChip,
      value: filter.value,
      values: filter.values,
    },
    id: filter.id,
  };
}
