import { AppShell } from '@mantine/core';
import {
  json,
  useLoaderData,
  type ClientActionFunctionArgs,
} from '@remix-run/react';
import { AppShellHeader } from '../components/AppShell/AppShellHeader';
import { Onboard } from '../modules/Onboard/Onboard';
import { requireUser } from '../services/pocketbase/auth';
import { AppShellMain } from '../components/AppShell/AppShell.styles';
import * as onboardForm from '../modules/Onboard/logic/onboardForm';
import { parseWithYup } from '@conform-to/yup';
import type { OnboardLoaderData } from '../modules/Onboard/Onboard.types';
import { postCreateOrganisationForUser } from '../services/queries/organization/postCreateOrganisationForUser';
import { postLinkOrganisationToUser } from '../services/queries/organization/postLinkOrganisationUser';
import { castError } from '../utils/parseClientResponseError';
import toast from 'react-hot-toast';

// loaders can only be called in routes.
export async function clientLoader() {
  const user = await requireUser();
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

    return json({ org });
  } catch (error) {
    const appError = castError(error);
    toast.error(appError.message);
    return json(submission.reply({ resetForm: false }));
  }
}
export default function OnboardRoute() {
  const { user } = useLoaderData<typeof clientLoader>();
  return (
    <AppShell header={{ offset: true, height: 59 }}>
      <AppShellHeader user={user} />

      <AppShellMain>
        <Onboard />
      </AppShellMain>
    </AppShell>
  );
}
