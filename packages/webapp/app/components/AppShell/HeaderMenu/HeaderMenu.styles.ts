import { type MenuStylesNames } from '@mantine/core';
import { css } from '@tma/design-system';

export const menuClasses: Partial<Record<MenuStylesNames, string>> = {
  itemLabel: css({ textStyle: 'smSemiBold' }),
};
