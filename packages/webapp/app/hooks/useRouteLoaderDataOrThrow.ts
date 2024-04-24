import { useRouteLoaderData } from '@remix-run/react';
import { AppInternalError } from '../utils/AppInternalError';
import type { SerializeFrom } from '@remix-run/node';

export function useRouteLoaderDataOrThrow<T>(
  routeId: string
): SerializeFrom<T> {
  const data = useRouteLoaderData<T>(routeId);
  if (!data) {
    throw new AppInternalError(`${routeId} loader data missing`);
  }

  return data;
}
