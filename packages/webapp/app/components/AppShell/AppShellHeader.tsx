import { AppShell, Burger } from '@mantine/core';
import { User } from '../../models/User.model';
import { AppLogo } from '../AppLogo/AppLogo';
import { HeaderMenu } from './HeaderMenu';
import type { ToggleFunctions } from '../types';
interface AppShellHeaderProps {
  user: User;
  toggleNav: ToggleFunctions;
  openedNav: boolean;
  isNavbarVisible: boolean;
}

export function AppShellHeader(props: AppShellHeaderProps) {
  const { user, toggleNav, openedNav, isNavbarVisible } = props;

  return (
    <AppShell.Header>
      {isNavbarVisible ? (
        <Burger
          opened={openedNav}
          onClick={toggleNav.toggle}
          hiddenFrom="sm"
          size="sm"
        />
      ) : null}
      <AppLogo />
      <HeaderMenu user={user} />
    </AppShell.Header>
  );
}
