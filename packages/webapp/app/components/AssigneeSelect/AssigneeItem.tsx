import { Combobox } from '@mantine/core';
import {
  AssigneeItemContentProps,
  AssigneeItemContent,
} from './AssigneeItemContent';

type AssigneeItemProps = AssigneeItemContentProps;
export function AssigneeItem(props: AssigneeItemProps) {
  const { each, ...rest } = props;
  return (
    <Combobox.Option value={each.value}>
      <AssigneeItemContent {...rest} each={each} />
    </Combobox.Option>
  );
}
