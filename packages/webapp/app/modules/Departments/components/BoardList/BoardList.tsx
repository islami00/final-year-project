import { invariant } from '@epic-web/invariant';
import * as ModuleLayout from '../../../../layouts/ModuleLayout';
import { Department } from '../../../../models/Department.model';
import { useCurrentDepartments } from '../../logic/useCurrentDepartments';
import { AddBoardButton } from './AddBoardButton';
import { DepartmentInput } from './DepartmentInput';
import { Search } from './Search';
import { RemoveBoardButton } from './RemoveBoardButton';

export interface BoardListProps {
  department: Department;
}

export function BoardList(props: BoardListProps) {
  const { department: oldDept } = props;
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
