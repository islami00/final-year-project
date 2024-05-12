import { forwardError } from '../../../utils/ErrorHandling/forwardError';
import { parseClientResponseError } from '../../../utils/ErrorHandling/parseClientResponseError';
import { collections } from '../../pocketbase/collections';
import { pb } from '../../pocketbase/setup';

interface DepartmentBoardArgs {
  boardId: string;
}
export async function deleteBoard(args: DepartmentBoardArgs): Promise<void> {
  const { boardId } = args;

  await pb
    .collection(collections.board)
    .delete(boardId)
    .catch(forwardError(parseClientResponseError));
}
