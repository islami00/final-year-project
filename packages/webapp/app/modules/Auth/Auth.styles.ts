import { css } from '@tma/design-system/css';
import { styled } from '@tma/design-system/jsx';

export const Root = styled('div', {
  base: {
    width: '100%',
    height: '100%',
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
});


export const content = css({
  maxWidth: 400,
  width: "100%"
})