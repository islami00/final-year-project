import BoardModel, { Board, BoardApi } from '../../../models/Board.model';
import { collections } from '../../pocketbase/collections';
import { pb } from '../../pocketbase/setup';
import { FilterDataType, Operators, parseFilters } from '../../../utils/Filter';

export interface GetDepartmentBoardsArgs {
  deptId: string;

  q?: string | null;
}
export async function getDepartmentBoards(
  args: GetDepartmentBoardsArgs
): Promise<Board[]> {
  const { deptId, q = null } = args;

  const queryParams = parseFilters([
    {
      meta: {
        field: 'departmentId',
        label: 'deptId',
        dataType: FilterDataType.SELECT,
        id: '',
      },

      operator: Operators.EQ,
      value: deptId,
      values: null,
    },
    {
      meta: {
        field: 'name',
        label: 'name',
        dataType: FilterDataType.TEXT,
        id: '',
      },
      operator: Operators.CONTAINS,
      value: q,
      values: null,
    },
  ]);
  const boards = await pb.collection<BoardApi>(collections.board).getFullList({
    filter: pb.filter(queryParams.template, queryParams.params),
  });

  return BoardModel.fromArrayApi(boards);
}
