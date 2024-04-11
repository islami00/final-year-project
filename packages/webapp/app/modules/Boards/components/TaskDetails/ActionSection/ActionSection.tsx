import { ActionItem } from './ActionItem';
import * as classes from './ActionSection.styles';
import {
  AssigneeSectionProps,
  AssigneeSection,
} from '../AssigneeSection/AssigneeSection';

interface ActionSectionProps {
  allUsers: AssigneeSectionProps['allUsers'];
  assignees: AssigneeSectionProps['assignees'];
}
export function ActionSection(props: ActionSectionProps) {
  const { allUsers, assignees } = props;

  return (
    <div className={classes.actions}>
      <ActionItem title="Assignees">
        <AssigneeSection allUsers={allUsers} assignees={assignees} />
      </ActionItem>
    </div>
  );
}
