import type { Department } from '../models/Department.model';
import { Organization } from '../models/Organization.model';
import { User } from '../models/User.model';

export interface AppLoaderData {
  user: User;
  organisations: Organization[];
  currentOrganisation: Organization;
  departments: Department[];
}
