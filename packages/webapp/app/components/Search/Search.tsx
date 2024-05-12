import { ActionIcon, TextInput, type TextInputProps } from '@mantine/core';
import { Form, useSearchParams } from '@remix-run/react';
import { useQueryClient, type QueryKey } from '@tanstack/react-query';
import { cx } from '@tma/design-system';
import { memo } from 'react';
import { specialFields } from '../../utils/Form/specialFields';
import * as navbarLinkClasses from '../AppShell/NavbarLink/NavbarLink.styles';
import { Icon } from '../Icon/Icon';
import * as classes from './Search.styles';
import { removeSearchQueries } from '../../utils/removeSearchQueries';

export interface SearchProps extends Omit<TextInputProps, 'defaultValue'> {
  queryKeys: QueryKey[];
}
export const Search = memo((props: SearchProps) => {
  const { queryKeys, ...rest } = props;
  const [search, setSearch] = useSearchParams();
  const queryClient = useQueryClient();

  const currentSearch = search.get(specialFields.q);

  function onReset() {
    setSearch((prev) => {
      const newSearch = new URLSearchParams(prev);
      newSearch.delete(specialFields.q);
      return newSearch;
    });
    removeSearchQueries(queryClient, queryKeys);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    const formData = new FormData(e.currentTarget);
    const currentQ = formData.get(specialFields.q);
    if (currentSearch === currentQ) {
      e.preventDefault();
    } else {
      removeSearchQueries(queryClient, queryKeys);
    }
  }
  return (
    <Form onSubmit={handleSubmit} method="get" onReset={onReset}>
      <TextInput
        {...rest}
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
});
