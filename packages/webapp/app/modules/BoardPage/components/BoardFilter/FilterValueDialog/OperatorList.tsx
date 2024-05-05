import { Chip } from '@mantine/core';
import * as classes from './FilterValueDialog.styles';
import * as filterValueForm from '../../../logic/filterValueForm';
import { useController } from 'react-hook-form';
import { defaultSetValueConfig } from '../../../../../utils/Form/reactHookForm';

interface OperatorListProps {
  form: filterValueForm.FilterValueFormReturn;

  operators: filterValueForm.OperatorChip[];
}
export function OperatorList(props: OperatorListProps) {
  const { operators, form } = props;
  const { field } = useController({
    name: 'data.operator',
    control: form.control,
  });

  return (
    <Chip.Group
      value={field.value}
      onChange={(v) => {
        field.onChange(v);
        form.setValue('data.value', null, defaultSetValueConfig);
        form.setValue('data.values', null, defaultSetValueConfig);
      }}
    >
      <div className={classes.operators}>
        {operators.map((each) => (
          <Chip key={each.operator} radius="sm" value={each.operator}>
            {each.label}
          </Chip>
        ))}
      </div>
    </Chip.Group>
  );
}
