import { AppShell, Burger } from '@mantine/core';
import { User } from '../../models/User.model';
import { AppLogo } from '../AppLogo/AppLogo';
import { HeaderMenu } from './HeaderMenu/HeaderMenu';
import type { ToggleFunctions } from '../types';
import { UserSettings } from './UserSettings';
import { useId } from 'react';
import { Organization } from '../../models/Organization.model';
interface AppShellHeaderProps {
  user: User;
  toggleNav: ToggleFunctions;
  openedNav: boolean;
  isNavbarVisible: boolean;
  organisations: Organization[] | undefined;
}

export function AppShellHeader(props: AppShellHeaderProps) {
  const { user, toggleNav, openedNav, isNavbarVisible, organisations } = props;

  const userSettingsModalId = useId();
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
      <HeaderMenu
        canShowSettingsModal={!!organisations}
        userSettingsModalId={userSettingsModalId}
        user={user}
      />
      {organisations ? (
        <UserSettings
          organisations={organisations}
          user={user}
          id={userSettingsModalId}
        />
      ) : null}
    </AppShell.Header>
  );
}
