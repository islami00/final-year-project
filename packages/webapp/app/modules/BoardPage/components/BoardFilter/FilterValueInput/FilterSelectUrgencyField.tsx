import { MultiSelect, Select } from '@mantine/core';
import { EMPTY_ARRAY } from '../../../../../utils/constants';
import { useController } from 'react-hook-form';
import { selectClasses } from '../../../../../components/AssigneeSelect/AssigneeSelect.styles';
import { PriorityItemContent } from '../../../../../components/PrioritySelect/PriorityItemContent';
import { priorityList } from '../../../../../components/PrioritySelect/PrioritySelect.utils';
import { Priority } from '../../../../../models/Task.model';
import { UIOperators, type OperatorOptions } from '../../../../../utils/Filter';
import type { FilterValueFormReturn } from '../../../logic/filterValueForm';

interface FilterSelectUrgencyFieldProps {
  operator: OperatorOptions;
  form: FilterValueFormReturn;
}
export function FilterSelectUrgencyField(props: FilterSelectUrgencyFieldProps) {
  const { operator, form } = props;
  const valuesField = useController({
    name: 'data.values',
    control: form.control,
  });

  const valueField = useController({
    name: 'data.value',
    control: form.control,
  });
  switch (operator) {
    case UIOperators.ONE_OF:
    case UIOperators.NOT_ONE_OF:
    case UIOperators.ONE_OF_LS:
    case UIOperators.NOT_ONE_OF_LS:
      return (
        <MultiSelect
          {...valuesField.field}
          data={priorityList}
          classNames={selectClasses}
          searchable
          value={valuesField.field.value || EMPTY_ARRAY}
          renderOption={(item) => (
            <PriorityItemContent priority={item.option.value as Priority} />
          )}
        />
      );

    default:
      return (
        <Select
          {...valueField.field}
          data={priorityList}
          searchable
          value={valueField.field.value}
          classNames={selectClasses}
          renderOption={(item) => (
            <PriorityItemContent priority={item.option.value as Priority} />
          )}
        />
      );
  }
}
