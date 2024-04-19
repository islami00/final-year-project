import {
  Button,
  createPolymorphicComponent,
  type ButtonProps,
} from '@mantine/core';
import { cx } from '@tma/design-system';
import * as React from 'react';
import * as classes from './RightSectionButton.styles';

export type RightSectionButtonProps = ButtonProps;

export const RightSectionButton = createPolymorphicComponent<
  'button',
  ButtonProps
>(
  React.forwardRef<HTMLButtonElement, RightSectionButtonProps>((props, ref) => {
    const { className, ...rest } = props;
    return (
      <Button
        {...rest}
        className={cx(classes.assigneeButton, className)}
        ref={ref}
        color="dark"
        variant="filled"
        size="compact-md"
      />
    );
  })
);
