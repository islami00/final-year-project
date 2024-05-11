import {
  ActionIcon,
  Avatar,
  Button,
  Combobox,
  Input,
  rem,
  type ActionIconCssVariables,
  type ActionIconProps,
  type AvatarCssVariables,
  type AvatarProps,
  type ButtonCssVariables,
  type ButtonProps,
  type InputFactory,
  type MantineSize,
  type MantineThemeComponents,
  type PartialTransformVars,
  Menu,
  resolveClassNames,
  type MenuStylesNames,
  type ClassNames,
  type FactoryPayload,
} from '@mantine/core';
import { css } from '@tma/design-system';
import { mergeClassObjects } from '../../utils/mergeClassObjects';
import merge from 'lodash/merge';
import { ClassNamesRecord } from './types';

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
      case 'xs':
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
type MantineSizeProp =
  | MantineSize
  | (string & NonNullable<unknown>)
  | undefined;

function inputSizeVars(
  size: MantineSizeProp
): PartialTransformVars<InputFactory['vars']> {
  switch (size) {
    case 'xs':
      return {
        wrapper: {
          '--input-height': rem(32),
        },
      };

    default:
      return {
        wrapper: {},
      };
  }
}
function inputClassNames(size: MantineSizeProp) {
  switch (size) {
    case 'lg': {
      return {
        wrapper: css({ textStyle: 'lgBold' }),
      };
    }
    case 'xs': {
      return {
        wrapper: css({ textStyle: 'xsSemiBold' }),
        section: css({ '&[data-position="left"': {} }),
      };
    }
    default:
      return {};
  }
}

const inputDefaultProps = Input.extend({
  vars: (...args) => {
    const [, props] = args;
    const { size, vars } = props;
    const varsResult = vars?.(...args);
    const colorVars: PartialTransformVars<InputFactory['vars']> = {
      wrapper: {
        ['--input-color' as string]: 'white',
      },
    };
    return merge(inputSizeVars(size), colorVars, varsResult);
  },
  classNames: (theme, props, stylesCtx) => {
    const { size, classNames } = props;
    const resolved = resolveClassNames({
      theme,
      props,
      stylesCtx,
      classNames: classNames as ClassNames<FactoryPayload>,
    });

    return mergeClassObjects(resolved, inputClassNames(size));
  },
});

const menuDefaultProps = Menu.extend({
  classNames(theme, props, stylesCtx) {
    const { classNames } = props;
    const resolved = resolveClassNames({
      theme,
      props,
      stylesCtx: stylesCtx as ClassNamesRecord,
      classNames,
    });

    const menuClasses: ClassNamesRecord<MenuStylesNames> = {
      itemLabel: css({ textStyle: 'smSemiBold' }),
    };
    return mergeClassObjects(menuClasses, resolved);
  },
});
export const mantineComponents: MantineThemeComponents = {
  Button: ButtonDefaultProps,
  ActionIcon: actionIconDefaultProps,
  Avatar: avatarDefaultProps,
  Combobox: comboboxDefaultProps,
  Input: inputDefaultProps,
  Menu: menuDefaultProps,
};
