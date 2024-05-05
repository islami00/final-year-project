import { FilterMeta, type OperatorOptions } from '../../../../../utils/Filter';
import * as filterValueForm from '../../../logic/filterValueForm';

export interface FilterTextTypeProps {
  meta: FilterMeta;
  form: filterValueForm.FilterValueFormReturn;
  operator: OperatorOptions;
}

export function FilterTextType(props: FilterTextTypeProps) {
  const { operator } = props;
  // Text stuff by operator
  return <div></div>;
}
