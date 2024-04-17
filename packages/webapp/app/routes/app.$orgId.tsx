import { json, type ClientActionFunctionArgs } from '@remix-run/react';
import {
  useLoaderData,
  Outlet,
  type ClientLoaderFunctionArgs,
} from '@remix-run/react';
import { AppShellRoot } from '../components/AppShell/AppShellRoot';
import {
  requireCurrentOrganisation,
  requireOrganizations,
  requireUser,
} from '../services/pocketbase/auth';
import type { AppLoaderData } from '../types/app.types';
import { parseWithZod } from '@conform-to/zod';
import * as userSettingsForm from '../components/AppShell/UserSettings/userSettingsForm';
import { patchUserById } from '../services/queries/users/patchUserById';
import { catchPostSubmissionError } from '../utils/Form/catchPostSubmissionError';
import { getDepartmentsByOrg } from '../services/queries/department/getDepartmentsByOrg';

export async function clientLoader(args: ClientLoaderFunctionArgs) {
  const { params } = args;
  const user = await requireUser();
  const organisations = await requireOrganizations(user.id);
  const currentOrganisation = requireCurrentOrganisation(organisations, params);
  const departments = await getDepartmentsByOrg({
    orgId: params.orgId as string,
  });

  return json<AppLoaderData>({
    user,
    organisations,
    currentOrganisation,
    departments,
  });
}

export async function clientAction(args: ClientActionFunctionArgs) {
  const { request } = args;
  const formData = await request.formData();
  const submission = parseWithZod(formData, {
    schema: userSettingsForm.schema,
  });
  if (submission.status !== 'success') {
    return json(submission.reply());
  }
  const { value } = submission;

  try {
    await patchUserById({
      body: { dashboardOrganisation: value.dashboardOrganisation },
      id: value.userId,
    });
    return json(submission.reply({ resetForm: true }));
  } catch (error) {
    return catchPostSubmissionError(error, submission);
  }
}
export default function AppOrgIdRoute() {
  const loadedData = useLoaderData<typeof clientLoader>();
  const { user, organisations, currentOrganisation, departments } = loadedData;
  return (
    <AppShellRoot
      navbar
      user={user}
      organisations={organisations}
      currentOrganisation={currentOrganisation}
      departments={departments}
    >
      <Outlet />
    </AppShellRoot>
  );
}