import { forwardError } from '../../../utils/forwardError';
import { parseClientResponseError } from '../../../utils/parseClientResponseError';
import DepartmentModel, {
  DepartmentApi,
  Department,
} from '../../../models/Department.model';
import { collections } from '../../pocketbase/collections';
import { pb } from '../../pocketbase/setup';

interface GetDepartmentByIdArgs {
  deptId: string;
}
export async function getDepartmentById(
  args: GetDepartmentByIdArgs
): Promise<Department> {
  const { deptId } = args;
  const department = await pb
    .collection<DepartmentApi>(collections.department)
    .getOne(deptId)
    .catch(forwardError(parseClientResponseError));
  return DepartmentModel.fromApi(department);
}
