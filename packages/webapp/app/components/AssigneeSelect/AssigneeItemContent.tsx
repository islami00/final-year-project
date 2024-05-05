import { P } from '../P';
import { UserAvatar } from '../UserAvatar/UserAvatar';
import * as classes from './AssigneeSelect.styles';
import { AssigneeData } from './AssigneeSelect.types';

export interface AssigneeItemContentProps {
  each: AssigneeData;
  selected?: boolean;
}
export function AssigneeItemContent(props: AssigneeItemContentProps) {
  const { each, selected } = props;
  return (
    <>
      <UserAvatar
        src={each.avatar}
        name={each.label}
        classNames={classes.avatarClasses}
        data-selected={selected || undefined}
      />
      <P textStyle="smSemiBold">{each.label}</P>
    </>
  );
}
