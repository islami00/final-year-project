import * as React from 'react';
import { BoardFilterButton } from '../BoardFilterButton/BoardFilterButton';
import { Filter } from '../../../../../utils/Filter';
import { useDisclosure } from '@mantine/hooks';
import { ListFilters } from '../ListFilters/ListFilters';

export interface ListFiltersButtonProps {
  filters: Filter[];
}

export function ListFiltersButton(props: ListFiltersButtonProps) {
  const { filters } = props;
  const [opened, toggle] = useDisclosure();
  return (
    <>
      <BoardFilterButton onClick={toggle.open} active count={filters.length} />
      {opened ? <ListFilters content={filters} onClose={toggle.close} /> : null}
    </>
  );
}
