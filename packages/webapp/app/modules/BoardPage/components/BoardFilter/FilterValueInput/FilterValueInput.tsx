import { FilterDataType, FilterMeta } from '../../../../../utils/Filter';
import * as filterValueForm from '../../../logic/filterValueForm';
import { FilterDateType } from './FilterDateType';
import { FilterNumberType } from './FilterNumberType';
import { FilterSelectType } from './FilterSelectType';
import { FilterTextType } from './FilterTextType';

interface FilterValueInputProps {
  form: filterValueForm.FilterValueFormReturn;
  meta: FilterMeta;
}
export function FilterValueInput(props: FilterValueInputProps) {
  const { meta, form } = props;

  switch (meta.dataType) {
    case FilterDataType.TEXT:
      return <FilterTextType form={form} />;
    case FilterDataType.DATE:
      return <FilterDateType form={form} />;
    case FilterDataType.NUMBER:
      return <FilterNumberType form={form} />;

    case FilterDataType.SELECT:
      return <FilterSelectType form={form} meta={meta} />;
    default:
      break;
  }
  return <div className="input"></div>;
}
