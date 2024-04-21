import { PriorityFlag } from '../../../../../components/PrioritySelect/PriorityFlag';
import { Priority } from '../../../../../models/Task.model';
import type { TaskSectionRenderers } from '../TaskCard.types';
import * as classes from './TaskSectionRenderers.styles';
import { rendererKeys } from './TaskSectionRenderers.utils';
import { PriorityDictionary } from '../../../../../components/PrioritySelect/PrioritySelect.utils';

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
  return <PriorityItem key={rendererKeys.priority} priority={task.priority} />;
};
