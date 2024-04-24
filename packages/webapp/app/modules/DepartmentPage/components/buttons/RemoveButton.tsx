import { ActionIcon, type ElementProps } from '@mantine/core';
import { Icon } from '../../../../components/Icon/Icon';

export function RemoveButton(props: ElementProps<'button'>) {
  return (
    <ActionIcon size="lg" variant="filled" color="dark" {...props}>
      <Icon name="IconTrash" strokeSize="s24" />
    </ActionIcon>
  );
}
