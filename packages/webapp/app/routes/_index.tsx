import { AppShell } from '@mantine/core';
import { Outlet, json, useLoaderData } from '@remix-run/react';
import { requireUser } from '../services/pocketbase/auth';
import { AppShellHeader } from '../components/AppShell/AppShellHeader';

// loaders can only be called in routes.
export async function clientLoader() {
  const user = requireUser();
  return json({ user });
}

export default function Index() {
  const { user } = useLoaderData<typeof clientLoader>();
  return (
    <AppShell
      header={{ offset: true, height: 59 }}
      navbar={{ width: 301, breakpoint: 'lg' }}
    >
      <AppShellHeader user={user} />
      <>
        {/* Only show navigation if onboarded */}
        <AppShell.Navbar>Nav</AppShell.Navbar>
        <AppShell.Main>
          <Outlet />
        </AppShell.Main>
      </>
    </AppShell>
  );
}
