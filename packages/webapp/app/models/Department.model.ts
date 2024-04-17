import { z } from 'zod';
import Converter from './Converter.model';
import type { ZodOf } from './types';

export type DepartmentApi = Department;
export interface Department {
  id: string;
  name: string;
  organisationId: string;
}

const departmentSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  organisationId: z.string().min(1),
}) satisfies ZodOf<Department>;

class DepartmentConverter extends Converter<DepartmentApi, Department> {
  async fromApi(from: DepartmentApi): Promise<Department> {
    return departmentSchema.parseAsync(from);
  }
}

export default new DepartmentConverter();
