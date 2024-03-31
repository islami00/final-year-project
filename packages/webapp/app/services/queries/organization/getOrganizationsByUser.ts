import OrganizationModel, {
  OrganizationApi,
  type Organization,
} from '../../../models/Organization.model';
import { pb } from '../../pocketbase/setup';
import { collections } from '../../pocketbase/collections';

interface IGetOrganizationsByUserArgs {
  userId: string;
}
export async function getOrganizationsByUser(
  args: IGetOrganizationsByUserArgs
): Promise<Organization[]> {
  const { userId } = args;
  // Get

  const record = await pb
    .collection<OrganizationApi>(collections.organisation)
    .getFullList(undefined, {
      filter: pb.filter(
        `${collections.organisation_users}_via_organisationId.userId={:userId}`,
        { userId }
      ),
    });
  return OrganizationModel.fromArrayApi(record);
}
