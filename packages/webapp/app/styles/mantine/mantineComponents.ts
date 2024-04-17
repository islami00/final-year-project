import {
  ActionIcon,
  Avatar,
  Button,
  rem,
  type ActionIconCssVariables,
  type ActionIconProps,
  type AvatarCssVariables,
  type AvatarProps,
  type ButtonCssVariables,
  type ButtonProps,
  type MantineThemeComponents,
  type PartialTransformVars,
  Combobox,
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

function getActionIconSizeStyles(
  size: ActionIconProps['size']
): PartialTransformVars<ActionIconCssVariables> {
  switch (size) {
    case 'lg':
      return {
        root: {
          '--ai-size': rem(32),
        },
      };
    case 'sm':
      return {
        root: {
          '--ai-size': rem(20),
        },
      };
      break;

    default:
      return { root: {} };
      break;
  }
}
const actionIconDefaultProps = ActionIcon.extend({
  vars: (_, props) => getActionIconSizeStyles(props.size),
});
function getAvatarSizeStyles(
  size: AvatarProps['size']
): PartialTransformVars<AvatarCssVariables> {
  switch (size) {
    case 'md':
      return {
        root: {
          '--avatar-size': rem(32),
        },
      };

    default:
      return { root: {} };
      break;
  }
}
const avatarDefaultProps = Avatar.extend({
  vars: (_, props) => getAvatarSizeStyles(props.size),
});

const comboboxDefaultProps = Combobox.extend({
  defaultProps: {
    keepMounted: false,
  },
});
export const mantineComponents: MantineThemeComponents = {
  Button: ButtonDefaultProps,
  ActionIcon: actionIconDefaultProps,
  Avatar: avatarDefaultProps,
  Combobox: comboboxDefaultProps,
};
