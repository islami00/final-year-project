import { TextInput, type TextInputProps } from '@mantine/core';
import { forwardRef } from 'react';
import { getTitleInputVars } from './ModuleLayout.styles';

export type ModuleLayoutTitleInputProps = TextInputProps;

export const ModuleLayoutTitleInput = forwardRef<
  HTMLInputElement,
  ModuleLayoutTitleInputProps
>((props, ref) => (
  <TextInput
    ref={ref}
    size="lg"
    variant="transparent"
    placeholder="Enter a Name"
    vars={getTitleInputVars}
    {...props}
  />
));
