import { Combobox } from '@mantine/core';
import { P } from '../P';
import { UserAvatar } from '../UserAvatar/UserAvatar';
import * as classes from './AssigneeSelect.styles';
import { AssigneeData } from './AssigneeSelect.types';

interface AssigneeItemProps {
  each: AssigneeData;
  selected: boolean;
}
export function AssigneeItem(props: AssigneeItemProps) {
  const { each, selected } = props;
  return (
    <Combobox.Option value={each.id}>
      <UserAvatar
        src={each.avatar}
        name={each.name}
        classNames={classes.avatarClasses}
        data-selected={selected || undefined}
      />
      <P textStyle="smSemiBold">{each.name}</P>
    </Combobox.Option>
  );
}
