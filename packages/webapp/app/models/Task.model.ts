import * as z from 'zod';
import Converter from './Converter.model';
import type { ZodOf } from './types';

export interface TaskCreate {
  title: string;
  boardId: string;
  statusId: string;
}

enum Priority {
  P0 = 'p0',
  P1 = 'p1',
  P2 = 'p2',
  P3 = 'p3',
}
export interface TaskApi {
  title: string;
  dueDate: string;
  isDueDateCompleted: boolean;
  statusId: string;
  priority: Priority | '';
  sprintPoints: number;
  columnOrder: number;

  description: NonNullable<unknown> | null;
  boardId: string;
}

export interface Task {
  title: string;
  dueDate: Date | null;
  isDueDateCompleted: boolean;
  statusId: string;
  priority: Priority | null;
  sprintPoints: number;
  columnOrder: number;
  description: TaskApi['description'];
  boardId: string;
}

const taskSchema = z.object({
  title: z.string().min(1),
  dueDate: z.preprocess((v) => v || null, z.coerce.date().nullable()),

  isDueDateCompleted: z.boolean(),
  statusId: z.string().min(1),
  priority: z.preprocess((v) => v || null, z.nativeEnum(Priority).nullable()),
  sprintPoints: z.number(),
  columnOrder: z.number(),
  description: z.record(z.any()).nullable(),
  boardId: z.string(),
}) satisfies ZodOf<Task>;

class TaskConverter extends Converter<TaskApi, Task> {
  fromApi(from: TaskApi): Promise<Task> {
    return taskSchema.parseAsync(from);
  }
}

export default new TaskConverter();
