import { Divider } from '@tma/design-system';
import * as classes from './OrganisationSwitch.styles';
import { P } from '../../P';
import { Organization } from '../../../models/Organization.model';
import { UnstyledButton } from '@mantine/core';
import { Icon } from '../../Icon';
import { UserAvatar } from '../../UserAvatar';

export interface OrganisationSwitchProps {
  organisations: Organization[];
  currentOrganisation: Organization;
}

export function OrganisationSwitch(props: OrganisationSwitchProps) {
  const { organisations, currentOrganisation } = props;

  return (
    <div>
      <UnstyledButton className={classes.content}>
        <div className={classes.logo}>
          <UserAvatar
            size={38}
            name={currentOrganisation.name}
            src={currentOrganisation.logo}
          />
          <P textStyle="smSemiBold" color="white" truncate>
            {currentOrganisation.name}
          </P>
        </div>
        <Icon name="IconChevronRight" size="s24" className={classes.icon} />
      </UnstyledButton>
      <Divider color="var(--app-shell-border-color)" thickness="1px" />
    </div>
  );
}
