import { StatusApi, StatusListWithDefault } from '../../../models/Status.model';
import { collections } from '../../pocketbase/collections';
import { pb } from '../../pocketbase/setup';
import StatusModel from '../../../models/Status.model';

interface GetStatusByBoardIdArgs {
  boardId: string;
}
export async function getStatusByBoardId(
  args: GetStatusByBoardIdArgs
): Promise<StatusListWithDefault> {
  const { boardId } = args;

  const allStatuses = await pb
    .collection<StatusApi>(collections.status)
    .getFullList({
      filter: pb.filter(`boardId = {:boardId}`, { boardId }),
    });

  const result = await StatusModel.fromArrayWithDefault(allStatuses);
  return result;
}
