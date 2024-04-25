import BoardModel, { BoardApi } from '../../../models/Board.model';
import { collections } from '../../pocketbase/collections';
import { pb } from '../../pocketbase/setup';
import { forwardError } from '../../../utils/forwardError';
import { parseClientResponseError } from '../../../utils/parseClientResponseError';

interface PatchBoardByIdBody {
  name?: string;
}
interface PatchBoardByIdArgs {
  body: PatchBoardByIdBody;
  id: string;
}
export async function patchBoardById(args: PatchBoardByIdArgs) {
  const { body, id } = args;

  const record = await pb
    .collection<BoardApi>(collections.board)
    .update(id, body)
    .catch(forwardError(parseClientResponseError));

  return BoardModel.fromApi(record);
}
