import { FilterTextType } from './FilterTextType';
import { useWatch } from 'react-hook-form';
import { FilterDataType, FilterMeta } from '../../../../../utils/Filter';
import * as filterValueForm from '../../../logic/filterValueForm';
import { FilterDateType } from './FilterDateType';

interface FilterValueInputProps {
  form: filterValueForm.FilterValueFormReturn;
  meta: FilterMeta;
}
export function FilterValueInput(props: FilterValueInputProps) {
  const { meta, form } = props;
  const operator = useWatch({
    control: form.control,
    name: 'operator',
  });

  switch (meta.dataType) {
    case FilterDataType.TEXT:
      return <FilterTextType form={form} />;
    case FilterDataType.DATE:
      return <FilterDateType form={form} />;

    default:
      break;
  }
  return <div className="input"></div>;
}
