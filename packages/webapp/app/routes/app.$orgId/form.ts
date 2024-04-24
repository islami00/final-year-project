import { z } from 'zod';
import { ZodOf } from '../../models/types';
import type { User } from '../../models/User.model';

export enum AppOrgIdIntent {
  CREATE_DEPARTMENT = 'appOrgId/create-department',
  USER_SETTINGS = 'appOrgId/user-settings',
}
export interface CreateDepartmentData {
  organisationId: string;
  name: string;
  intent: AppOrgIdIntent.CREATE_DEPARTMENT;
}

export function createDepartmentDefaultData(
  organisationId: string
): CreateDepartmentData {
  return {
    organisationId,
    name: '',
    intent: AppOrgIdIntent.CREATE_DEPARTMENT,
  };
}

export const createDepartmentSchema = z.object({
  organisationId: z.string().min(1),
  name: z.string().min(1),
  intent: z.literal(AppOrgIdIntent.CREATE_DEPARTMENT),
}) satisfies ZodOf<CreateDepartmentData>;

export interface UserSettingsFormData {
  dashboardOrganisation: string | null;
  intent: AppOrgIdIntent.USER_SETTINGS;
  userId: string;
}
interface UserSettingsDefaultDataArgs {
  user: User;
}
export function userSettingsDefaultData(
  args: UserSettingsDefaultDataArgs
): UserSettingsFormData {
  const { user } = args;
  return {
    intent: AppOrgIdIntent.USER_SETTINGS,
    dashboardOrganisation: user.dashboardOrganisation,
    userId: user.id,
  };
}
export const userSettingsSchema = z.object({
  dashboardOrganisation: z.string().nullable(),
  intent: z.literal(AppOrgIdIntent.USER_SETTINGS),
  userId: z.string().min(1),
}) satisfies ZodOf<UserSettingsFormData>;

export const schema = z.union([userSettingsSchema, createDepartmentSchema]);
