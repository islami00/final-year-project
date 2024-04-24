import { ActionIcon } from '@mantine/core';
import { mapPriorityToColor } from '../../../../../components/PrioritySelect/PrioritySelect.utils';
import { Priority } from '../../../../../models/Task.model';
import { PriorityFlag } from '../../../../../components/PrioritySelect/PriorityFlag';
import { forwardRef } from 'react';

interface PriorityButtonProps {
  onClick?: React.MouseEventHandler;
  currentValue: Priority | null;
}
export const PriorityButton = forwardRef<
  HTMLButtonElement,
  PriorityButtonProps
>((props, ref) => {
  const { onClick, currentValue } = props;
  return (
    <ActionIcon ref={ref} onClick={onClick} size="lg" radius="sm" color="dark">
      <PriorityFlag color={mapPriorityToColor(currentValue)} />
    </ActionIcon>
  );
});
