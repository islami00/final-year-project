import { AppShell, type AppShellNavbarConfiguration } from '@mantine/core';
import { Organization } from '../../models/Organization.model';
import * as React from 'react';
import type { User } from '../../models/User.model';
import { AppShellMain } from './AppShell.styles';
import { AppShellHeader } from './AppShellHeader';
import { AppShellNavbar } from './AppShellNavbar';
import { useDisclosure } from '@mantine/hooks';

export interface AppShellRootProps {
  /** Ensure `organisations` are also passed to render the navbar */
  navbar?: boolean;
  children: React.ReactNode;
  user: User;
  organisations?: Organization[];
}

export function AppShellRoot(props: AppShellRootProps) {
  const { children, user, navbar, organisations } = props;

  const [openedNav, toggleNav] = useDisclosure();
  const navbarConfig: AppShellNavbarConfiguration = {
    width: 301,
    breakpoint: 'sm',
    collapsed: { mobile: !openedNav },
  };
  const isNavbarVisible = !!navbar && !!organisations;
  return (
    <AppShell
      header={{ offset: true, height: 59 }}
      navbar={navbar ? navbarConfig : undefined}
    >
      <AppShellHeader
        isNavbarVisible={isNavbarVisible}
        openedNav={openedNav}
        user={user}
        toggleNav={toggleNav}
      />
      {isNavbarVisible ? (
        <AppShellNavbar user={user} orgs={organisations} />
      ) : null}
      <AppShellMain>{children}</AppShellMain>
    </AppShell>
  );
}
