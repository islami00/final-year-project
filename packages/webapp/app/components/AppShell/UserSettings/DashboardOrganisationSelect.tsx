import { useInputControl, type FieldMetadata } from '@conform-to/react';
import { Select, type SelectProps } from '@mantine/core';
import { Organization } from '../../../models/Organization.model';
import { mapOrganisationToSelectData } from './OrganisationSelect.utils';
import * as appOrgIdForm from '../../../routes/app.$orgId/form';

export interface DashboardOrganisationSelectProps
  extends Omit<SelectProps, 'data' | 'onChange'> {
  field: FieldMetadata<string | null, appOrgIdForm.UserSettingsFormData>;
  organisations: Organization[];
}

export function DashboardOrganisationSelect(
  props: DashboardOrganisationSelectProps
) {
  const { field, organisations } = props;

  const organisationData = mapOrganisationToSelectData(organisations);
  const control = useInputControl(field);

  return (
    <Select
      data={organisationData}
      onBlur={control.blur}
      onFocus={control.focus}
      value={control.value}
      key={field.key}
      onChange={(value) => {
        if (!value) return;
        control.change(value);
      }}
      error={field.errors?.join(',')}
      searchable
      label="Dashboard Organisation"
      description="This will be used to filter the mobile widget view"
    />
  );
}
