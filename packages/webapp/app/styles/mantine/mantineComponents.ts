import { Button, rem, type MantineThemeComponents } from '@mantine/core';

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
});
export const mantineComponents: MantineThemeComponents = {
  Button: ButtonDefaultProps,
};
