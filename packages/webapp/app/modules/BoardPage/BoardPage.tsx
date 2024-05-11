import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { ReactErrorBoundaryFallback } from '../../components/errors/ReactErrorBoundaryFallback';
import * as ModuleLayout from '../../layouts/ModuleLayout';
import { type BoardIdParams } from '../../routes/app.$orgId.boards.$boardId/utils';
import { modalIds } from '../../utils/modalIds';
import { BoardPageLoading } from './BoardPage.loading';
import { DeleteBoard } from './components/DeleteBoard';
import { BoardPageRaw } from './BoardPage.raw';

interface BoardPageProps {
  params: BoardIdParams;
}
export function BoardPage(props: BoardPageProps) {
  const { params } = props;

  return (
    <ModuleLayout.Main>
      <ErrorBoundary FallbackComponent={ReactErrorBoundaryFallback}>
        <Suspense fallback={<BoardPageLoading />}>
          <BoardPageRaw params={params} />
        </Suspense>
      </ErrorBoundary>
      <DeleteBoard id={modalIds.deleteBoard} boardId={params.boardId} />
    </ModuleLayout.Main>
  );
}
