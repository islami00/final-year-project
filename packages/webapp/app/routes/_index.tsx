import { redirect, unstable_defineClientLoader } from '@remix-run/react';

export const clientLoader = unstable_defineClientLoader(async () =>
  redirect('/app')
);

export default function IndexRoute() {
  return <div>Redirecting...</div>;
}
