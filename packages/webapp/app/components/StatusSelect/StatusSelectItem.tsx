import { Combobox } from '@mantine/core';
import {
  StatusSelectItemContent,
  StatusSelectItemContentProps,
} from './StatusSelectItemContent';

type StatusSelectItemProps = StatusSelectItemContentProps;
export function StatusSelectItem(props: StatusSelectItemProps) {
  const { status } = props;
  return (
    <Combobox.Option value={status.value} key={status.value}>
      <StatusSelectItemContent {...props} />
    </Combobox.Option>
  );
}
