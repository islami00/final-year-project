import { Outlet } from '@remix-run/react';

export default function BoardRoute() {
  return (
    <>
      Board With outlet below for tasks
      <Outlet />
    </>
  );
}
