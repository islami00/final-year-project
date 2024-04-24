import BoardModel, {
  BoardApi,
  Board,
  type BoardCreate,
} from '../../../models/Board.model';
import { pb } from '../../pocketbase/setup';
import { collections } from '../../pocketbase/collections';
import { forwardError } from '../../../utils/forwardError';
import { parseClientResponseError } from '../../../utils/parseClientResponseError';

export interface PostCreateBoardArgs {
  body: BoardCreate;
}

export async function postCreateBoard(
  args: PostCreateBoardArgs
): Promise<Board> {
  const { body } = args;

  const createBoard: BoardCreate = {
    name: body.name,
    departmentId: body.departmentId,
  };

  const board = await pb
    .collection<BoardApi>(collections.board)
    .create(createBoard)
    .catch(forwardError(parseClientResponseError));

  return BoardModel.fromApi(board);
}
