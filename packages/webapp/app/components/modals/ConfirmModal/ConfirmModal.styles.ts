import { css } from '@tma/design-system';
import { ModalStylesNames } from '@mantine/core';

export const body = css({
  display: 'flex',
  flexDirection: 'column',
});

export const buttons = css({
  display: 'flex',
  columnGap: 'xs',
  justifyContent: 'flex-end',
});

export const modalClasses: Partial<Record<ModalStylesNames, string>> = {
  body,
};
