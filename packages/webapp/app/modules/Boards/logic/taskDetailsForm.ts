import { ZodOf } from '../../../models/types';
import { z } from 'zod';
export enum TaskDetailsIntent {
  TITLE = 'title',
  ASSIGNEES = 'assignees',
}
export interface TitleFormData {
  intent: TaskDetailsIntent.TITLE;
  title: string;
}
export interface AssigneesFormData {
  intent: TaskDetailsIntent.ASSIGNEES;
  assignees: string[];
}
export const titleSchema = z.object({
  intent: z.literal(TaskDetailsIntent.TITLE),
  title: z.string().min(1),
}) satisfies ZodOf<TitleFormData>;
export const assigneesSchema = z.object({
  intent: z.literal(TaskDetailsIntent.ASSIGNEES),
  assignees: z.array(z.string().min(1)),
}) satisfies ZodOf<AssigneesFormData>;

export type TaskDetailsFormData = TitleFormData | AssigneesFormData;
export const createTitleDefault = (title: string): TaskDetailsFormData => {
  return {
    intent: TaskDetailsIntent.TITLE,
    title,
  };
};

export const taskDetailsForm = z.union([
  titleSchema,
  assigneesSchema,
]) satisfies ZodOf<TaskDetailsFormData>;
