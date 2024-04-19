import { ActionIcon } from '@mantine/core';
import { P } from '../../../../../components/P/P';
import * as React from 'react';

export interface SprintPointButtonProps {
  value: number;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export const SprintPointButton = React.forwardRef<
  HTMLButtonElement,
  SprintPointButtonProps
>((props, ref) => {
  const { value, ...rest } = props;
  return (
    <ActionIcon ref={ref} {...rest} size="lg" radius="sm" color="dark">
      <P textStyle="smSemiBold" color="white">
        {value}
      </P>
    </ActionIcon>
  );
});
