import { Combobox, useCombobox } from '@mantine/core';
import * as React from 'react';
import { getTargetCtx, type TargetCtx } from '../Combobox/Combobox.utils';
import { SelectPrimitive } from '../SelectPrimitive/SelectPrimitive';
import { sprintPointOptions } from './SprintPointSelect.utils';
import { P } from '../P';

export interface SprintPointSelectProps {
  onChange: (value: number) => void;
  target: (ctx: TargetCtx) => React.ReactNode;
}

export function SprintPointSelect(props: SprintPointSelectProps) {
  const { onChange, target } = props;

  const combobox = useCombobox();

  function onOptionSubmit(currentValue: string) {
    onChange(Number(currentValue));
    combobox.closeDropdown();
  }
  return (
    <SelectPrimitive
      store={combobox}
      onOptionSubmit={onOptionSubmit}
      target={target(getTargetCtx(combobox))}
    >
      {sprintPointOptions.map((point) => {
        const stringPt = String(point);
        return (
          <Combobox.Option key={stringPt} value={stringPt}>
            <P textStyle="smSemiBold">{stringPt}</P>
          </Combobox.Option>
        );
      })}
    </SelectPrimitive>
  );
}
