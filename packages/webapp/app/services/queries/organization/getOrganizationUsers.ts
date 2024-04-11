import { UserApi } from '../../../models/User.model';
import { collections } from '../../pocketbase/collections';
import { pb } from '../../pocketbase/setup';
import UserModel from '../../../models/User.model';

interface GetOrganisationUsersArgs {
  organisationId: string;
}
export async function getOrganisationUsers(args: GetOrganisationUsersArgs) {
  const { organisationId } = args;
  const record = await pb.collection<UserApi>(collections.users).getFullList({
    filter: pb.filter(
      `${collections.organisation_users}_via_userId.organisationId ?= {:organisationId}`,
      { organisationId }
    ),
  });

  return UserModel.fromArrayApi(record);
}
