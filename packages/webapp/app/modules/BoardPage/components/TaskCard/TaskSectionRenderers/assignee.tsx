import type { TaskSectionRenderers } from '../TaskCard.types';
import { User } from '../../../../../models/User.model';
import * as classes from './TaskSectionRenderers.styles';
import { UserAvatar } from '../../../../../components/UserAvatar/UserAvatar';
export interface AssigneeProps {
  assignees: User[];
}

function Assignee(props: AssigneeProps) {
  const { assignees } = props;
  return (
    <div className={classes.assigneeRoot}>
      {assignees.map((each) => (
        <UserAvatar name={each.name} src={each.avatar} key={each.id} />
      ))}
    </div>
  );
}

export const assigneeRenderer: TaskSectionRenderers = (task) => {
  if (task.assignees.length === 0) return null;
  return <Assignee  assignees={task.assignees} />;
};
