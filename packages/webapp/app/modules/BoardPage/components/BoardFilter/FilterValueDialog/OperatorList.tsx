import { Chip } from '@mantine/core';
import * as classes from './FilterValueDialog.styles';
import * as filterValueForm from '../../../logic/filterValueForm';
import { useController } from 'react-hook-form';

interface OperatorListProps {
  form: filterValueForm.FilterValueFormReturn;

  operators: filterValueForm.OperatorChip[];
}
export function OperatorList(props: OperatorListProps) {
  const { operators, form } = props;
  const { field } = useController({
    name: 'operator',
    control: form.control,
  });
  return (
    <Chip.Group value={field.value} onChange={field.onChange}>
      <div className={classes.operators}>
        {operators.map((each) => (
          <Chip radius="sm" value={each.operator}>
            {each.label}
          </Chip>
        ))}
      </div>
    </Chip.Group>
  );
}
