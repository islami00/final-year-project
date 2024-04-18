import { invariant } from '@epic-web/invariant';
import * as ModuleLayout from '../../layouts/ModuleLayout';
import { useCurrentDepartments } from './logic/useCurrentDepartments';
import { AddBoardButton } from './components/buttons/AddBoardButton';
import { DepartmentInput } from './components/inputs/DepartmentInput';
import { Search } from '../../components/Search/Search';
import { RemoveBoardButton } from './components/buttons/RemoveBoardButton';
import type { DepartmentsDepartmentIdLoaderData } from './Department.types';
import type { SerializeFrom } from '@remix-run/node';

export interface DepartmentPageProps {
  data: SerializeFrom<DepartmentsDepartmentIdLoaderData>;
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
    </ModuleLayout.Main>
  );
}
