import type { AvatarStylesNames, ComboboxStylesNames } from '@mantine/core';
import { css, flex } from '@tma/design-system';

const placeholder = css({
  '[data-selected] &': {
    borderColor: 'blue',
    borderWidth: 2,
  },
});

export const avatarClasses: Partial<Record<AvatarStylesNames, string>> = {
  placeholder: placeholder,
};

const option = flex({ columnGap: '3xs', alignItems: 'center' });

export const selectClasses: Partial<Record<ComboboxStylesNames, string>> = {
  option,
};
