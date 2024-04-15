import { AppShell } from '@mantine/core';
import { Organization } from '../../models/Organization.model';
import * as React from 'react';
import type { User } from '../../models/User.model';
import { OrganisationSwitch } from './OrganisationSwitch/OrganisationSwitch';

export interface AppShellNavbar {
  user: User;
  currentOrganisation: Organization;
  orgs: Organization[];
}
export function AppShellNavbar(props: AppShellNavbar) {
  // TOdo: Navbar.
  const { orgs, currentOrganisation } = props;
  return (
    <AppShell.Navbar>
      <OrganisationSwitch
        organisations={orgs}
        currentOrganisation={currentOrganisation}
      />
    </AppShell.Navbar>
  );
}
