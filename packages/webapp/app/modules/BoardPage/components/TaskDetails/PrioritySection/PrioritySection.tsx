import { Priority } from '../../../../../models/Task.model';
import { TaskPriority } from './TaskPriority';
import { PriorityButton } from './PriorityButton';

export interface PrioritySectionProps {
  /** Optimistic priority value */
  priority: Priority | null;
  taskId: string;
}

export function PrioritySection(props: PrioritySectionProps) {
  const { priority, taskId } = props;
  return (
    <TaskPriority
      taskId={taskId}
      target={(ctx) => (
        <PriorityButton onClick={ctx.onClick} currentValue={priority} />
      )}
    />
  );
}
