import {
  AppShell,
  rem,
  type PartialVarsResolver,
  type TextInputFactory,
} from '@mantine/core';
import { flex, styled } from '@tma/design-system';

export const toolbar = flex({
  minHeight: 65,
  p: 'md',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexWrap: 'wrap',
  gap: 'md',
});
export const toolbarItems = flex({
  columnGap: '2xs',
});

export const Main = styled(AppShell.Main, {
  base: {
    display: 'grid',
    gridTemplateRows: 'max-content 1fr',
    rowGap: 'md',
    height: '100dvh',
  },
});
export const Content = styled('div', {
  base: {
    display: 'flex',
    gap: 'lg',
    padding: 'md',
    overflow: 'auto',
  },
});
export const getTitleInputVars: PartialVarsResolver<TextInputFactory> = () => ({
  wrapper: {
    '--input-height': rem(32),
  },
});
