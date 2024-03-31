import Converter from './Converter.model';
import * as yup from 'yup';

export type OrganizationApi = Organization;
export interface Organization {
  id: string;
  name: string;
  ownerId: string;
}
export interface OrganizationCreate {
  name: string;
  ownerId: string;
}
const organizationSchema: yup.ObjectSchema<Organization> = yup.object({
  id: yup.string().required(),
  name: yup.string().required(),
  ownerId: yup.string().required(),
});
class OrganizationConverter extends Converter<OrganizationApi, Organization> {
  async fromApi(from: OrganizationApi): Promise<Organization> {
    const result = await organizationSchema.validate(from, {
      stripUnknown: true,
    });
    return result;
  }
}

export default new OrganizationConverter();
