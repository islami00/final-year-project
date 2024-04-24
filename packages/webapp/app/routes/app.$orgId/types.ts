import type { ClientLoaderFunctionArgs } from '@remix-run/react';
import type { DepartmentWithBoard } from '../../models/DepartmentWithBoards.model';
import { Organization } from '../../models/Organization.model';
import { User } from '../../models/User.model';
import type { TypedResponse } from '@remix-run/node';

export interface AppLoaderData {
  user: User;
  organisations: Organization[];
  currentOrganisation: Organization;
  departments: DepartmentWithBoard[];
}
export type AppLoader = (
  args: ClientLoaderFunctionArgs
) => Promise<TypedResponse<AppLoaderData>>;
