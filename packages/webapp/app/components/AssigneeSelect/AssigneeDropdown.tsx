import { Combobox } from '@mantine/core';
import { useState } from 'react';
import { AssigneeItem } from './AssigneeItem';
import { AssigneeData } from './AssigneeSelect.types';
import { filterData } from './AssigneeSelect.utils';

interface AssigneeDropdownProps {
  data: AssigneeData[];
  values: Set<string>;
}
export function AssigneeDropdown(props: AssigneeDropdownProps) {
  const { data, values } = props;
  const [search, setSearch] = useState('');

  const filtered = filterData(data, search);
  const hasData = filtered.length > 0;

  return (
    <Combobox.Dropdown>
      <Combobox.Search
        value={search}
        onChange={(event) => setSearch(event.currentTarget.value)}
        placeholder="Search members"
      />
      <Combobox.Options>
        {hasData ? (
          filtered.map((each) => (
            <AssigneeItem
              key={each.id}
              each={each}
              selected={values.has(each.id)}
            />
          ))
        ) : (
          <Combobox.Empty>Nothing Found...</Combobox.Empty>
        )}
      </Combobox.Options>
    </Combobox.Dropdown>
  );
}
