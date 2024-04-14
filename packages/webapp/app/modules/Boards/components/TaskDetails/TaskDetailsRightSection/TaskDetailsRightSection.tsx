import { Icon } from '../../../../../components/Icon/Icon';
import { Task } from '../../../../../models/Task.model';

import {
  type ApplyOptimisticAssigneeResult,
  type UseOptimisticAssigneesArgs,
} from '../../../logic/useOptimisticAssignees';
import { TaskAssignee } from '../TaskAssignee';
import { TaskPriority } from '../PrioritySection/TaskPriority';
import { SectionGroup } from '../SectionGroup/SectionGroup';
import { RightSectionButton } from '../RightSectionButton/RightSectionButton';
import * as classes from './TaskDetailsRightSection.styles';
import { TaskSprintPoint } from '../SprintPointSection/TaskSprintPoint';
import { DeleteTask } from '../DeleteTask/DeleteTask';

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
        <TaskSprintPoint
          taskId={task.id}
          target={(ctx) => (
            <RightSectionButton
              onClick={ctx.onClick}
              leftSection={<Icon size="s16" strokeSize="s24" name="IconStar" />}
            >
              Sprint Points
            </RightSectionButton>
          )}
        />
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
        <DeleteTask
          target={(onClick) => (
            <RightSectionButton
              className={classes.deleteBtnColor}
              onClick={onClick}
              leftSection={
                <Icon size="s16" strokeSize="s24" name="IconTrash" />
              }
            >
              Delete
            </RightSectionButton>
          )}
        />
      </SectionGroup>
    </div>
  );
}
