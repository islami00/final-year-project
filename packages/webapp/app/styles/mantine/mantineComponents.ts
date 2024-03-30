import { Button, rem, type MantineThemeComponents } from '@mantine/core';
import { css } from '@tma/design-system';

const ButtonDefaultProps = Button.extend({
  vars: (_, props) => {
    switch (props.size) {
      case 'xs':
        return {
          root: {
            '--button-height': rem(32),
          },
        };

      default:
        return { root: {} };
    }
  },
  classNames(_, props) {
    switch (props.size) {
      case 'xs':
        return {
          root: css({
            lineHeight: 1.55,
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
