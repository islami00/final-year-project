import type { AvatarStylesNames } from '@mantine/core';
import { css } from '@tma/design-system';

const placeholder = css({
  '[data-selected] &': {
    borderColor: 'blue',
    borderWidth: 2,
  },
});

export const avatarClasses: Partial<Record<AvatarStylesNames, string>> = {
  placeholder: placeholder,
};
