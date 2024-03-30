import { rem } from '@mantine/core';
import { defineTokens, type Tokens } from '@pandacss/dev';
import {
  mantineColorsAsTokens,
  mantineRadiiAsTokens,
  mantineSpacingAsTokens,
} from '../mantineTheme';

export const presetTokens: Tokens = defineTokens({
  colors: {
    ...mantineColorsAsTokens,
    primary: {
      value: 'red',
    },
  },
  spacing: {
    ...mantineSpacingAsTokens,
    '2xs': {
      value: rem(8),
    },
    '3xs': {
      value: rem(6),
    },
    '4xs': {
      value: rem(4),
    },
  },
  radii: {
    ...mantineRadiiAsTokens,
  },
  fonts: {
    openSans: {
      value: 'Open Sans Variable',
    },
  },
});
