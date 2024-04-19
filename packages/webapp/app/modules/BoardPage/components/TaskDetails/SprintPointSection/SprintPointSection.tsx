import { TargetCtx } from '../../../../../components/Combobox/Combobox.utils';
import { SprintPointButton } from './SprintPointButton';
import { TaskSprintPoint, type TaskSprintPointProps } from './TaskSprintPoint';

interface SprintPointSectionProps {
  taskId: TaskSprintPointProps['taskId'];
  value: number;
}
export function SprintPointSection(props: SprintPointSectionProps) {
  const { taskId, value } = props;
  return (
    <TaskSprintPoint
      taskId={taskId}
      target={(ctx: TargetCtx) => (
        <SprintPointButton value={value} onClick={ctx.onClick} />
      )}
    />
  );
}
