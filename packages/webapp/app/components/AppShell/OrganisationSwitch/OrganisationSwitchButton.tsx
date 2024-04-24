import * as classes from './OrganisationSwitch.styles';
import { P } from '../../P';
import { Organization } from '../../../models/Organization.model';
import { UnstyledButton } from '@mantine/core';
import { Icon } from '../../Icon';
import { UserAvatar } from '../../UserAvatar';
import { forwardRef } from 'react';

interface OrganisationSwitchButtonProps {
  current: Organization;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}
export const OrganisationSwitchButton = forwardRef<
  HTMLButtonElement,
  OrganisationSwitchButtonProps
>((props, ref) => {
  const { current, onClick } = props;
  return (
    <UnstyledButton className={classes.content} onClick={onClick} ref={ref}>
      <div className={classes.logo}>
        <UserAvatar size={38} name={current.name} src={current.logo} />
        <P textStyle="smSemiBold" color="white" truncate>
          {current.name}
        </P>
      </div>
      <Icon name="IconChevronRight" size="s24" className={classes.icon} />
    </UnstyledButton>
  );
});
