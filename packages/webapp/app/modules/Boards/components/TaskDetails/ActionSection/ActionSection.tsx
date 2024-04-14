import { Task } from '../../../../../models/Task.model';
import { useBoardIdLoaderData } from '../../../logic/useBoardIdLoaderData';
import { useCurrentPriorityValue } from '../../../logic/useCurrentPriorityValue';
import { useCurrentSprintPointValue } from '../../../logic/useCurrentSprintPointValue';
import {
  AssigneeSection,
  AssigneeSectionProps,
} from '../AssigneeSection/AssigneeSection';
import { PrioritySection } from '../PrioritySection/PrioritySection';
import { SprintPointSection } from '../SprintPointSection/SprintPointSection';
import { StatusSection } from '../StatusSection/StatusSection';
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
  const { allUsers, optimisticAssignees, selected, task } = props;

  const currentPriority = useCurrentPriorityValue({
    taskId: task.id,
    apiValue: task.priority,
  });
  const sprintPoint = useCurrentSprintPointValue({
    apiValue: task.sprintPoints,
    taskId: task.id,
  });
  const boardIdData = useBoardIdLoaderData();

  return (
    <div className={classes.actions}>
      <ActionItem title="Status">
        <StatusSection
          taskId={task.id}
          statuses={boardIdData.statuses.allStatuses}
          defaultValue={task.statusId}
        />
      </ActionItem>
      {optimisticAssignees.length > 0 ? (
        <ActionItem title="Assignees">
          <AssigneeSection
            allUsers={allUsers}
            optimisticAssignees={optimisticAssignees}
            selected={selected}
          />
        </ActionItem>
      ) : null}
      {currentPriority ? (
        <ActionItem title="Priority">
          <PrioritySection priority={currentPriority} taskId={task.id} />
        </ActionItem>
      ) : null}
      {sprintPoint ? (
        <ActionItem title="Sprint Points">
          <SprintPointSection value={sprintPoint} taskId={task.id} />
        </ActionItem>
      ) : null}
    </div>
  );
}
