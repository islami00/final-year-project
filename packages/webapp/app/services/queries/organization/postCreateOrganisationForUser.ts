import { forwardError } from '../../../utils/forwardError';
import { parseClientResponseError } from '../../../utils/parseClientResponseError';
import OrganizationModel, {
  OrganizationApi,
  type Organization,
} from '../../../models/Organization.model';
import { pb } from '../../pocketbase/setup';
import { collections } from '../utils';

export interface PostCreateOrganisationForUserArgs {
  userId: string;
  organisationName: string;
}
export async function postCreateOrganisationForUser(
  args: PostCreateOrganisationForUserArgs
): Promise<Organization> {
  const { userId, organisationName } = args;

  const orgData: Omit<OrganizationApi, 'id'> = {
    name: organisationName,
    ownerId: userId,
  };

  // Create org and link it to the user
  const org = await pb
    .collection(collections.organisations)
    .create<OrganizationApi>(orgData)
    .catch(forwardError(parseClientResponseError));
  return OrganizationModel.fromApi(org);
}
