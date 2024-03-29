import OrganizationModel, {
  OrganizationApi,
  type Organization,
} from '../../../models/Organization.model';
import { pb } from '../../pocketbase/setup';
import { collections } from '../utils';

interface IGetOrganizationsByUserArgs {
  userId: string;
}
export async function getOrganizationsByUser(
  args: IGetOrganizationsByUserArgs
): Promise<Organization[]> {
  const { userId } = args;
  // Get

  const record = await pb
    .collection<OrganizationApi>(collections.organisations)
    .getFullList(undefined, {
      filter: pb.filter(
        `organisations_users_via_organisationId.userId={:userId}`,
        { userId }
      ),
    });
  return OrganizationModel.fromArrayApi(record);
}
