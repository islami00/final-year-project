import { AppShell, type AppShellNavbarConfiguration } from '@mantine/core';
import * as React from 'react';
import { Organization } from '../../models/Organization.model';
import type { User } from '../../models/User.model';

import { useDisclosure } from '@mantine/hooks';
import { Department } from '../../models/Department.model';
import { appShellClasses } from './AppShell.styles';
import { AppShellHeader } from './AppShellHeader';
import { AppShellNavbar } from './AppShellNavbar';

export interface AppShellRootProps {
  /** Ensure `organisations` are also passed to render the navbar */
  navbar?: boolean;
  children: React.ReactNode;
  user: User;
  organisations?: Organization[];
  currentOrganisation?: Organization;
  departments?: Department[];
}

export function AppShellRoot(props: AppShellRootProps) {
  const {
    children,
    user,
    navbar,
    organisations,
    currentOrganisation,
    departments,
  } = props;

  const [openedNav, toggleNav] = useDisclosure();
  const navbarConfig: AppShellNavbarConfiguration = {
    width: 301,
    breakpoint: 'sm',
    collapsed: { mobile: !openedNav },
  };
  const isNavbarVisible =
    !!navbar && !!organisations && !!currentOrganisation && !!departments;
  return (
    <AppShell
      header={{ offset: true, height: 59 }}
      navbar={navbar ? navbarConfig : undefined}
      classNames={appShellClasses}
    >
      <AppShellHeader
        isNavbarVisible={isNavbarVisible}
        openedNav={openedNav}
        user={user}
        toggleNav={toggleNav}
        organisations={organisations}
      />
      {isNavbarVisible ? (
        <AppShellNavbar
          orgs={organisations}
          currentOrganisation={currentOrganisation}
          departments={departments}
        />
      ) : null}
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
