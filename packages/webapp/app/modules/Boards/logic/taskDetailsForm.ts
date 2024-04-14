import type { JSONContent } from '@tiptap/react';
import {
  Priority,
  taskDescriptionSchema,
  type Task,
} from '../../../models/Task.model';
import { ZodOf, type WrappedPBJSONField } from '../../../models/types';
import { z } from 'zod';

export enum TaskDetailsIntent {
  TITLE = 'taskDetails/title',
  REMOVE_ASSIGNEE = 'taskDetails/remove_assignee',
  ADD_ASSIGNEE = 'taskDetails/add_assignee',
  PRIORITY = 'taskDetails/priority',
  SPRINT_POINTS = 'taskDetails/sprint_points',
  DESCRIPTION = 'taskDetails/description',
  STATUS = 'taskDetails/status',
}

type JSONPrimitive = string | number | boolean;
interface BaseForm {
  // Index for Remix to be happy
  [key: string]: JSONPrimitive;
}
export interface TitleFormData extends BaseForm {
  intent: TaskDetailsIntent.TITLE;
  title: string;
}
export interface AssigneesFormData extends BaseForm {
  intent: TaskDetailsIntent.ADD_ASSIGNEE | TaskDetailsIntent.REMOVE_ASSIGNEE;
  assignee: string;
}
export interface PriorityFormData extends BaseForm {
  intent: TaskDetailsIntent.PRIORITY;
  priority: Priority;
}

export interface SprintPointsFormData extends BaseForm {
  intent: TaskDetailsIntent.SPRINT_POINTS;
  sprintPoints: number;
}
export interface DescriptionFormData {
  intent: TaskDetailsIntent.DESCRIPTION;
  description: WrappedPBJSONField<JSONContent | null>;
}
export interface DescriptionFormDataSent extends BaseForm {
  intent: TaskDetailsIntent.DESCRIPTION;
  description: string;
}
export interface StatusFormData extends BaseForm {
  intent: TaskDetailsIntent.STATUS;
  statusId: string;
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

export const prioritySchema = z.object({
  intent: z.literal(TaskDetailsIntent.PRIORITY),
  priority: z.nativeEnum(Priority),
}) satisfies ZodOf<PriorityFormData>;

export const sprintPointsSchema = z.object({
  intent: z.literal(TaskDetailsIntent.SPRINT_POINTS),
  sprintPoints: z.number(),
}) satisfies ZodOf<SprintPointsFormData>;

function safeJSONParse(v: unknown) {
  if (typeof v !== 'string') return v;
  return JSON.parse(v);
}
export const descriptionSchema = z.object({
  intent: z.literal(TaskDetailsIntent.DESCRIPTION),
  description: z.preprocess(safeJSONParse, taskDescriptionSchema),
}) satisfies ZodOf<DescriptionFormData>;
export const statusSchema = z.object({
  intent: z.literal(TaskDetailsIntent.STATUS),
  statusId: z.string(),
}) satisfies ZodOf<StatusFormData>;

export type TaskDetailsFormData =
  | TitleFormData
  | AssigneesFormData
  | PriorityFormData
  | SprintPointsFormData
  | DescriptionFormData
  | StatusFormData;

export const titleDefaultData = (title: string): TitleFormData => ({
  intent: TaskDetailsIntent.TITLE,
  title,
});

export const descriptionDefaultData = (
  description: Task['description']
): DescriptionFormData => ({
  intent: TaskDetailsIntent.DESCRIPTION,
  description,
});
export const schema = z.union([
  titleSchema,
  assigneesSchema,
  prioritySchema,
  sprintPointsSchema,
  descriptionSchema,
  statusSchema,
]) satisfies ZodOf<TaskDetailsFormData>;
