import DepartmentModel, {
  DepartmentApi,
} from '../../../models/Department.model';
import { collections } from '../../pocketbase/collections';
import { pb } from '../../pocketbase/setup';
import { forwardError } from '../../../utils/forwardError';
import { parseClientResponseError } from '../../../utils/parseClientResponseError';

interface PatchdepartmentByIdBody {
  name?: string;
}
interface PatchDepartmentByIdArgs {
  body: PatchdepartmentByIdBody;
  deptId: string;
}
export async function patchDepartmentById(args: PatchDepartmentByIdArgs) {
  const { body, deptId } = args;

  const record = await pb
    .collection<DepartmentApi>(collections.department)
    .update(deptId, body)
    .catch(forwardError(parseClientResponseError));

  return DepartmentModel.fromApi(record);
}
