import { Outlet, json, useLoaderData } from '@remix-run/react';
import { AppShellRoot } from '../components/AppShell/AppShellRoot';
import { requireUser, requireOrganizations } from '../services/pocketbase/auth';
import type { AppLoaderData } from '../types/app.types';

export async function clientLoader() {
  const user = await requireUser();
  const organisations = await requireOrganizations(user.id);
  return json<AppLoaderData>({ user, organisations });
}

export default function AppLayoutRoute() {
  const loadedData = useLoaderData<typeof clientLoader>();
  const { user, organisations } = loadedData;
  return (
    <AppShellRoot navbar user={user} organisations={organisations}>
      <Outlet />
    </AppShellRoot>
  );
}
