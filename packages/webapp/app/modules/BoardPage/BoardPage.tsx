import * as React from 'react';
import * as ModuleLayout from '../../layouts/ModuleLayout';
import { Search } from '../../components/Search/Search';
import { ModuleAddButton } from '../DepartmentPage/components/buttons/ModuleAddButton';
import { RemoveButton } from '../DepartmentPage/components/buttons/RemoveButton';
import { generatePath, useNavigate } from '@remix-run/react';
import { routeConfig } from '../../utils/routeConfig';
import { Status } from '../../models/Status.model';

export interface BoardPageProps {
  statuses: Status[];
}

export function BoardPage(props: BoardPageProps) {
  const navigate = useNavigate();
  return (
    <ModuleLayout.Main>
      <ModuleLayout.Toolbar
        title={<div />}
        actions={
          <>
            <ModuleAddButton
              onClick={() =>
                navigate(
                  generatePath(routeConfig.createTask.param, {
                    boardId: '',
                    orgId: '',
                  })
                )
              }
            >
              Add a Task
            </ModuleAddButton>
            <Search placeholder="Search Tasks" />
            <RemoveButton />
          </>
        }
      />
      <ModuleLayout.Content>
        <div />
      </ModuleLayout.Content>
    </ModuleLayout.Main>
  );
}
