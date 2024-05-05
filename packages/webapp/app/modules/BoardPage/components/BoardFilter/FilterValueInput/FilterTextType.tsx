import { TextInput } from '@mantine/core';
import * as filterValueForm from '../../../logic/filterValueForm';

export interface FilterTextTypeProps {
  form: filterValueForm.FilterValueFormReturn;
}

export function FilterTextType(props: FilterTextTypeProps) {
  const { form } = props;
  return <TextInput {...form.register('value')} placeholder="Enter a value" />;
}
