import { AppInternalError } from '../../../../../utils/AppInternalError';
import { Status } from '../../../../../models/Status.model';
import { User } from '../../../../../models/User.model';
import { FilterDataType, FilterMeta } from '../../../../../utils/Filter';
import * as filterValueForm from '../../../logic/filterValueForm';
import { FilterDateType } from './FilterDateType';
import { FilterNumberType } from './FilterNumberType';
import { FilterSelectType } from './FilterSelectType';
import { FilterTextType } from './FilterTextType';

interface FilterValueInputProps {
  form: filterValueForm.FilterValueFormReturn;
  meta: FilterMeta;
  users: User[];
  statuses: Status[];
}
export function FilterValueInput(props: FilterValueInputProps) {
  const { meta, form, users, statuses } = props;

  switch (meta.dataType) {
    case FilterDataType.TEXT:
      return <FilterTextType form={form} />;
    case FilterDataType.DATE:
      return <FilterDateType form={form} />;
    case FilterDataType.NUMBER:
      return <FilterNumberType form={form} />;

    case FilterDataType.SELECT:
      return (
        <FilterSelectType
          users={users}
          statuses={statuses}
          form={form}
          meta={meta}
        />
      );
    default:
      throw new AppInternalError(`Missing input for ${meta.dataType}`);
  }
}
