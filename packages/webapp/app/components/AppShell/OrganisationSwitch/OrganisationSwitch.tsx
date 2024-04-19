import { Divider } from '@tma/design-system';
import { Organization } from '../../../models/Organization.model';
import { OrganisationSwitchButton } from './OrganisationSwitchButton';
import { OrganisationSelect } from '../OrganisationSelect/OrganisationSelect';
import { generatePath, useNavigate } from '@remix-run/react';
import { routeConfig } from '../../../utils/routeConfig';

export interface OrganisationSwitchProps {
  organisations: Organization[];
  currentOrganisation: Organization;
}

export function OrganisationSwitch(props: OrganisationSwitchProps) {
  const { organisations, currentOrganisation } = props;

  const navigate = useNavigate();
  return (
    <div>
      <OrganisationSelect
        organisations={organisations}
        onChange={(orgId) => {
          navigate(generatePath(routeConfig.org.param, { orgId }));
        }}
        target={(ctx) => (
          <OrganisationSwitchButton
            onClick={ctx.onClick}
            current={currentOrganisation}
          />
        )}
      />
      <Divider color="var(--app-shell-border-color)" thickness="1px" />
    </div>
  );
}
