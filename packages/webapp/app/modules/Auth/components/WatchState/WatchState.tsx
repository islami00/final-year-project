import { useRevalidator } from '@remix-run/react';
import { pb } from '../../../../services/pocketbase/pocketbase.client';
import * as React from 'react';

export function WatchState() {
  const revalidate = useRevalidator();
  React.useEffect(() => {
    pb.authStore.onChange(() => {
      revalidate.revalidate();
    });
  }, []);
  return null;
}
