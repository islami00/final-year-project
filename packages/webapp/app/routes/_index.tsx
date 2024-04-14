import { redirect } from '@remix-run/react';

export async function clientLoader() {
  return redirect('/app');
}

export default function IndexRoute() {
  return <div>Redirecting...</div>;
}
