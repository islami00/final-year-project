import { Priority } from '../../../models/Task.model';
import { ZodOf } from '../../../models/types';
import { z } from 'zod';

export enum TaskDetailsIntent {
  TITLE = 'taskDetails/title',
  REMOVE_ASSIGNEE = 'taskDetails/remove_assignee',
  ADD_ASSIGNEE = 'taskDetails/add_assignee',
  PRIORITY = 'taskDetails/priority',
  SPRINT_POINTS = 'taskDetails/sprint_points',
}
export interface TitleFormData {
  intent: TaskDetailsIntent.TITLE;
  title: string;
}
export interface AssigneesFormData {
  intent: TaskDetailsIntent.ADD_ASSIGNEE | TaskDetailsIntent.REMOVE_ASSIGNEE;
  assignee: string;
}
export interface PriorityFormData {
  intent: TaskDetailsIntent.PRIORITY;
  priority: Priority;
}

export interface SprintPointsFormData {
  intent: TaskDetailsIntent.SPRINT_POINTS;
  sprintPoints: number;
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

export type TaskDetailsFormData =
  | TitleFormData
  | AssigneesFormData
  | PriorityFormData
  | SprintPointsFormData;

export const titleDefaultData = (title: string): TaskDetailsFormData => ({
  intent: TaskDetailsIntent.TITLE,
  title,
});
export const assigneeDefaultData = (): AssigneesFormData => ({
  intent: TaskDetailsIntent.ADD_ASSIGNEE,
  assignee: '',
});

export const sprintPointsDefaultData = (
  sprintPoints: number
): SprintPointsFormData => ({
  intent: TaskDetailsIntent.SPRINT_POINTS,
  sprintPoints,
});

export const schema = z.union([
  titleSchema,
  assigneesSchema,
  prioritySchema,
  sprintPointsSchema,
]) satisfies ZodOf<TaskDetailsFormData>;
