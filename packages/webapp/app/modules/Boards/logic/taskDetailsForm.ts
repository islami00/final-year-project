import { ZodOf } from '../../../models/types';
import { z } from 'zod';

export enum TaskDetailsIntent {
  TITLE = 'taskDetails/title',
  REMOVE_ASSIGNEE = 'taskDetails/remove_assignee',
  ADD_ASSIGNEE = 'taskDetails/add_assignee',
}
export interface TitleFormData {
  intent: TaskDetailsIntent.TITLE;
  title: string;
}
export interface AssigneesFormData {
  intent: TaskDetailsIntent.ADD_ASSIGNEE | TaskDetailsIntent.REMOVE_ASSIGNEE;
  assignee: string;
}
export const titleSchema = z.object({
  intent: z.literal(TaskDetailsIntent.TITLE),
  title: z.string().min(1),
}) satisfies ZodOf<TitleFormData>;
export const assigneesSchema = z.object({
  intent: z.union([
    z.literal(TaskDetailsIntent.ADD_ASSIGNEE),
    z.literal(TaskDetailsIntent.REMOVE_ASSIGNEE),
  ]),
  assignee: z.string().min(1),
}) satisfies ZodOf<AssigneesFormData>;

export type TaskDetailsFormData = TitleFormData | AssigneesFormData;
export const titleDefaultData = (title: string): TaskDetailsFormData => ({
  intent: TaskDetailsIntent.TITLE,
  title,
});
export const assigneeDefaultData = (): AssigneesFormData => ({
  intent: TaskDetailsIntent.ADD_ASSIGNEE,
  assignee: '',
});

export const schema = z.union([
  titleSchema,
  assigneesSchema,
]) satisfies ZodOf<TaskDetailsFormData>;
