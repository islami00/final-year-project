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
import { BoardPageError } from './BoardPage.error';
import { BoardPageLoading } from './BoardPage.loading';
import { StatusColumn } from './components/StatusColumn/StatusColumn';

interface BoardPageProps {
  params: BoardIdParams;
}
export function BoardPage(props: BoardPageProps) {
  const { params } = props;
  const navigate = useNavigate();

  const data = useLoaderData<BoardIdLoader>();
  const { statusQueries, statuses, board } = data;
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
                    boardId: board.id,
                    orgId: params.orgId,
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
        <Suspense fallback={<BoardPageLoading />}>
          <Await resolve={statusQueries} errorElement={<BoardPageError />}>
            {statuses.allStatuses.map((each) => (
              <StatusColumn status={each} key={each.id} />
            ))}
          </Await>
        </Suspense>
      </ModuleLayout.Content>
    </ModuleLayout.Main>
  );
}
