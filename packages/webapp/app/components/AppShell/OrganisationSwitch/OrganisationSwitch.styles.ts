import { css, flex } from '@tma/design-system';

export const content = flex({
  p: 'md',
  alignItems: 'center',
  width: '100%',
  justifyContent: 'space-between',
  columnGap: 'md',
});
export const logo = flex({
  columnGap: 10,
  flexGrow: 1,
  alignItems: 'center',
  minWidth: 0,
});
export const icon = css({
  color: 'dark.1',
  flexShrink: 0,
});
