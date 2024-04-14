import * as z from 'zod';
import Converter from './Converter.model';
import type { WrappedPBJSONField, ZodOf } from './types';
import type { JSONContent } from '@tiptap/react';

export interface TaskCreate {
  title: string;
  boardId: string;
  statusId: string;
  columnOrder: number;
}

export enum Priority {
  P0 = 'P0',
  P1 = 'P1',
  P2 = 'P2',
  P3 = 'P3',
}
export interface TaskApi {
  id: string;
  title: string;
  dueDate: string;
  isDueDateCompleted: boolean;
  statusId: string;
  priority: Priority | '';
  sprintPoints: number;
  columnOrder: number;

  description: WrappedPBJSONField<JSONContent | null> | null;
  boardId: string;
}

export interface Task {
  id: TaskApi['id'];
  title: TaskApi['title'];
  dueDate: Date | null;
  isDueDateCompleted: TaskApi['isDueDateCompleted'];
  statusId: TaskApi['statusId'];
  priority: Priority | null;
  sprintPoints: TaskApi['sprintPoints'];
  columnOrder: TaskApi['columnOrder'];
  description: TaskDescription;
  boardId: TaskApi['boardId'];
}

export type TaskDescription = WrappedPBJSONField<JSONContent | null>;
function normaliseDescription(v: unknown): TaskDescription {
  const val = v as TaskApi['description'];
  if (!val) {
    return { data: val };
  }
  return val;
}
export const taskDescriptionSchema: ZodOf<TaskDescription> = z.object({
  data: z.record(z.any()).nullable(),
});
const taskSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  dueDate: z.preprocess((v) => v || null, z.coerce.date().nullable()),

  isDueDateCompleted: z.boolean(),
  statusId: z.string().min(1),
  priority: z.preprocess((v) => v || null, z.nativeEnum(Priority).nullable()),
  sprintPoints: z.number(),
  columnOrder: z.number(),
  description: z.preprocess(normaliseDescription, taskDescriptionSchema),
  boardId: z.string(),
}) satisfies ZodOf<Task>;

class TaskConverter extends Converter<TaskApi, Task> {
  fromApi(from: TaskApi): Promise<Task> {
    return taskSchema.parseAsync(from);
  }
}

export default new TaskConverter();
