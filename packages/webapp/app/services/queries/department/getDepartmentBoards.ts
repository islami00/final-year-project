import BoardModel, { Board, BoardApi } from '../../../models/Board.model';
import { collections } from '../../pocketbase/collections';
import { pb } from '../../pocketbase/setup';
import { Operators, parseFilters } from '../../../utils/Filter';

export interface GetDepartmentBoardsArgs {
  deptId: string;

  q?: string | null;
}
export async function getDepartmentBoards(
  args: GetDepartmentBoardsArgs
): Promise<Board[]> {
  const { deptId, q } = args;

  const queryParams = parseFilters([
    {
      field: 'departmentId',
      operator: Operators.EQ,
      placeholder: 'deptId',
      value: deptId,
    },
    {
      field: 'name',
      operator: Operators.CONTAINS,
      placeholder: 'name',
      value: q,
    },
  ]);
  const boards = await pb.collection<BoardApi>(collections.board).getFullList({
    filter: pb.filter(queryParams.template, queryParams.params),
  });

  return BoardModel.fromArrayApi(boards);
}