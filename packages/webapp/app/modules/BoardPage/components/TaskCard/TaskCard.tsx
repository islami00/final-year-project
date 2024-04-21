import { Card } from '@mantine/core';
import { Link, generatePath } from '@remix-run/react';
import { P } from '../../../../components/P/P';
import { TaskWithAssignees } from '../../../../models/TaskWithAssignees.model';
import { routeConfig } from '../../../../utils/routeConfig';
import * as classes from './TaskCard.styles';
import { renderableSections } from './TaskCard.utils';
import { TaskSections } from './TaskSections';
export interface TaskCardProps {
  task: TaskWithAssignees;
  orgId: string;
}

export function TaskCard(props: TaskCardProps) {
  const { task, orgId } = props;

  return (
    <Card
      className={classes.root}
      component={Link}
      to={generatePath(routeConfig.boardTasks.param, {
        boardId: task.boardId,
        taskId: task.id,
        orgId,
      })}
    >
      <P textStyle="lgBold">{task.title}</P>
      <TaskSections task={task}>{renderableSections}</TaskSections>
    </Card>
  );
}
