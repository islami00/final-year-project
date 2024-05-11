import {
  redirect,
  unstable_defineClientLoader as defineClientLoader,
} from '@remix-run/react';

export const clientLoader = defineClientLoader(async () => redirect('/app'));

export default function IndexRoute() {
  return <div>Redirecting...</div>;
}
