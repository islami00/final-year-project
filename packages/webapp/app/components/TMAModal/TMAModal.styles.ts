import type { ModalStylesNames } from '@mantine/core';
import { css } from '@tma/design-system';

const modalHeader = css({
  minHeight: 100,
  py: 'md',
  px: 'md',
  columnGap: 'lg',
  alignItems: 'start',
  position: 'static',
  flexShrink: 0,
});
const modalBody = css({
  display: 'flex',
  pb: 'md',
  px: 'md',
  gap: 'lg',
  // Mantine reset
  pt: 0,
  // Reset end.
  minHeight: 0,
});
const modalTitle = css({
  textStyle: 'lgBold',
});
const modalContent = css({
  display: 'flex',
  flexDirection: 'column',
});

export const modalClasses: Partial<Record<ModalStylesNames, string>> = {
  header: modalHeader,
  title: modalTitle,
  body: modalBody,
  content: modalContent,
};
