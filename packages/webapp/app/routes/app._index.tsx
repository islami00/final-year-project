import { redirect } from '@remix-run/react';

export async function clientLoader() {
  return redirect('/app/default');
}

export default function AppLayoutRoute() {
  return <div>Redirecting...</div>;
}
