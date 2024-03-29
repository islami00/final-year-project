import { forwardError } from '../../../utils/forwardError';
import { pb } from '../../pocketbase/setup';
import { collections } from '../utils';
import { parseClientResponseError } from '../../../utils/parseClientResponseError';

interface PostLinkOrganisationToUserArgs {
  userId: string;
  organisationId: string;
}

export async function postLinkOrganisationToUser({
  userId,
  organisationId,
}: PostLinkOrganisationToUserArgs) {
  const orgUserData = {
    userId,
    organisationId,
  };

  await pb
    .collection(collections.organisations_users)
    .create(orgUserData)
    .catch(forwardError(parseClientResponseError));
}
