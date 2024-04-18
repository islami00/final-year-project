import { ZodOf } from '../../../models/types';
import { z } from 'zod';

export enum DepartmentIdFormIntent {
  NAME = 'departmentIdForm/name',
}

export interface NameFormData {
  intent: DepartmentIdFormIntent.NAME;
  name: string;
  deptId: string;
}

export function titleDefaultData(title: string): NameFormData {
  return {
    name: title,
    deptId: '',
    intent: DepartmentIdFormIntent.NAME,
  };
}

export const titleSchema = z.object({
  intent: z.literal(DepartmentIdFormIntent.NAME),
  name: z.string().min(1),
  deptId: z.string().min(1),
}) satisfies ZodOf<NameFormData>;

export const schema = titleSchema;
