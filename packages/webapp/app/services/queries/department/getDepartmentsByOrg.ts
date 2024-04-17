import { Department, DepartmentApi } from '../../../models/Department.model';
import { forwardError } from '../../../utils/forwardError';
import { parseClientResponseError } from '../../../utils/parseClientResponseError';
import { collections } from '../../pocketbase/collections';
import { pb } from '../../pocketbase/setup';

export interface GetDepartmentsByOrgArgs {
  orgId: string;
}
export async function getDepartmentsByOrg(
  args: GetDepartmentsByOrgArgs
): Promise<Department[]> {
  const { orgId } = args;
  const data = await pb
    .collection<DepartmentApi>(collections.department)
    .getFullList({
      sort: 'name',
      filter: pb.filter(`organisationId = {:orgId}`, { orgId }),
    })
    .catch(forwardError(parseClientResponseError));

  return data;
}
