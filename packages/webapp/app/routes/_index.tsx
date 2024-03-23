import { Button } from '@mantine/core';
import { defer } from '@remix-run/react';
import { requireUser } from '../services/pocketbase/auth.client';
import { logout } from '../services/queries/auth/logout';

// loaders can only be called in routes.
export async function clientLoader() {
  const user = requireUser();
  return defer({ user });
}

export default function Index() {
  return <Button onClick={logout}>Logout</Button>;
}
