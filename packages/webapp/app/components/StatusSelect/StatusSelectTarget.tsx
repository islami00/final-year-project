import { UnstyledButton } from '@mantine/core';
import { type ColorToken } from '@tma/design-system';
import * as React from 'react';
import { P } from '../P';
import { SelectButton } from './StatusSelect.styles';
import { defineStatusSelectVars } from './StatusSelect.utils';

export interface StatusTargetProps
  extends React.HTMLAttributes<HTMLButtonElement> {
  bg: ColorToken;
}

export const StatusSelectTarget = React.forwardRef<
  HTMLButtonElement,
  StatusTargetProps
>((props, ref) => {
  const { bg, children, ...rest } = props;
  const cssProps = defineStatusSelectVars({ bg }) as React.CSSProperties;
  return (
    <SelectButton
      {...rest}
      className={UnstyledButton.classes.root}
      style={cssProps}
      ref={ref}
    >
      <P font="inherit" color="inherit">
        {children}
      </P>
    </SelectButton>
  );
});
