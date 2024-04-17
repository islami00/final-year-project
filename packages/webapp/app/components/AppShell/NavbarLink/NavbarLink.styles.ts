import { css, flex } from '@tma/design-system';

export const root = flex({
  height: 32,
  alignItems: 'center',
  ['&:hover, &.active']: { color: 'blue.1', backgroundColor: 'blue.5/45' },
  borderRadius: 4,
});
export const inner = css({
  px: 10,
  flexGrow: 1,
});

export const linkContent = css({
  display: 'flex',
  columnGap: 5,
});

export const linkText = css({
  textStyle: 'xs',
});

export const icon = css({ width: 12, height: 12 });
