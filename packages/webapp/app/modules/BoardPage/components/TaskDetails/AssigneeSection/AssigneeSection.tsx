import { ActionIcon } from '@mantine/core';
import { Flex } from '@tma/design-system';
import { Icon } from '../../../../../components/Icon';
import { UserAvatar } from '../../../../../components/UserAvatar/UserAvatar';
import { User } from '../../../../../models/User.model';
import { type ApplyOptimisticAssigneeResult } from '../../../logic/useOptimisticAssignees';
import { TaskAssignee } from '../TaskAssignee';

export interface AssigneeSectionProps extends ApplyOptimisticAssigneeResult {
  allUsers: User[];
}
export function AssigneeSection(props: AssigneeSectionProps) {
  const { allUsers, optimisticAssignees: newAssignees, selected } = props;

  return (
    <Flex columnGap="3xs" alignItems="center">
      {newAssignees.map((each) => (
        <UserAvatar key={each.id} name={each.name} src={each.avatar} />
      ))}
      <TaskAssignee
        data={allUsers}
        values={selected}
        target={(_, ctx) => (
          <ActionIcon onClick={ctx.onClick} size="lg" radius="lg" color="dark">
            <Icon name="IconPlus" strokeSize="s24" />
          </ActionIcon>
        )}
      />
    </Flex>
  );
}
