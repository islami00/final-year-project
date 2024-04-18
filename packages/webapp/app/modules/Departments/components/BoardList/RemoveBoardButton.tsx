import { ActionIcon } from '@mantine/core';
import { Icon } from '../../../../components/Icon/Icon';

export function RemoveBoardButton() {
  return (
    <ActionIcon size="lg" variant="filled" color="dark">
      <Icon name="IconTrash" strokeSize="s24" />
    </ActionIcon>
  );
}
