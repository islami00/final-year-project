import {
  Button,
  rem,
  type ButtonCssVariables,
  type ButtonProps,
  type MantineThemeComponents,
  type PartialTransformVars,
} from '@mantine/core';
import { css } from '@tma/design-system';

function getButtonSizeStyles(
  size: ButtonProps['size']
): PartialTransformVars<ButtonCssVariables> {
  switch (size) {
    case 'xs':
      return {
        root: {
          '--button-height': rem(32),
        },
      };

    case 'compact-md': {
      return {
        root: {
          '--button-height': rem(32),
          '--button-justify': 'start',
        },
      };
    }
    default:
      return { root: {} };
  }
}

const ButtonDefaultProps = Button.extend({
  vars: (_, props) => {
    const sizeProps = getButtonSizeStyles(props.size);
    return sizeProps;
  },

  classNames(_, props) {
    switch (props.size) {
      case 'compact-md':
        return {
          root: css({ textStyle: 'smSemiBold' }),
          section: css({
            "&:where([data-position='left'])": {
              marginInlineEnd: '2xs',
            },
            "&:where([data-position='right'])": {
              marginInlineStart: '2xs',
            },
          }),
        };

      default:
        return {};
    }
  },
});
export const mantineComponents: MantineThemeComponents = {
  Button: ButtonDefaultProps,
};
