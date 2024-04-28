import NiceModal from '@ebay/nice-modal-react';
import { generatePath, useLoaderData, useNavigate } from '@remix-run/react';
import { Search } from '../../components/Search/Search';
import * as ModuleLayout from '../../layouts/ModuleLayout';
import { BoardIdLoader } from '../../routes/app.$orgId.boards.$boardId/types';
import { type BoardIdParams } from '../../routes/app.$orgId.boards.$boardId/utils';
import { modalIds } from '../../utils/modalIds';
import { routeConfig } from '../../utils/routeConfig';
import { ModuleAddButton } from '../DepartmentPage/components/buttons/ModuleAddButton';
import { RemoveButton } from '../DepartmentPage/components/buttons/RemoveButton';
import { BoardTitleInput } from './components/inputs/BoardTitleInput';
import { BoardColumns } from './components/BoardColumns/BoardColumns';
import { BoardFilter } from './components/BoardFilter/BoardFilter';

interface BoardPageRawProps {
  params: BoardIdParams;
}
export function BoardPageRaw(props: BoardPageRawProps) {
  const { params } = props;

  const navigate = useNavigate();
  const data = useLoaderData<BoardIdLoader>();
  const { board } = data;

  return (
    <>
      <ModuleLayout.Toolbar
        title={<BoardTitleInput defaultValue={board.name} id={board.id} />}
        actions={
          <>
            <BoardFilter />
            <ModuleAddButton
              onClick={() =>
                navigate(
                  generatePath(routeConfig.createTask.param, {
                    boardId: board.id,
                    orgId: params.orgId,
                  })
                )
              }
            >
              Add a Task
            </ModuleAddButton>
            <Search placeholder="Search Tasks" />
            <RemoveButton
              onClick={() => NiceModal.show(modalIds.deleteBoard)}
            />
          </>
        }
      />
      <ModuleLayout.Content>
        <BoardColumns params={params} />
      </ModuleLayout.Content>
    </>
  );
}
