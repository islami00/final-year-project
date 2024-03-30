import { rem } from '@mantine/core';
import { defineTextStyles } from '@pandacss/dev';

const fontWeights = {
  REGULAR: 400,
  MEDIUM: 500,
  SEMI_BOLD: 600,
  BOLD: 700,
};
/*
 * 100 to 900, with intervals of 100: Regular 400, Medium 500, Semi-Bold 600, Bold 700, etc.
 */
export const textStyles = defineTextStyles({
  '3xs': {
    value: {
      fontSize: rem(8),
      lineHeight: 1.55,
      fontWeight: fontWeights.REGULAR,
    },
  },
  '2xs': {
    value: {
      fontSize: rem(10),
      lineHeight: 1.55,
      fontWeight: fontWeights.REGULAR,
    },
  },
  '2xsSemiBold': {
    value: {
      fontSize: rem(10),
      lineHeight: 1.55,
      fontWeight: fontWeights.SEMI_BOLD,
    },
  },
  xs: {
    value: {
      fontSize: rem(12),
      lineHeight: 1.55,
      fontWeight: fontWeights.REGULAR,
    },
  },
  xsSemiBold: {
    value: {
      fontSize: rem(12),
      lineHeight: 1.55,
      fontWeight: fontWeights.SEMI_BOLD,
    },
  },
  xsBold: {
    value: {
      fontSize: rem(12),
      lineHeight: 1.55,
      fontWeight: fontWeights.BOLD,
    },
  },
  sm: {
    value: {
      fontSize: rem(14),
      lineHeight: 1.55,
      fontWeight: fontWeights.REGULAR,
    },
  },
  smSemiBold: {
    value: {
      fontSize: rem(14),
      lineHeight: 1.55,
      fontWeight: fontWeights.SEMI_BOLD,
    },
  },
  smBold: {
    value: {
      fontSize: rem(14),
      lineHeight: 1.55,
      fontWeight: fontWeights.BOLD,
    },
  },
  md: {
    value: {
      fontSize: rem(16),
      lineHeight: 1.55,
      fontWeight: fontWeights.REGULAR,
    },
  },
  mdSemiBold: {
    value: {
      fontSize: rem(16),
      lineHeight: 1.55,
      fontWeight: fontWeights.SEMI_BOLD,
    },
  },
  mdBold: {
    value: {
      fontSize: rem(16),
      lineHeight: 1.55,
      fontWeight: fontWeights.BOLD,
    },
  },
  lg: {
    value: {
      fontSize: rem(18),
      lineHeight: 1.55,
      fontWeight: fontWeights.REGULAR,
    },
  },
  lgSemiBold: {
    value: {
      fontSize: rem(18),
      lineHeight: 1.55,
      fontWeight: fontWeights.SEMI_BOLD,
    },
  },
  lgBold: {
    value: {
      fontSize: rem(18),
      lineHeight: 1.55,
      fontWeight: fontWeights.BOLD,
    },
  },
  xl: {
    value: {
      fontSize: rem(20),
      lineHeight: 1.55,
      fontWeight: fontWeights.REGULAR,
    },
  },
  xlSemiBold: {
    value: {
      fontSize: rem(20),
      lineHeight: 1.55,
      fontWeight: fontWeights.SEMI_BOLD,
    },
  },
  xlBold: {
    value: {
      fontSize: rem(20),
      lineHeight: 1.55,
      fontWeight: fontWeights.BOLD,
    },
  },

  H1: {
    value: {
      fontSize: rem(34),
      lineHeight: 1.3,
      fontWeight: fontWeights.BOLD,
    },
  },
  H2: {
    value: {
      fontSize: rem(26),
      lineHeight: 1.35,
      fontWeight: fontWeights.BOLD,
    },
  },
  H3: {
    value: {
      fontSize: rem(22),
      lineHeight: 1.4,
      fontWeight: fontWeights.BOLD,
    },
  },
  H4: {
    value: {
      fontSize: rem(18),
      lineHeight: 1.45,
      fontWeight: fontWeights.BOLD,
    },
  },
  H5: {
    value: {
      fontSize: rem(16),
      lineHeight: 1.5,
      fontWeight: fontWeights.BOLD,
    },
  },
  H6: {
    value: {
      fontSize: rem(14),
      lineHeight: 1.5,
      fontWeight: fontWeights.BOLD,
    },
  },
});
