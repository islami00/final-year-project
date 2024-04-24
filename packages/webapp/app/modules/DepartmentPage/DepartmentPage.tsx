import NiceModal from '@ebay/nice-modal-react';
import { invariant } from '@epic-web/invariant';
import { Await } from '@remix-run/react';
import { Suspense } from 'react';
import { Search } from '../../components/Search/Search';
import * as ModuleLayout from '../../layouts/ModuleLayout';
import { modalIds } from '../../utils/modalIds';
import { DepartmentContent } from './DepartmentPage.styles';
import type { DepartmentsDepartmentIdLoaderData } from './DepartmentPage.types';
import { BoardList } from './components/BoardList/BoardList';
import { BoardListError } from './components/BoardList/BoardList.error';
import { BoardListLoading } from './components/BoardList/BoardList.loading';
import { CreateBoard } from './components/CreateBoard';
import { DeleteDepartment } from './components/DeleteDepartment/DeleteDepartment';
import { ModuleAddButton } from './components/buttons/ModuleAddButton';
import { RemoveButton } from './components/buttons/RemoveButton';
import { DepartmentTitleInput } from './components/inputs/DepartmentTitleInput';
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
          <DepartmentTitleInput
            defaultValue={currentDept.name}
            id={currentDept.id}
          />
        }
        actions={
          <>
            <ModuleAddButton
              onClick={() => NiceModal.show(modalIds.createBoard)}
            >
              Add a Board
            </ModuleAddButton>
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
