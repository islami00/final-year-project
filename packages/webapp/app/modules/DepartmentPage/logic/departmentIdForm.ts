import { ZodOf } from '../../../models/types';
import { z } from 'zod';

export enum DepartmentIdFormIntent {
  NAME = 'departmentIdForm/name',
  DELETE_DEPARTMENT = 'departmentIdForm/deleteDepartment',
  CREATE_BOARD = 'departmentIdForm/createBoard',
}

export interface NameFormData {
  intent: DepartmentIdFormIntent.NAME;
  name: string;
  deptId: string;
}
export interface DeleteDepartmentFormData {
  intent: DepartmentIdFormIntent.DELETE_DEPARTMENT;
  deptId: string;
}
export interface CreateBoardFormData {
  intent: DepartmentIdFormIntent.CREATE_BOARD;
  deptId: string;
  name: string;
}

export function titleDefaultData(title: string): NameFormData {
  return {
    name: title,
    deptId: '',
    intent: DepartmentIdFormIntent.NAME,
  };
}
export function createBoardDefaultData(): CreateBoardFormData {
  return {
    name: '',
    deptId: '',
    intent: DepartmentIdFormIntent.CREATE_BOARD,
  };
}

export const titleSchema = z.object({
  intent: z.literal(DepartmentIdFormIntent.NAME),
  name: z.string().min(1),
  deptId: z.string().min(1),
}) satisfies ZodOf<NameFormData>;
export const deleteDepartmentSchema = z.object({
  intent: z.literal(DepartmentIdFormIntent.DELETE_DEPARTMENT),
  deptId: z.string().min(1),
}) satisfies ZodOf<DeleteDepartmentFormData>;
export const createBoardSchema = z.object({
  intent: z.literal(DepartmentIdFormIntent.CREATE_BOARD),
  deptId: z.string().min(1),
  name: z.string().min(1),
}) satisfies ZodOf<CreateBoardFormData>;

export const schema = z.union([
  titleSchema,
  deleteDepartmentSchema,
  createBoardSchema,
]);
