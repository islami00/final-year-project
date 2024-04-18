import { Department } from '../../../../models/Department.model';
import * as ModuleLayout from '../../../../layouts/ModuleLayout';
import { DepartmentInput } from './DepartmentInput';
import { useCurrentDepartments } from '../../logic/useCurrentDepartments';
import { invariant } from '@epic-web/invariant';

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
        actions={<></>}
      />
    </ModuleLayout.Main>
  );
}
