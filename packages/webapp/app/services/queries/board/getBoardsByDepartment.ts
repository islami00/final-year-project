import BoardModel, { Board, BoardApi } from '../../../models/Board.model';
import { collections } from '../../pocketbase/collections';
import { pb } from '../../pocketbase/setup';
import { Filter, Operators, parseFilters } from './Filter';

export interface GetBoardsByDepartmentArgs {
  deptId: string;

  q?: string;
}
export async function getBoardsByDepartment(
  args: GetBoardsByDepartmentArgs
): Promise<Board[]> {
  const { deptId, q } = args;

  const baseFilter: Filter[] = [
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
  ];
  const singlePart = parseFilters(baseFilter);
  const boards = await pb.collection<BoardApi>(collections.board).getFullList({
    filter: pb.filter(singlePart.template, singlePart.params),
  });

  return BoardModel.fromArrayApi(boards);
}
