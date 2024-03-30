import { Outlet, json, useLoaderData } from '@remix-run/react';
import { AppShellRoot } from '../components/AppShell/AppShellRoot';
import { requireOrganizations, requireUser } from '../services/pocketbase/auth';

// loaders can only be called in routes.
export async function clientLoader() {
  const user = await requireUser();
  const organisations = await requireOrganizations(user.id);
  return json({ user, organisations: organisations });
}

export default function Index() {
  const { user, organisations } = useLoaderData<typeof clientLoader>();
  return (
    <AppShellRoot navbar user={user} organisations={organisations}>
      <Outlet />
    </AppShellRoot>
  );
}
