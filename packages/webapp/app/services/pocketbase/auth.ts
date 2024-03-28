import { redirect } from '@remix-run/react';
import { AuthModes } from '../../modules/Auth/Auth.types';
import { pb } from './setup';
import { AppError } from '../../utils/AppError';
import UserModel, { User, type UserApi } from '../../models/User.model';
import type { Organization } from '../../models/Organization.model';
import { getOrganizationsByUser } from '../queries/organization/getOrganizationsByUser';

export function requireUser(): Promise<User> {
  if (!pb.authStore.isValid) {
    const defaultMode: AuthModes = 'login';
    throw redirect(`/auth/${defaultMode}`);
  }
  if (!pb.authStore.model) {
    // Todo: Use error codes to match these
    throw new AppError('User not found');
  }
  return UserModel.fromApi(pb.authStore.model as UserApi);
}
export async function requireOrganizations(
  userId: string
): Promise<Organization[]> {
  const orgs = await getOrganizationsByUser({ userId });
  if (orgs.length === 0) {
    throw redirect('/onboard');
  }
  return orgs;
}
export function requireAnonymous() {
  if (pb.authStore.isValid) {
    throw redirect(`/`);
  }
}
