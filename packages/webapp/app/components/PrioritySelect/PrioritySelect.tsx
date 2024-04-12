import { Combobox, useCombobox } from '@mantine/core';
import * as React from 'react';
import { Priority } from '../../models/Task.model';
import { selectClasses } from '../AssigneeSelect/AssigneeSelect.styles';
import { getTargetCtx, type TargetCtx } from '../Combobox/Combobox.utils';
import { ComboboxEmptyText } from '../Combobox/ComboboxEmptyText';
import { priorityList } from './PrioritySelect.utils';
import { PriorityItem } from './PriorityItem';

export interface PrioritySelectProps {
  onChange: (value: Priority) => void;
  value: Priority | null;
  target: (combobox: TargetCtx, value: Priority | null) => React.ReactNode;
}

export function PrioritySelect(props: PrioritySelectProps) {
  const { onChange, target, value } = props;

  const combobox = useCombobox();
  const priorityOptions = priorityList;
  const hasData = priorityOptions.length > 0;

  function onOptionSubmit(currentValue: string) {
    onChange(currentValue as Priority);
    combobox.closeDropdown();
  }
  return (
    <Combobox
      store={combobox}
      position="bottom-start"
      onOptionSubmit={onOptionSubmit}
      classNames={selectClasses}
      width={125}
    >
      <Combobox.DropdownTarget>
        {target(getTargetCtx(combobox), value)}
      </Combobox.DropdownTarget>
      <Combobox.Dropdown>
        <Combobox.Options>
          {hasData ? (
            priorityOptions.map((priority) => (
              <PriorityItem key={priority} priority={priority} />
            ))
          ) : (
            <ComboboxEmptyText />
          )}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}
