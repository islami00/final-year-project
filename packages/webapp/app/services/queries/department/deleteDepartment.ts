import { forwardError } from '../../../utils/forwardError';
import { parseClientResponseError } from '../../../utils/parseClientResponseError';
import { collections } from '../../pocketbase/collections';
import { pb } from '../../pocketbase/setup';

interface DeleteDepartmentArgs {
  deptId: string;
}
export async function deleteDepartment(
  args: DeleteDepartmentArgs
): Promise<void> {
  const { deptId } = args;

  await pb
    .collection(collections.department)
    .delete(deptId)
    .catch(forwardError(parseClientResponseError));
}
