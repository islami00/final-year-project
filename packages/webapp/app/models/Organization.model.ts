import { z } from 'zod';
import Converter from './Converter.model';
import type { ZodOf } from './types';

export type OrganizationApi = Organization;
export interface Organization {
  id: string;
  name: string;
  ownerId: string;
  logo: string;
}
export interface OrganizationCreate {
  name: string;
  ownerId: string;
}
const organizationSchema: ZodOf<Organization> = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  ownerId: z.string().min(1),
  logo: z.string(),
});
class OrganizationConverter extends Converter<OrganizationApi, Organization> {
  async fromApi(from: OrganizationApi): Promise<Organization> {
    const result = await organizationSchema.parseAsync(from);
    return result;
  }
}

export default new OrganizationConverter();
