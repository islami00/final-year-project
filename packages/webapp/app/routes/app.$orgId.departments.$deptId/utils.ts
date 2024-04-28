import { ZodOf } from '../../models/types';
import { z } from 'zod';

export interface DepartmentIdParams {
  deptId: string;
  orgId: string;
}

export const departmentIdSchema: ZodOf<DepartmentIdParams> = z.object({
  deptId: z.string().min(1),
  orgId: z.string().min(1),
});
