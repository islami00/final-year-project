import * as React from 'react';
import { BoardFilterButton } from '../BoardFilterButton/BoardFilterButton';
import { Filter } from '../../../../../utils/Filter';
import { useDisclosure } from '@mantine/hooks';
import { ListFilters, type ListFiltersProps } from '../ListFilters/ListFilters';

export interface ListFiltersButtonProps
  extends Pick<
    ListFiltersProps,
    'statuses' | 'users' | 'onChange' | 'onClear'
  > {
  filters: Filter[];
}

export function ListFiltersButton(props: ListFiltersButtonProps) {
  const { filters, ...rest } = props;
  const [opened, toggle] = useDisclosure();
  return (
    <>
      <BoardFilterButton onClick={toggle.open} active count={filters.length} />
      {opened ? (
        <ListFilters {...rest} filters={filters} onClose={toggle.close} />
      ) : null}
    </>
  );
}
