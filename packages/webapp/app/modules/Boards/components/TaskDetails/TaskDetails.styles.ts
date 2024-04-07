import type { ModalBaseStylesNames } from '@mantine/core';
import { css } from '@tma/design-system';

export const content = css({
  minHeight: 'min(816px, 100%)',
});
export const body = css({
  display: 'grid',
  gridTemplateColumns: '550fr 184fr',
});

export const modalClassNames: Partial<Record<ModalBaseStylesNames, string>> = {
  content,
  body,
};

export const titleInput = css({
  flexGrow: 1,
  textStyle: 'lgBold',
  padding: 0,
  minHeight: 0,
});
