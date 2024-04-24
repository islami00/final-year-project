import type { InputStylesNames } from '@mantine/core';
import { css } from '@tma/design-system';

export const titleInput = css({
  flexGrow: 1,
  textStyle: 'lgBold',
  padding: 0,
  minHeight: 0,
});

export const titleInputClassNames: Partial<Record<InputStylesNames, string>> = {
  input: titleInput,
};
