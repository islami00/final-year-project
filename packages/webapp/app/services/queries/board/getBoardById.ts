import BoardModel, { BoardApi, Board } from '../../../models/Board.model';
import { collections } from '../../pocketbase/collections';
import { pb } from '../../pocketbase/setup';
import { forwardError } from '../../../utils/forwardError';
import { parseClientResponseError } from '../../../utils/parseClientResponseError';

interface GetBoardByIdArgs {
  id: string;
}
export async function getBoardById(args: GetBoardByIdArgs): Promise<Board> {
  const { id } = args;
  const data = await pb
    .collection<BoardApi>(collections.board)
    .getOne(id)
    .catch(forwardError(parseClientResponseError));
  return BoardModel.fromApi(data);
}
