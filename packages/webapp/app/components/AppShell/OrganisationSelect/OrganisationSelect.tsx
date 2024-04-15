import * as React from 'react';
import { SelectPrimitive } from '../../SelectPrimitive';
import { getTargetCtx, type TargetCtx } from '../../Combobox/Combobox.utils';
import { Organization } from '../../../models/Organization.model';
import { Combobox, useCombobox } from '@mantine/core';
import { UserAvatar } from '../../UserAvatar';
import { P } from '../../P';
import { SelectWidths } from '../../SelectPrimitive/SelectPrimitive.utils';
export interface OrganisationSelectProps {
  target: (ctx: TargetCtx) => React.ReactNode;
  organisations: Organization[];
  onChange: (value: string) => void;
}

export function OrganisationSelect(props: OrganisationSelectProps) {
  const { target, organisations, onChange } = props;
  const combobox = useCombobox();
  const onOptionSubmit = (value: string) => {
    onChange(value);
    combobox.closeDropdown();
  };

  return (
    <SelectPrimitive
      store={combobox}
      width={SelectWidths.LG}
      onOptionSubmit={onOptionSubmit}
      target={target(getTargetCtx(combobox))}
    >
      {organisations.map((each) => (
        <Combobox.Option value={each.id} key={each.id}>
          <UserAvatar name={each.name} src={each.logo} />
          <P textStyle="smSemiBold">{each.name}</P>
        </Combobox.Option>
      ))}
    </SelectPrimitive>
  );
}
