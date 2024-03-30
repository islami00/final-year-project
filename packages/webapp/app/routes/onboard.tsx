import { AppShellRoot } from '../components/AppShell/AppShellRoot';

import { parseWithYup } from '@conform-to/yup';
import {
  json,
  redirect,
  useLoaderData,
  type ClientActionFunctionArgs,
} from '@remix-run/react';
import toast from 'react-hot-toast';
import { Onboard } from '../modules/Onboard/Onboard';
import type { OnboardLoaderData } from '../modules/Onboard/Onboard.types';
import * as onboardForm from '../modules/Onboard/logic/onboardForm';
import { requireNewbie, requireUser } from '../services/pocketbase/auth';
import { postCreateOrganisationForUser } from '../services/queries/organization/postCreateOrganisationForUser';
import { postLinkOrganisationToUser } from '../services/queries/organization/postLinkOrganisationUser';
import { castError } from '../utils/parseClientResponseError';

// loaders can only be called in routes.
export async function clientLoader() {
  const user = await requireUser();
  await requireNewbie(user.id);
  return json<OnboardLoaderData>({ user });
}

export async function clientAction(args: ClientActionFunctionArgs) {
  const { request } = args;

  const formData = await request.formData();
  const submission = parseWithYup(formData, {
    schema: onboardForm.schema,
  });

  if (submission.status !== 'success') {
    return json(submission.reply());
  }
  const { value } = submission;

  try {
    const org = await postCreateOrganisationForUser({
      userId: value.userId,
      organisationName: value.name,
    });

    await postLinkOrganisationToUser({
      userId: value.userId,
      organisationId: org.id,
    });

    return redirect('/');
  } catch (error) {
    const appError = castError(error);
    toast.error(appError.message);
    return json(submission.reply({ resetForm: false }));
  }
}
export default function OnboardRoute() {
  const { user } = useLoaderData<typeof clientLoader>();
  return (
    <AppShellRoot user={user}>
      <Onboard />
    </AppShellRoot>
  );
}
