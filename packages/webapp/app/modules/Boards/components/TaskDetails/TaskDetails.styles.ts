import type { ModalBaseStylesNames } from '@mantine/core';
import { css } from '@tma/design-system';

export const content = css({
  minHeight: 'min(816px, 100%)',
});
export const body = css({
  display: 'grid',
  gridTemplateColumns: '550fr 184fr',
});

export const rightSection = css({
  display: 'flex',
  flexDirection: 'column',
  rowGap: 'md',
});
export const leftSection = css({
  display: 'flex',
  flexDirection: 'column',
  rowGap: 'xl',
});

export const descriptionSection = css({
  display: 'flex',
  flexDirection: 'column',
  rowGap: 'md',
});
export const modalClassNames: Partial<Record<ModalBaseStylesNames, string>> = {
  content,
  body,
};
