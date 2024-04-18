import { TextInput, type TextInputProps } from '@mantine/core';
import { Icon } from '../Icon/Icon';
import * as navbarLinkClasses from '../AppShell/NavbarLink/NavbarLink.styles';
import { cx } from '@tma/design-system';
import * as classes from './Search.styles';

export type SearchProps = TextInputProps;
export function Search(props: SearchProps) {
  return (
    <TextInput
      {...props}
      leftSection={
        <Icon
          name="IconSearch"
          size="s16"
          className={cx(navbarLinkClasses.icon, classes.icon)}
        />
      }
      leftSectionWidth={34}
      variant="default"
      size="xs"
    />
  );
}
