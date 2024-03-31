import { forwardError } from '../../../utils/forwardError';
import { pb } from '../../pocketbase/setup';
import { collections } from '../../pocketbase/collections';
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
    .collection(collections.organisation_users)
    .create(orgUserData)
    .catch(forwardError(parseClientResponseError));
}
