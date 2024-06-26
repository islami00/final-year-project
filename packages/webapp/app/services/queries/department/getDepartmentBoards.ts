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

      operatorChip: { operator: Operators.EQ, label: '' },
      value: deptId,
      values: null,
      id: '0',
    },
    {
      meta: {
        field: 'name',
        label: 'name',
        dataType: FilterDataType.TEXT,
        id: '',
      },
      operatorChip: { operator: Operators.CONTAINS, label: '' },
      value: q,
      values: null,
      id: '1',
    },
  ]);
  const boards = await pb.collection<BoardApi>(collections.board).getFullList({
    filter: pb.filter(queryParams.template, queryParams.params),
  });

  return BoardModel.fromArrayApi(boards);
}
