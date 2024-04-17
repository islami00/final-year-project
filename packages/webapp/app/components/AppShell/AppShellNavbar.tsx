import NiceModal from '@ebay/nice-modal-react';
import { ActionIcon, AppShell, ScrollArea } from '@mantine/core';
import { generatePath } from '@remix-run/react';
import { DepartmentWithBoard } from '../../models/DepartmentWithBoards.model';
import { Organization } from '../../models/Organization.model';
import { routeConfig } from '../../routes/utils';
import { modalIds } from '../../utils/modalIds';
import * as classes from './AppShell.styles';
import { NavbarLink } from './NavbarLink/NavbarLink';
import * as navbarLinkStyles from './NavbarLink/NavbarLink.styles';
import { NavbarSection } from './NavbarSection/NavbarSection';
import { OrganisationSwitch } from './OrganisationSwitch/OrganisationSwitch';
import { Icon } from '../Icon';

export interface AppShellNavbar {
  currentOrganisation: Organization;
  orgs: Organization[];
  departments: DepartmentWithBoard[];
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
            <ActionIcon
              size="sm"
              variant="subtle"
              color="#fff"
              onClick={() => NiceModal.show(modalIds.createDepartment)}
            >
              <Icon
                className={navbarLinkStyles.icon}
                name="IconPlus"
                strokeSize="s24"
              />
            </ActionIcon>
          }
        >
          {departments.map((department) => (
            <NavbarLink
              key={department.id}
              to={generatePath(routeConfig.departmentList.param, {
                deptId: department.id,
                orgId: department.organisationId,
              })}
              isEmpty={department.boards.length === 0}
              title={department.name}
            >
              {department.boards.map((board) => (
                <NavbarLink
                  key={board.id}
                  to={generatePath(routeConfig.board.param, {
                    orgId: department.organisationId,
                    boardId: board.id,
                  })}
                  level={2}
                  isEmpty
                  title={board.name}
                />
              ))}
            </NavbarLink>
          ))}
        </NavbarSection>
      </ScrollArea>
    </AppShell.Navbar>
  );
}
