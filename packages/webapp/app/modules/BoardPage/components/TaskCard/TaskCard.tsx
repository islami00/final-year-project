import { Card } from '@mantine/core';
import { P } from '../../../../components/P/P';
import { TaskWithAssignees } from '../../../../models/TaskWithAssignees.model';
import * as classes from './TaskCard.styles';
import { TaskSections } from './TaskSections';
import { sprintPointRenderer } from './TaskSectionRenderers/sprintPoints';
export interface TaskCardProps {
  task: TaskWithAssignees;
}

export function TaskCard(props: TaskCardProps) {
  const { task } = props;
  return (
    <Card className={classes.root}>
      <P textStyle="lgBold">{task.title}</P>
      <TaskSections task={task}>{[sprintPointRenderer]}</TaskSections>
    </Card>
  );
}
