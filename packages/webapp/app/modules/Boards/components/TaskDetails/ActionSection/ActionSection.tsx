import { Task } from '../../../../../models/Task.model';
import { useCurrentPriorityValue } from '../../../logic/useCurrentPriorityValue';
import {
  AssigneeSection,
  AssigneeSectionProps,
} from '../AssigneeSection/AssigneeSection';
import { PrioritySection } from '../PrioritySection/PrioritySection';
import { ActionItem } from './ActionItem';
import * as classes from './ActionSection.styles';

type FromAssignee = Pick<
  AssigneeSectionProps,
  'allUsers' | 'optimisticAssignees' | 'selected'
>;

export interface ActionSectionProps extends FromAssignee {
  task: Task;
}
export function ActionSection(props: ActionSectionProps) {
  const { allUsers, optimisticAssignees: newAssignees, selected, task } = props;

  const { currentPriority } = useCurrentPriorityValue(task.id, task.priority);
  return (
    <div className={classes.actions}>
      {newAssignees.length > 0 ? (
        <ActionItem title="Assignees">
          <AssigneeSection
            allUsers={allUsers}
            optimisticAssignees={newAssignees}
            selected={selected}
          />
        </ActionItem>
      ) : null}
      {currentPriority ? (
        <ActionItem title="Priority">
          <PrioritySection priority={currentPriority} taskId={task.id} />
        </ActionItem>
      ) : null}
    </div>
  );
}
