import { useController } from 'react-hook-form';

import type { FilterValueFormReturn } from '../../../logic/filterValueForm';
import { NumberInput } from '@mantine/core';

export interface FilterNumberTypeProps {
  form: FilterValueFormReturn;
}

export function FilterNumberType(props: FilterNumberTypeProps) {
  const { form } = props;
  const control = useController({
    control: form.control,
    name: 'value',
  });
  const numberValue = control.field.value ? Number(control.field.value) : '';
  return (
    <NumberInput
      value={numberValue}
      onChange={(v) => {
        control.field.onChange(String(v));
      }}
      thousandSeparator=","
    />
  );
}
