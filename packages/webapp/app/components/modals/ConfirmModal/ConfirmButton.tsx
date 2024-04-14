import {
  createPolymorphicComponent,
  type ButtonProps,
  Button,
} from '@mantine/core';
import { forwardRef } from 'react';

export const ConfirmButton = createPolymorphicComponent<'button', ButtonProps>(
  forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => (
    <Button size="xs" {...props} ref={ref} />
  ))
);
