import { invariant } from '@epic-web/invariant';
import { Await } from '@remix-run/react';
import { Suspense } from 'react';
import { Search } from '../../components/Search/Search';
import * as ModuleLayout from '../../layouts/ModuleLayout';
import type { DepartmentsDepartmentIdLoaderData } from './Department.types';
import { BoardList } from './components/BoardList/BoardList';
import { BoardListError } from './components/BoardList/BoardList.error';
import { BoardListLoading } from './components/BoardList/BoardList.loading';
import { AddBoardButton } from './components/buttons/AddBoardButton';
import { RemoveBoardButton } from './components/buttons/RemoveBoardButton';
import { DepartmentInput } from './components/inputs/DepartmentInput';
import { useCurrentDepartments } from './logic/useCurrentDepartments';
import { DepartmentContent } from './Department.styles';

export interface DepartmentPageProps {
  data: DepartmentsDepartmentIdLoaderData;
}

export function DepartmentPage(props: DepartmentPageProps) {
  const { data } = props;
  const { department: oldDept } = data;
  const departmentName = useCurrentDepartments({
    departmentsOrDepartment: oldDept,
  });
  const currentDept = departmentName.get(oldDept.id);
  invariant(currentDept, 'Department must exist in optimistic list');
  return (
    <ModuleLayout.Main>
      <ModuleLayout.Toolbar
        title={
          <DepartmentInput
            defaultValue={currentDept.name}
            deptId={currentDept.id}
          />
        }
        actions={
          <>
            <AddBoardButton />
            <Search placeholder="Search Boards" />
            <RemoveBoardButton />
          </>
        }
      />
      <DepartmentContent>
        <Suspense fallback={<BoardListLoading />}>
          <Await errorElement={<BoardListError />} resolve={data.boards}>
            {(rs) => <BoardList boards={rs} />}
          </Await>
        </Suspense>
      </DepartmentContent>
    </ModuleLayout.Main>
  );
}
