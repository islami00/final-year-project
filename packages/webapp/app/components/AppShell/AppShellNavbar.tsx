import { ActionIcon, AppShell, ScrollArea } from '@mantine/core';
import { generatePath } from '@remix-run/react';
import { Department } from '../../models/Department.model';
import { Organization } from '../../models/Organization.model';
import { routeConfig } from '../../routes/utils';
import { Icon } from '../Icon';
import { NavbarLink } from './NavbarLink/NavbarLink';
import * as navbarLinkStyles from './NavbarLink/NavbarLink.styles';
import { NavbarSection } from './NavbarSection/NavbarSection';
import { OrganisationSwitch } from './OrganisationSwitch/OrganisationSwitch';
import * as classes from './AppShell.styles';

export interface AppShellNavbar {
  currentOrganisation: Organization;
  orgs: Organization[];
  departments: Department[];
}
export function AppShellNavbar(props: AppShellNavbar) {
  const { orgs, currentOrganisation, departments } = props;
  return (
    <AppShell.Navbar>
      <OrganisationSwitch
        organisations={orgs}
        currentOrganisation={currentOrganisation}
      />
      <ScrollArea className={classes.navbarScrollarea}>
        <NavbarSection
          title="Departments"
          titleRightSection={
            <ActionIcon size="sm" variant="subtle" color="#fff">
              <Icon
                className={navbarLinkStyles.icon}
                name="IconPlus"
                strokeSize="s24"
              />
            </ActionIcon>
          }
        >
          {departments.map((each) => (
            <NavbarLink
              key={each.id}
              to={generatePath(routeConfig.departmentList.param, {
                deptId: each.id,
                orgId: each.organisationId,
              })}
              title={each.name}
            />
          ))}
        </NavbarSection>
      </ScrollArea>
    </AppShell.Navbar>
  );
}
