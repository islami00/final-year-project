import { Button } from '@mantine/core';
import * as navbarLinkClasses from '../../../../components/AppShell/NavbarLink/NavbarLink.styles';
import { Icon } from '../../../../components/Icon/Icon';

export function AddBoardButton() {
  return (
    <Button
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
