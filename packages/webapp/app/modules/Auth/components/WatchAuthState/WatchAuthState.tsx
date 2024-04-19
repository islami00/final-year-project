import { useRevalidator } from '@remix-run/react';
import { pb } from '../../../../services/pocketbase/setup';
import * as React from 'react';

export function WatchAuthState() {
  const revalidate = useRevalidator();
  React.useEffect(() => {
    const unsub = pb.authStore.onChange(() => {
      revalidate.revalidate();
    });
    return () => {
      unsub();
    };
  }, []);
  return null;
}
