import { Icon } from '../../../../../components/Icon/Icon';
import { Task } from '../../../../../models/Task.model';

import {
  type ApplyOptimisticAssigneeResult,
  type UseOptimisticAssigneesArgs,
} from '../../../logic/useOptimisticAssignees';
import { TaskAssignee } from '../TaskAssignee';
import { TaskPriority } from '../PrioritySection/TaskPriority';
import { SectionGroup } from '../SectionGroup/SectionGroup';
import { RightSectionButton } from './RightSectionButton';
import * as classes from './TaskDetailsRightSection.styles';

interface TaskDetailsRightSectionProps {
  selected: ApplyOptimisticAssigneeResult['selected'];
  allUsers: UseOptimisticAssigneesArgs['allUsers'];
  task: Task;
}
export function TaskDetailsRightSection(props: TaskDetailsRightSectionProps) {
  const { allUsers, selected, task } = props;

  return (
    <div className={classes.rightSection}>
      <SectionGroup title="Add to task">
        <RightSectionButton
          leftSection={<Icon size="s16" strokeSize="s24" name="IconStar" />}
        >
          Sprint Points
        </RightSectionButton>
        <TaskAssignee
          data={allUsers}
          values={selected}
          target={(_, ctx) => (
            <RightSectionButton
              onClick={ctx.onClick}
              leftSection={<Icon size="s16" strokeSize="s24" name="IconUser" />}
            >
              Assignee
            </RightSectionButton>
          )}
        />

        <TaskPriority
          defaultValue={task.priority}
          taskId={task.id}
          target={(ctx) => (
            <RightSectionButton
              onClick={ctx.onClick}
              leftSection={<Icon size="s16" strokeSize="s24" name="IconFlag" />}
            >
              Priority
            </RightSectionButton>
          )}
        />
      </SectionGroup>
      <SectionGroup title="Actions">
        <RightSectionButton
          className={classes.deleteBtnColor}
          leftSection={<Icon size="s16" strokeSize="s24" name="IconTrash" />}
        >
          Delete
        </RightSectionButton>
      </SectionGroup>
    </div>
  );
}
