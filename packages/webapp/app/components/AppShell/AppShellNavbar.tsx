import { AppShell } from '@mantine/core';
import { Organization } from '../../models/Organization.model';
import * as React from 'react';
import type { User } from '../../models/User.model';

export interface AppShellNavbar {
  user: User;
  orgs: Organization[];
}
export function AppShellNavbar(props: AppShellNavbar) {
  const { user } = props;
  return <AppShell.Navbar>Nav</AppShell.Navbar>;
}
