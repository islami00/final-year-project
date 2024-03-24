import { rem } from '@mantine/core';
import { definePreset, defineTokens } from '@pandacss/dev';
import {
  mantineColorsAsTokens,
  mantineRadiiAsTokens,
  mantineSpacingAsTokens,
} from './mantineTheme';

const tokens = defineTokens({
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
});

const semanticTokens = defineTokens({
  sizes: {
    inputSizeMd: {
      value: rem(32),
    },
  },
  radii: {
    default: {
      value: '{radii.sm}',
    },
  },
});

export default definePreset({
  theme: {
    recipes: {
      // recipes break the template-literal so no-go fn: https://github.com/chakra-ui/panda/issues/2388
    },
    tokens,
    semanticTokens,
  },
});
