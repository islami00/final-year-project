import DepartmentModel, {
  DepartmentApi,
  Department,
  type DepartmentCreate,
} from '../../../models/Department.model';
import { pb } from '../../pocketbase/setup';
import { collections } from '../../pocketbase/collections';
import { forwardError } from '../../../utils/ErrorHandling/forwardError';
import { parseClientResponseError } from '../../../utils/ErrorHandling/parseClientResponseError';

export interface PostCreateDepartmentArgs {
  body: DepartmentCreate;
}

export async function postCreateDepartment(
  args: PostCreateDepartmentArgs
): Promise<Department> {
  const { body } = args;

  const createDepartment: DepartmentCreate = {
    name: body.name,
    organisationId: body.organisationId,
  };

  const department = await pb
    .collection<DepartmentApi>(collections.department)
    .create(createDepartment)
    .catch(forwardError(parseClientResponseError));

  return DepartmentModel.fromApi(department);
}
