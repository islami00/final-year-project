import { rem } from '@mantine/core';
import { definePreset, defineTokens } from '@pandacss/dev';
import { textStyles } from './preset/textStyles';
import { presetTokens } from './preset/presetTokens';

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
    tokens: presetTokens,
    semanticTokens,
    textStyles,
  },
});
