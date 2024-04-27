import {
  Await,
  generatePath,
  useLoaderData,
  useNavigate,
} from '@remix-run/react';
import { Suspense } from 'react';
import { Search } from '../../components/Search/Search';
import * as ModuleLayout from '../../layouts/ModuleLayout';
import { BoardIdLoader } from '../../routes/app.$orgId.boards.$boardId/types';
import { type BoardIdParams } from '../../routes/app.$orgId.boards.$boardId/utils';
import { routeConfig } from '../../utils/routeConfig';
import { ModuleAddButton } from '../DepartmentPage/components/buttons/ModuleAddButton';
import { RemoveButton } from '../DepartmentPage/components/buttons/RemoveButton';
import { DefaultAwaitErrorElement } from '../../components/errors/DefaultAwaitErrorElement';
import { BoardPageLoading } from './BoardPage.loading';
import { StatusColumn } from './components/StatusColumn/StatusColumn';
import NiceModal from '@ebay/nice-modal-react';
import { modalIds } from '../../utils/modalIds';
import { DeleteBoard } from './components/DeleteBoard';
import { BoardTitleInput } from './components/inputs/BoardTitleInput';

interface BoardPageProps {
  params: BoardIdParams;
}
export function BoardPage(props: BoardPageProps) {
  const { params } = props;
  const navigate = useNavigate();

  const data = useLoaderData<BoardIdLoader>();
  const { statusQueries, statuses, board } = data;

  // Add an await here for the main page's data. Use tanstack's suspense queries and nest as needed
  return (
    <ModuleLayout.Main>
      <ModuleLayout.Toolbar
        title={<BoardTitleInput defaultValue={board.name} id={board.id} />}
        actions={
          <>
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
        <Suspense fallback={<BoardPageLoading />}>
          <Await
            resolve={statusQueries}
            errorElement={<DefaultAwaitErrorElement />}
          >
            {statuses.allStatuses.map((each) => (
              <StatusColumn orgId={params.orgId} status={each} key={each.id} />
            ))}
          </Await>
        </Suspense>
      </ModuleLayout.Content>
      <DeleteBoard id={modalIds.deleteBoard} boardId={params.boardId} />
    </ModuleLayout.Main>
  );
}
