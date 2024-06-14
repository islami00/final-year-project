import { forwardError } from '../../../utils/ErrorHandling/forwardError';
import { parseClientResponseError } from '../../../utils/ErrorHandling/parseClientResponseError';
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
