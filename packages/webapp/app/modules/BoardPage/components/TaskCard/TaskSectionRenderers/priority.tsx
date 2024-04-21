import { PriorityFlag } from '../../../../../components/PrioritySelect/PriorityFlag';
import { PriorityDictionary } from '../../../../../components/PrioritySelect/PrioritySelect.utils';
import { Priority } from '../../../../../models/Task.model';
import type { TaskSectionRenderers } from '../TaskCard.types';
import * as classes from './TaskSectionRenderers.styles';

export interface priorityProps {
  priority: Priority;
}

export function PriorityItem(props: priorityProps) {
  const { priority } = props;
  const { color } = PriorityDictionary[priority];
  return (
    <div className={classes.priorityRoot}>
      <PriorityFlag color={color} />
    </div>
  );
}

export const priorityRenderer: TaskSectionRenderers = (task) => {
  if (!task.priority) return null;
  return <PriorityItem priority={task.priority} />;
};
