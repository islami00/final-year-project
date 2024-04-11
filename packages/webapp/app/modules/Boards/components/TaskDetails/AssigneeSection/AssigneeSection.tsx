import { Flex } from '@tma/design-system';
import keyBy from 'lodash/fp/keyBy';
import { mapToAssigneeData } from '../../../../../components/AssigneeSelect/AssigneeSelect.utils';
import { UserAvatar } from '../../../../../components/UserAvatar/UserAvatar';
import { User } from '../../../../../models/User.model';
import { TaskAssignee } from './TaskAssignee';
import {
  applyOptimisticAssignee,
  useOptimisticAssigneeFetchers,
} from '../../../logic/optimisticAssignee';

export interface AssigneeSectionProps {
  allUsers: User[];
  assignees: User[];
}
export function AssigneeSection(props: AssigneeSectionProps) {
  const { allUsers, assignees } = props;

  const { addedAssignees, removedAssignees } = useOptimisticAssigneeFetchers();

  const selectData = allUsers.map(mapToAssigneeData);
  const dataMap = keyBy((v) => v.id, allUsers);

  const { selected, newAssignees } = applyOptimisticAssignee({
    assignees,
    added: addedAssignees,
    removed: removedAssignees,
    allData: dataMap,
  });

  return (
    <Flex columnGap="3xs" alignItems="center">
      {newAssignees.map((each) => (
        <UserAvatar key={each.id} name={each.name} src={each.avatar} />
      ))}
      <TaskAssignee data={selectData} values={selected} />
    </Flex>
  );
}
