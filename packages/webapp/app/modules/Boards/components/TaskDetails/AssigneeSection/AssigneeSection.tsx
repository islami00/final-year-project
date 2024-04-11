import { ActionIcon } from '@mantine/core';
import { User } from '../../../../../models/User.model';
import { AssigneeSelect } from '../../../../../components/AssigneeSelect/AssigneeSelect';
import noop from 'lodash/fp/noop';
import { Icon } from '../../../../../components/Icon/Icon';
import { mapToAssigneeData } from '../../../../../components/AssigneeSelect/AssigneeSelect.utils';
import { Flex } from '@tma/design-system';
import { UserAvatar } from '../../../../../components/UserAvatar/UserAvatar';

export interface AssigneeSectionProps {
  allUsers: User[];
  assignees: User[];
}
export function AssigneeSection(props: AssigneeSectionProps) {
  const { allUsers, assignees } = props;
  // Todo: Move to assignee section
  const selectData = allUsers.map(mapToAssigneeData);
  const selected = new Set(assignees.map((each) => each.id));
  return (
    <Flex columnGap="3xs" alignItems="center">
      {selectData.map((each) => (
        <UserAvatar key={each.id} name={each.name} src={each.avatar} />
      ))}
      <AssigneeSelect
        data={selectData}
        values={selected}
        target={(_, combobox) => (
          <ActionIcon
            onClick={() => combobox.toggleDropdown()}
            size="lg"
            radius="lg"
            color="dark"
          >
            <Icon name="IconPlus" strokeSize="s24" />
          </ActionIcon>
        )}
        onChange={noop}
      />
    </Flex>
  );
}
