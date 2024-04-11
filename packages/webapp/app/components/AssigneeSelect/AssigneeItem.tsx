import { P } from '../P';
import { AssigneeData } from './AssigneeSelect.types';
import { Flex } from '@tma/design-system';
import { UserAvatar } from '../UserAvatar/UserAvatar';
import * as classes from './AssigneeSelect.styles';

interface AssigneeItemProps {
  each: AssigneeData;
  selected: boolean;
}
export function AssigneeItem(props: AssigneeItemProps) {
  const { each, selected } = props;
  return (
    <Flex columnGap="3xs">
      <UserAvatar
        src={each.avatar}
        name={each.name}
        classNames={classes.avatarClasses}
        data-selected={selected || undefined}
      />
      <P textStyle="smSemiBold">{each.name}</P>
    </Flex>
  );
}
