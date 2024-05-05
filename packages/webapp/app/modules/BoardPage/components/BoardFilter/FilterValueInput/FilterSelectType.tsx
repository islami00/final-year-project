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
import { StatusSelectItemContent } from '../../../../../components/StatusSelect/StatusSelectItemContent';
import {
  mapToStatusData,
  StatusItemData,
} from '../../../../../components/StatusSelect/StatusSelect.utils';

export interface FilterSelectTypeProps {
  meta: FilterMeta;
  form: FilterValueFormReturn;
  users: User[];
  statuses: Status[];
}

export function FilterSelectType(props: FilterSelectTypeProps) {
  const { meta, form, users, statuses } = props;
  const mappedUsers = users.map(mapToAssigneeData);
  const mappedStatuses = statuses.map(mapToStatusData);
  const operator = useWatch({
    control: form.control,
    name: 'data.operator',
  });

  const valuesField = useController({
    name: 'data.values',
    control: form.control,
  });

  const valueField = useController({
    name: 'data.value',
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
    case TaskFilterFields.status.field: {
      switch (operator) {
        case UIOperators.ONE_OF:
        case UIOperators.NOT_ONE_OF:
        case UIOperators.ONE_OF_LS:
        case UIOperators.NOT_ONE_OF_LS:
          return (
            <MultiSelect
              data={mappedStatuses}
              {...commonSelectProps}
              {...multiSelectProps}
              renderOption={(item) => (
                <StatusSelectItemContent
                  status={item.option as StatusItemData}
                />
              )}
            />
          );
        default:
          return (
            <Select
              {...commonSelectProps}
              {...selectProps}
              data={mappedStatuses}
              renderOption={(item) => (
                <StatusSelectItemContent
                  status={item.option as StatusItemData}
                />
              )}
            />
          );
      }
    }
    default:
      meta.field;
      break;
  }
  return <div></div>;
}
