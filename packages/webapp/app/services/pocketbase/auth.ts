import { redirect } from '@remix-run/react';
import { AuthModes } from '../../modules/Auth/Auth.types';
import { pb } from './setup';
import { AppError } from '../../utils/AppError';
import { User } from '../../models/User.model';

export function requireUser(): User {
  if (!pb.authStore.isValid) {
    const defaultMode: AuthModes = 'login';
    throw redirect(`/auth/${defaultMode}`);
  }
  if (!pb.authStore.model) {
    // Todo: Use error codes to match these
    throw new AppError('User not found');
  }
  return pb.authStore.model as User;
}
export function requireAnonymous() {
  if (pb.authStore.isValid) {
    throw redirect(`/`);
  }
}
