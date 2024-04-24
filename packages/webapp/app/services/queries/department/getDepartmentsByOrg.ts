import DepartmentWithBoardsModel, {
  DepartmentWithBoard,
  type DepartmentWithBoardApi,
} from '../../../models/DepartmentWithBoards.model';
import { forwardError } from '../../../utils/forwardError';
import { parseClientResponseError } from '../../../utils/parseClientResponseError';
import { collections } from '../../pocketbase/collections';
import { pb } from '../../pocketbase/setup';

export interface GetDepartmentsByOrgArgs {
  orgId: string;
}
export async function getDepartmentsByOrg(
  args: GetDepartmentsByOrgArgs
): Promise<DepartmentWithBoard[]> {
  const { orgId } = args;
  const data = await pb
    .collection<DepartmentWithBoardApi>(collections.department)
    .getFullList({
      sort: 'created',
      filter: pb.filter(`organisationId = {:orgId}`, { orgId }),
      expand: 'board_via_departmentId',
    })
    .catch(forwardError(parseClientResponseError));

  return DepartmentWithBoardsModel.fromArrayApi(data);
}
