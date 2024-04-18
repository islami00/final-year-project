import {
  AppShell,
  rem,
  type PartialVarsResolver,
  type TextInputFactory,
} from '@mantine/core';
import { flex, styled } from '@tma/design-system';

export const toolbar = flex({
  height: 65,
  px: 'md',
  alignItems: 'center',
  justifyContent: 'space-between',
});
export const toolbarItems = flex({
  columnGap: '2xs',
});

export const Main = styled(AppShell.Main, {
  base: {
    display: 'grid',
    gridTemplateRows: 'max-content 1fr',
    rowGap: 'md',
  },
});
export const getTitleInputVars: PartialVarsResolver<TextInputFactory> = () => ({
  wrapper: {
    '--input-height': rem(32),
  },
});
