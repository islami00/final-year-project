import { AppShell } from '@mantine/core';
import { css, styled } from '@tma/design-system';

export const header = css({
  px: 'lg',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

export const menuTarget = css({
  cursor: 'pointer',
});

export const AppShellMain = styled(AppShell.Main, {
  base: {
    display: 'flex',
  },
});
