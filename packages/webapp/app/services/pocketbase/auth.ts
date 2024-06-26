import { generatePath, redirect, type Params } from '@remix-run/react';
import { AuthModes } from '../../modules/Auth/Auth.types';
import { pb } from './setup';
import { AppError, appErrorCodes } from '../../utils/ErrorHandling/AppError';
import UserModel, { User, type UserApi } from '../../models/User.model';
import type { Organization } from '../../models/Organization.model';
import { getOrganizationsByUser } from '../queries/organization/getOrganizationsByUser';
import { logout } from '../queries/auth/logout';
import { routeConfig } from '../../utils/routeConfig';

export async function requireUser(): Promise<User> {
  if (!pb.authStore.isValid) {
    const defaultMode: AuthModes = 'login';
    throw redirect(`/auth/${defaultMode}`);
  }
  if (!pb.authStore.model) {
    throw new AppError(appErrorCodes.NOT_FOUND, 'User not found');
  }
  try {
    // Todo: Use a more permissive model for auth to ensure users don't get logged out on rollouts
    const user = await UserModel.fromApi(pb.authStore.model as UserApi);
    return user;
  } catch (error) {
    // If this fails, it's likely the cached model is wrong.
    await logout();
    throw error;
  }
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
export async function requireNewbie(userId: string) {
  const orgs = await getOrganizationsByUser({ userId });
  if (orgs.length > 0) {
    throw redirect('/');
  }
}

export function requireCurrentOrganisation(
  organisations: Organization[],
  params: Params<string>
) {
  const currentOrganisation = organisations.find(
    (each) => each.id === params.orgId
  );
  if (!currentOrganisation) {
    const orgId = organisations[0].id;
    throw redirect(
      generatePath(routeConfig.org.param, {
        orgId: orgId,
      })
    );
  }
  return currentOrganisation;
}
