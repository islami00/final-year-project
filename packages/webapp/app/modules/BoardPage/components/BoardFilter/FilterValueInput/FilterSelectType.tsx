import { MultiSelect, Select } from '@mantine/core';
import { mapToAssigneeData } from '../../../../../components/AssigneeSelect/AssigneeSelect.utils';
import { useController, useWatch } from 'react-hook-form';
import { AssigneeItemContent } from '../../../../../components/AssigneeSelect/AssigneeItemContent';
import { selectClasses } from '../../../../../components/AssigneeSelect/AssigneeSelect.styles';
import { AssigneeData } from '../../../../../components/AssigneeSelect/AssigneeSelect.types';
import { FilterMeta, UIOperators } from '../../../../../utils/Filter';
import { EMPTY_ARRAY } from '../../../../../utils/constants';
import type { FilterValueFormReturn } from '../../../logic/filterValueForm';
import { TaskFilterFields } from '../AddFilterMenu/AddFilterMenu.utils';
import { FilterSelectUrgencyField } from './FilterSelectUrgencyField';
import { User } from '../../../../../models/User.model';
import { Status } from '../../../../../models/Status.model';

export interface FilterSelectTypeProps {
  meta: FilterMeta;
  form: FilterValueFormReturn;
  users: User[];
  statuses: Status[];
}

export function FilterSelectType(props: FilterSelectTypeProps) {
  const { meta, form, users } = props;
  // Todo: Use users
  const mappedUsers = users.map(mapToAssigneeData);
  const operator = useWatch({
    control: form.control,
    name: 'operator',
  });

  const valuesField = useController({
    name: 'values',
    control: form.control,
  });

  const valueField = useController({
    name: 'value',
    control: form.control,
  });

  const commonSelectProps = {
    classNames: selectClasses,
  };
  const selectProps = {
    ...valueField.field,
  };
  const multiSelectProps = {
    ...valuesField.field,
    value: valuesField.field.value || EMPTY_ARRAY,
  };
  switch (meta.field) {
    case TaskFilterFields.urgency.field: {
      return <FilterSelectUrgencyField operator={operator} form={form} />;
    }

    case TaskFilterFields.assignee.field: {
      switch (operator) {
        case UIOperators.ONE_OF:
        case UIOperators.NOT_ONE_OF:
        case UIOperators.ONE_OF_LS:
        case UIOperators.NOT_ONE_OF_LS:
          return (
            <MultiSelect
              data={mappedUsers}
              {...commonSelectProps}
              {...multiSelectProps}
              renderOption={(item) => (
                <AssigneeItemContent
                  each={item.option as AssigneeData}
                  selected={item.checked}
                />
              )}
            />
          );
        default:
          return (
            <Select
              {...commonSelectProps}
              {...selectProps}
              data={mappedUsers}
              renderOption={(item) => (
                <AssigneeItemContent
                  each={item.option as AssigneeData}
                  selected={item.checked}
                />
              )}
            />
          );
      }
    }
    default:
      break;
  }
  return <div></div>;
}
