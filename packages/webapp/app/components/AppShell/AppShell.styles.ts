import { type AppShellStylesNames } from '@mantine/core';
import { css } from '@tma/design-system';

const header = css({
  px: 'lg',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

export const menuTarget = css({
  cursor: 'pointer',
});

const main = css({
  display: 'flex',
});
const navbar = css({
  display: 'flex',
  rowGap: 16,
  paddingBottom: 10,
});
export const navbarScrollarea = css({
  flexGrow: 1,
});
export const appShellClasses: Partial<Record<AppShellStylesNames, string>> = {
  header,
  main,
  navbar,
};
