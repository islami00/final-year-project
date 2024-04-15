import { forwardError } from '../../../utils/forwardError';
import { parseClientResponseError } from '../../../utils/parseClientResponseError';
import UserModel, { UserApi } from '../../../models/User.model';
import { collections } from '../../pocketbase/collections';
import { pb } from '../../pocketbase/setup';

export interface PatchUserByIdBody {
  dashboardOrganisation?: string | null;
}
export interface PatchUserByIdArgs {
  body: PatchUserByIdBody;
  id: string;
}
export async function patchUserById(args: PatchUserByIdArgs) {
  const { id, body } = args;

  const record = await pb
    .collection<UserApi>(collections.users)
    .update(id, body)
    .catch(forwardError(parseClientResponseError));

  return UserModel.fromApi(record);
}
