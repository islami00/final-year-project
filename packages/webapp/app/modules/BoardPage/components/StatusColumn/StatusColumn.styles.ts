import { css, flex } from '@tma/design-system';

export const bg = flex({
  flexDirection: 'column',
  rowGap: 'md',
  padding: 'md',
  backgroundColor: 'dark.7',
  borderTop: '4px inset var(--status-column-border-color)',
  borderRadius: 'default',
  flexShrink: 0,
  w: 340,
});

export const titleText = css({
  wordBreak: 'break-all',
  px: 12,
  py: 1,
});
