import { P } from '../../../../../components/P/P';
import { TaskWithAssignees } from '../../../../../models/TaskWithAssignees.model';
import * as classes from './TaskSectionRenderers.styles';
import { Icon } from '../../../../../components/Icon/Icon';

export interface SprintPointsProps {
  sprintPoints: number;
}

function SprintPoints(props: SprintPointsProps) {
  const { sprintPoints } = props;
  return (
    <div className={classes.sprintPointsRoot}>
      <Icon name="IconStar" size="s16" />
      <P textStyle="smSemiBold">{sprintPoints}</P>
    </div>
  );
}

export function sprintPointRenderer(task: TaskWithAssignees) {
  if (!task.sprintPoints) return null;
  return <SprintPoints sprintPoints={task.sprintPoints} />;
}
