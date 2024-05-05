import { Chip } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import * as classes from './FilterValueDialog.styles';
import * as filterValueForm from './filterValueForm';

interface OperatorListProps {
  getInputProps: UseFormReturnType<filterValueForm.FilterValueForm>['getInputProps'];
  operators: filterValueForm.OperatorChip[];
}
export function OperatorList(props: OperatorListProps) {
  const { getInputProps, operators } = props;

  return (
    <Chip.Group {...getInputProps('operator', { type: 'checkbox' })}>
      <div className={classes.operators}>
        {operators.map((each) => (
          <Chip value={each.operator}>{each.label}</Chip>
        ))}
      </div>
    </Chip.Group>
  );
}
