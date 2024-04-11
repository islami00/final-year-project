import { ActionItem } from './ActionItem';
import * as classes from './ActionSection.styles';
import {
  AssigneeSectionProps,
  AssigneeSection,
} from '../AssigneeSection/AssigneeSection';

type FromAssignee = Pick<
  AssigneeSectionProps,
  'allUsers' | 'optimisticAssignees' | 'selected'
>;
export type ActionSectionProps = FromAssignee;
export function ActionSection(props: ActionSectionProps) {
  const { allUsers, optimisticAssignees: newAssignees, selected } = props;

  return (
    <div className={classes.actions}>
      <ActionItem title="Assignees">
        <AssigneeSection
          allUsers={allUsers}
          optimisticAssignees={newAssignees}
          selected={selected}
        />
      </ActionItem>
    </div>
  );
}
