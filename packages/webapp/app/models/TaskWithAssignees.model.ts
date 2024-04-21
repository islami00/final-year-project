import { z } from 'zod';
import Converter from './Converter.model';
import type { Task, TaskApi } from './Task.model';
import { taskSchema } from './Task.model';
import type { User, UserApi } from './User.model';
import { userSchema } from './User.model';
import type { ZodOf } from './types';

/** Partial that gets returned when we expand to assigneeId */
export interface TaskWithAssigneeApi extends TaskApi {
  expand?: {
    task_assignee_via_taskId: {
      expand: {
        assigneeId: UserApi;
      };
    }[];
  };
}

export interface TaskWithAssignees extends Task {
  assignees: User[];
}
const taskWithAssigneeSchema = taskSchema
  .extend({
    expand: z
      .object({
        task_assignee_via_taskId: z.array(
          z.object({ expand: z.object({ assigneeId: userSchema }) })
        ),
      })
      .optional(),
  })
  .transform((value) => {
    const { expand, ...rest } = value;
    const assignees = expand?.task_assignee_via_taskId.map(
      (each) => each.expand.assigneeId
    );
    return {
      ...rest,
      assignees: assignees || [],
    };
  }) satisfies ZodOf<TaskWithAssignees, TaskWithAssigneeApi>;
class TaskWithAssigneeConverter extends Converter<
  TaskWithAssigneeApi,
  TaskWithAssignees
> {
  async fromApi(from: TaskWithAssigneeApi): Promise<TaskWithAssignees> {
    return taskWithAssigneeSchema.parseAsync(from);
  }
}

export default new TaskWithAssigneeConverter();
