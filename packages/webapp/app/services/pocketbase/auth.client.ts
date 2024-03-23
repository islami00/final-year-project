import { redirect } from '@remix-run/react';
import { AuthModes } from '../../modules/Auth/Auth.types';
import { pb } from './pocketbase.client';

export function requireUser() {
  if (!pb.authStore.isValid) {
    const defaultMode: AuthModes = 'login';
    throw redirect(`/auth/${defaultMode}`);
  }

  return pb.authStore.model;
}
export function requireAnonymous() {
  if (pb.authStore.isValid) {
    throw redirect(`/`);
  }
}
