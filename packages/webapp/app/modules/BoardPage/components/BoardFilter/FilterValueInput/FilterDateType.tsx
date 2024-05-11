import { DateInput } from '@mantine/dates';
import dayjs from 'dayjs';
import * as React from 'react';
import { useController } from 'react-hook-form';
import type { FilterValueFormReturn } from '../../../logic/filterValueForm';
import { FILTER_DATE_FMT } from './FilterValueInput.utils';

export interface FilterDateTypeProps {
  form: FilterValueFormReturn;
}

export function FilterDateType(props: FilterDateTypeProps) {
  const { form } = props;
  const valueControl = useController({
    name: 'data.value',
    control: form.control,
  });
  const dateValue = React.useMemo(
    () =>
      valueControl.field.value ? new Date(valueControl.field.value) : null,
    [valueControl.field.value]
  );
  return (
    <DateInput
      value={dateValue}
      onChange={(value) => {
        const formatted = dayjs(value).format(FILTER_DATE_FMT);
        return valueControl.field.onChange(formatted);
      }}
      valueFormat={FILTER_DATE_FMT}
      placeholder={FILTER_DATE_FMT}
    />
  );
}
