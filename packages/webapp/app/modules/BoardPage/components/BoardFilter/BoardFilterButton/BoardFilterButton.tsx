import { Button, type ElementProps } from '@mantine/core';
import { Icon } from '../../../../../components/Icon/Icon';
import * as classes from './BoardFilterButton.styles';
import { forwardRef } from 'react';

export const BoardFilterButton = forwardRef<
  HTMLButtonElement,
  ElementProps<'button'>
>((props, ref) => (
  <Button
    {...props}
    size="xs"
    ref={ref}
    leftSection={
      <Icon name="IconAdjustments" size="s24" className={classes.icon} />
    }
    color="dark"
    variant="filled"
  >
    Filter
  </Button>
));
