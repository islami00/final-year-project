import { useWatch } from 'react-hook-form';
import { FilterMeta } from '../../../../../utils/Filter';
import type { FilterValueFormReturn } from '../../../logic/filterValueForm';

export interface FilterSelectTypeProps {
  meta: FilterMeta;
  form: FilterValueFormReturn;
}

export function FilterSelectType(props: FilterSelectTypeProps) {
  const { meta, form } = props;
  const operator = useWatch({
    control: form.control,
    name: 'operator',
  });
  return <div></div>;
}
