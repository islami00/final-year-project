import * as React from 'react';
import { getTargetCtx, type TargetCtx } from '../Combobox/Combobox.utils';

import { useCombobox } from '@mantine/core';
import { SelectPrimitive } from '../SelectPrimitive/SelectPrimitive';
import type { StatusItemData } from './StatusSelect.utils';
import { SelectWidths } from '../SelectPrimitive/SelectPrimitive.utils';
import { StatusSelectItem } from './StatusSelectItem';

export interface StatusSelectProps {
  onChange: (value: string) => void;

  target: (ctx: TargetCtx) => React.ReactNode;
  data: StatusItemData[];
}

export function StatusSelect(props: StatusSelectProps) {
  const { onChange, target, data } = props;
  const combobox = useCombobox();

  function onOptionSubmit(currentValue: string) {
    onChange(currentValue);
    combobox.closeDropdown();
  }

  return (
    <SelectPrimitive
      store={combobox}
      onOptionSubmit={onOptionSubmit}
      target={target(getTargetCtx(combobox))}
      width={SelectWidths.LG}
    >
      {data.map((status) => (
        <StatusSelectItem key={status.id} status={status} />
      ))}
    </SelectPrimitive>
  );
}
