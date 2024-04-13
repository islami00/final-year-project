import { useCombobox } from '@mantine/core';
import * as React from 'react';
import { Priority } from '../../models/Task.model';
import { getTargetCtx, type TargetCtx } from '../Combobox/Combobox.utils';
import { PriorityItem } from './PriorityItem';
import { priorityList } from './PrioritySelect.utils';
import { SelectPrimitive } from './SelectPrimitive';

export interface PrioritySelectProps {
  onChange: (value: Priority) => void;
  target: (combobox: TargetCtx) => React.ReactNode;
}

export function PrioritySelect(props: PrioritySelectProps) {
  const { onChange, target } = props;

  const combobox = useCombobox();

  function onOptionSubmit(currentValue: string) {
    onChange(currentValue as Priority);
    combobox.closeDropdown();
  }
  return (
    <SelectPrimitive
      store={combobox}
      onOptionSubmit={onOptionSubmit}
      target={target(getTargetCtx(combobox))}
    >
      {priorityList.map((priority) => (
        <PriorityItem key={priority} priority={priority} />
      ))}
    </SelectPrimitive>
  );
}
