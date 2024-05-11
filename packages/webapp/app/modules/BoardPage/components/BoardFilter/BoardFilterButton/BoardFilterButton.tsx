import { Button, type ButtonProps, type ElementProps } from '@mantine/core';
import { forwardRef } from 'react';
import { Icon } from '../../../../../components/Icon/Icon';
import * as classes from './BoardFilterButton.styles';

interface BoardFilterButtonProps
  extends ButtonProps,
    Omit<ElementProps<'button'>, 'color'> {
  active?: boolean;
  count?: number;
}
export const BoardFilterButton = forwardRef<
  HTMLButtonElement,
  BoardFilterButtonProps
>((props, ref) => {
  const { active, count, ...rest } = props;

  const joined = [count, 'Filter'].join(' ');
  return (
    <Button
      {...rest}
      size="xs"
      ref={ref}
      leftSection={
        <Icon name="IconAdjustments" size="s24" className={classes.icon} />
      }
      color={active ? 'blue' : 'dark'}
      variant="filled"
    >
      {joined}
    </Button>
  );
});
