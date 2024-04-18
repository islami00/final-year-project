import BoardModel, { Board, BoardApi } from '../../../models/Board.model';
import { collections } from '../../pocketbase/collections';
import { pb } from '../../pocketbase/setup';

export interface GetBoardsByDepartmentArgs {
  deptId: string;
}
export async function getBoardsByDepartment(
  args: GetBoardsByDepartmentArgs
): Promise<Board[]> {
  const { deptId } = args;
  const boards = await pb.collection<BoardApi>(collections.board).getFullList({
    filter: pb.filter(` departmentId = {:deptId}`, { deptId }),
  });

  return BoardModel.fromArrayApi(boards);
}
