import { Button, type ElementProps } from '@mantine/core';
import * as navbarLinkClasses from '../../../../components/AppShell/NavbarLink/NavbarLink.styles';
import { Icon } from '../../../../components/Icon/Icon';

export function AddBoardButton(props: ElementProps<'button'>) {
  return (
    <Button
      {...props}
      size="xs"
      leftSection={
        <Icon name="IconPlus" size="s24" className={navbarLinkClasses.icon} />
      }
      color="dark"
      variant="filled"
    >
      Add a Board
    </Button>
  );
}
