import { Button } from '@mantine/core';
import { Icon } from '../../../../../components/Icon/Icon';
import {
  type ApplyOptimisticAssigneeResult,
  type UseOptimisticAssigneesArgs,
} from '../../../logic/useOptimisticAssignees';
import { TaskAssignee } from '../AssigneeSection/TaskAssignee';
import { SectionGroup } from '../SectionGroup/SectionGroup';
import * as classes from './TaskDetailsRightSection.styles';

interface TaskDetailsRightSectionProps {
  selected: ApplyOptimisticAssigneeResult['selected'];
  allUsers: UseOptimisticAssigneesArgs['allUsers'];
}
export function TaskDetailsRightSection(props: TaskDetailsRightSectionProps) {
  const { allUsers, selected } = props;

  return (
    <div className={classes.rightSection}>
      <SectionGroup title="Add to task">
        <Button
          color="dark"
          variant="filled"
          size="compact-md"
          leftSection={<Icon size="s16" strokeSize="s24" name="IconStar" />}
        >
          Sprint Points
        </Button>
        <TaskAssignee
          data={allUsers}
          values={selected}
          target={(_, combobox) => (
            <Button
              color="dark"
              variant="filled"
              size="compact-md"
              className={classes.assigneeButton}
              onClick={() => combobox.toggleDropdown()}
              leftSection={<Icon size="s16" strokeSize="s24" name="IconUser" />}
            >
              Assignee
            </Button>
          )}
        />

        <Button
          color="dark"
          variant="filled"
          size="compact-md"
          leftSection={<Icon size="s16" strokeSize="s24" name="IconFlag" />}
        >
          Priority
        </Button>
      </SectionGroup>
      <SectionGroup title="Actions">
        <Button
          color="dark"
          variant="filled"
          size="compact-md"
          className={classes.deleteBtnColor}
          leftSection={<Icon size="s16" strokeSize="s24" name="IconTrash" />}
        >
          Delete
        </Button>
      </SectionGroup>
    </div>
  );
}
