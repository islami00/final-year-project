import { AppShell } from '@mantine/core';
import { json, useLoaderData } from '@remix-run/react';
import { AppShellHeader } from '../components/AppShell/AppShellHeader';
import { Onboard } from '../modules/Onboard/Onboard';
import { requireUser } from '../services/pocketbase/auth';
import { AppShellMain } from '../components/AppShell/AppShell.styles';

// loaders can only be called in routes.
export async function clientLoader() {
  const user = await requireUser();
  return json({ user });
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
