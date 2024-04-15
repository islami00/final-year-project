import { type ComboboxItem } from '@mantine/core';
import { Organization } from '../../../models/Organization.model';

export function mapOrganisationToSelectData(organisations: Organization[]) {
  return organisations.map<ComboboxItem>((each) => ({
    label: each.name,
    value: each.id,
  }));
}
