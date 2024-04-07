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
  display: 'grid',
  gridTemplateColumns: '1fr max-content',
});
const modalBody = css({
  pb: 'md',
  px: 'md',
  gap: 'lg',
  // Mantine reset start
  pt: 0,
  // Mantine reset end
  minHeight: 0,
});
const modalTitle = css({
  textStyle: 'lgBold',
});
const modalContent = css({
  display: 'grid',
  gridTemplateRows: 'max-content 1fr',
});

export const modalClasses: Partial<Record<ModalStylesNames, string>> = {
  header: modalHeader,
  title: modalTitle,
  body: modalBody,
  content: modalContent,
};
