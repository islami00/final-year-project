import { ActionIcon, TextInput, type TextInputProps } from '@mantine/core';
import { Form, useSearchParams } from '@remix-run/react';
import { cx } from '@tma/design-system';
import { specialFields } from '../../utils/Form/specialFields';
import * as navbarLinkClasses from '../AppShell/NavbarLink/NavbarLink.styles';
import { Icon } from '../Icon/Icon';
import * as classes from './Search.styles';

export type SearchProps = Omit<TextInputProps, 'defaultValue'>;
export function Search(props: SearchProps) {
  const [search, setSearch] = useSearchParams();

  const currentSearch = search.get(specialFields.q);
  const onReset = () => {
    setSearch((prev) => {
      const newSearch = new URLSearchParams(prev);
      newSearch.delete(specialFields.q);
      return newSearch;
    });
  };
  return (
    <Form method="get" onReset={onReset}>
      <TextInput
        {...props}
        name={specialFields.q}
        defaultValue={currentSearch || ''}
        leftSection={
          <Icon
            name="IconSearch"
            size="s16"
            className={cx(navbarLinkClasses.icon, classes.icon)}
          />
        }
        rightSection={
          currentSearch ? (
            <ActionIcon size="sm" type="reset" variant="subtle" color="white">
              <Icon
                name="IconX"
                size="s16"
                className={navbarLinkClasses.icon}
              />
            </ActionIcon>
          ) : null
        }
        leftSectionWidth={34}
        variant="default"
        size="xs"
      />
    </Form>
  );
}
