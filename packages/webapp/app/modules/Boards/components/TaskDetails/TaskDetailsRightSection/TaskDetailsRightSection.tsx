import { Button } from '@mantine/core';
import * as classes from '../TaskDetails.styles';
import * as deleteBtnColor from './TaskDetailsRightSection.styles';
import { SectionGroup } from '../SectionGroup/SectionGroup';
import { Icon } from '../../../../../components/Icon/Icon';

export function TaskDetailsRightSection() {
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
        <Button
          color="dark"
          variant="filled"
          size="compact-md"
          leftSection={<Icon size="s16" strokeSize="s24" name="IconUser" />}
        >
          Assignee
        </Button>
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
          className={deleteBtnColor.deleteBtnColor}
          leftSection={<Icon size="s16" strokeSize="s24" name="IconTrash" />}
        >
          Delete
        </Button>
      </SectionGroup>
    </div>
  );
}
