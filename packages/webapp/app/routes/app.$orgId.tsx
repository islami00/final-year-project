import { json } from '@remix-run/react';
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

export async function clientLoader(args: ClientLoaderFunctionArgs) {
  const { params } = args;
  const user = await requireUser();
  const organisations = await requireOrganizations(user.id);
  const currentOrganisation = requireCurrentOrganisation(organisations, params);

  return json<AppLoaderData>({ user, organisations, currentOrganisation });
}

export default function AppOrgIdRoute() {
  const loadedData = useLoaderData<typeof clientLoader>();
  const { user, organisations, currentOrganisation } = loadedData;
  return (
    <AppShellRoot
      navbar
      user={user}
      organisations={organisations}
      currentOrganisation={currentOrganisation}
    >
      <Outlet />
    </AppShellRoot>
  );
}
