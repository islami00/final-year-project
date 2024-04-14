import { Combobox, type ComboboxProps } from '@mantine/core';
import { mergeClassObjects } from '../../utils/mergeClassObjects';
import * as React from 'react';
import { selectClasses } from '../AssigneeSelect/AssigneeSelect.styles';
import { SelectWidths } from './SelectPrimitive.utils';

interface SelectPrimitiveProps extends ComboboxProps {
  target: React.ReactNode;
}
export function SelectPrimitive(props: SelectPrimitiveProps) {
  const { target, children, classNames, ...rest } = props;
  function getClassNames() {
    if (!classNames) return selectClasses;
    return mergeClassObjects(selectClasses, classNames);
  }

  return (
    <Combobox
      position="bottom-start"
      width={SelectWidths.SM}
      classNames={getClassNames()}
      {...rest}
    >
      <Combobox.DropdownTarget>{target}</Combobox.DropdownTarget>
      <Combobox.Dropdown>
        <Combobox.Options>{children}</Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}
