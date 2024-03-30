import type { ModalStylesNames } from '@mantine/core';
import { css } from '@tma/design-system';

export const modalHeader = css({
  height: 100,
  pt: 'md',
  px: 'md',
  pb: 0,
});

export const modalTitle = css({
  textStyle: 'lgBold',
});

export const modalClasses: Partial<Record<ModalStylesNames, string>> = {
  header: modalHeader,
  title: modalTitle,
};
