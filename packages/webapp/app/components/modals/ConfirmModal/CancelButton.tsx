import {
  createPolymorphicComponent,
  type ButtonProps,
  Button,
} from '@mantine/core';
import { forwardRef } from 'react';

export const CancelButton = createPolymorphicComponent<'button', ButtonProps>(
  forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => (
    <Button size="xs" variant="subtle" color="white" {...props} ref={ref} />
  ))
);
