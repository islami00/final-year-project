import NiceModal from '@ebay/nice-modal-react';
import { invariant } from '@epic-web/invariant';
import { Await } from '@remix-run/react';
import { Suspense } from 'react';
import { Search } from '../../components/Search/Search';
import * as ModuleLayout from '../../layouts/ModuleLayout';
import { modalIds } from '../../utils/modalIds';
import { DepartmentContent } from './Department.styles';
import type { DepartmentsDepartmentIdLoaderData } from './Department.types';
import { BoardList } from './components/BoardList/BoardList';
import { BoardListError } from './components/BoardList/BoardList.error';
import { BoardListLoading } from './components/BoardList/BoardList.loading';
import { CreateBoard } from './components/CreateBoard';
import { DeleteDepartment } from './components/DeleteDepartment/DeleteDepartment';
import { AddBoardButton } from './components/buttons/AddBoardButton';
import { RemoveButton } from './components/buttons/RemoveButton';
import { DepartmentInput } from './components/inputs/DepartmentInput';
import { useCurrentDepartments } from './logic/useCurrentDepartments';

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
            <AddBoardButton
              onClick={() => NiceModal.show(modalIds.createBoard)}
            />
            <Search placeholder="Search Boards" />
            <RemoveButton
              onClick={() => NiceModal.show(modalIds.deleteDepartment)}
            />
          </>
        }
      />
      <DepartmentContent>
        <Suspense fallback={<BoardListLoading />}>
          <Await errorElement={<BoardListError />} resolve={data.boards}>
            {(rs) => (
              <BoardList boards={rs} orgId={data.department.organisationId} />
            )}
          </Await>
        </Suspense>
      </DepartmentContent>
      <DeleteDepartment
        deptId={currentDept.id}
        id={modalIds.deleteDepartment}
      />
      <CreateBoard deptId={currentDept.id} id={modalIds.createBoard} />
    </ModuleLayout.Main>
  );
}
