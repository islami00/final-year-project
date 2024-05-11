import { Chip } from '@mantine/core';
import * as classes from './FilterValueDialog.styles';
import * as filterValueForm from '../../../logic/filterValueForm';
import { useController } from 'react-hook-form';
import { defaultSetValueConfig } from '../../../../../utils/Form/reactHookForm';
import { OperatorChip } from '../../../../../utils/Filter';

interface OperatorListProps {
  form: filterValueForm.FilterValueFormReturn;

  operators: OperatorChip[];
}
export function OperatorList(props: OperatorListProps) {
  const { operators, form } = props;
  const { field } = useController({
    name: 'data.operatorChip',
    control: form.control,
  });

  return (
    <Chip.Group
      value={field.value.operator}
      multiple={false}
      onChange={(v) => {
        const operator = operators.find((each) => each.operator === v);
        if (!operator) return;
        field.onChange(operator);
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
