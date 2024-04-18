import { TextInput, type TextInputProps } from '@mantine/core';
import { Icon } from '../../../../components/Icon/Icon';
import * as navbarLinkClasses from '../../../../components/AppShell/NavbarLink/NavbarLink.styles';
import { css, cx } from '@tma/design-system';

export type SearchProps = TextInputProps;

export function Search(props: SearchProps) {
  return (
    <TextInput
      {...props}
      leftSection={
        <Icon
          name="IconSearch"
          size="s16"
          className={cx(navbarLinkClasses.icon, css({ marginRight: -3 }))}
        />
      }
      leftSectionWidth={34}
      variant="default"
      size="xs"
    />
  );
}
