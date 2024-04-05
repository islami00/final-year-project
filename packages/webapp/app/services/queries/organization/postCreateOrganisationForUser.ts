import { forwardError } from '../../../utils/forwardError';
import { parseClientResponseError } from '../../../utils/parseClientResponseError';
import OrganizationModel, {
  OrganizationApi,
  type Organization,
  type OrganizationCreate,
} from '../../../models/Organization.model';
import { pb } from '../../pocketbase/setup';
import { collections } from '../../pocketbase/collections';

export interface PostCreateOrganisationForUserArgs {
  userId: string;
  organisationName: string;
}
export async function postCreateOrganisationForUser(
  args: PostCreateOrganisationForUserArgs
): Promise<Organization> {
  const { userId, organisationName } = args;

  const orgData: OrganizationCreate = {
    name: organisationName,
    ownerId: userId,
  };

  const org = await pb
    .collection(collections.organisation)
    .create<OrganizationApi>(orgData)
    .catch(forwardError(parseClientResponseError));
  return OrganizationModel.fromApi(org);
}
