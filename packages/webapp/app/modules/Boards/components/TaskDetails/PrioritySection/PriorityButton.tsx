import { ActionIcon } from '@mantine/core';
import { mapPriorityToColor } from '../../../../../components/PrioritySelect/PrioritySelect.utils';
import { Priority } from '../../../../../models/Task.model';
import { PriorityFlag } from '../../../../../components/PrioritySelect/PriorityFlag';

interface PriorityButtonProps {
  onClick?: React.MouseEventHandler;
  currentValue: Priority | null;
}
export function PriorityButton(props: PriorityButtonProps) {
  const { onClick, currentValue } = props;
  return (
    <ActionIcon onClick={onClick} size="lg" radius="sm" color="dark">
      <PriorityFlag color={mapPriorityToColor(currentValue)} />
    </ActionIcon>
  );
}
