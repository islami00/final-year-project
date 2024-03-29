import { Center, css, styled } from '@tma/design-system';

export const header = css({
  height: 100,
  px: 'md',
  pt: 'md',
});

export const body = css({
  px: 'md',
  pb: 'md',
  display: 'flex',
  flexDirection: 'column',
  rowGap: 'lg',
  w: 440,
  borderRadius: 'default',
});

export const Root = styled(Center, {
  base: {
    minHeight: '100%',
    width: '100%',
  },
});

export const submitBtn = css({
  alignSelf: 'end',
});
