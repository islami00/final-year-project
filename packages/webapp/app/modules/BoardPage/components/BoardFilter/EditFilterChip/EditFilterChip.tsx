import * as React from 'react';
import { FilterChip, FilterChipProps } from '../FilterChip/FilterChip';
import { useState } from 'react';
import { Filter } from '../../../../../utils/Filter';
import { FilterValueDialog } from '../FilterValueDialog';
import { User } from '../../../../../models/User.model';
import { Status } from '../../../../../models/Status.model';
import { mapFilterToFormData } from './EditFilterChip.utils';

interface EditFilterChipProps extends FilterChipProps {
  onChange: (filter: Filter) => void;
  users: User[];
  statuses: Status[];
}
export function EditFilterChip(props: EditFilterChipProps) {
  const { onChange, users, statuses, ...rest } = props;
  const [filter, setFilter] = useState<Filter | null>(null);
  return (
    <>
      {filter ? (
        <FilterValueDialog
          meta={filter.meta}
          onChange={onChange}
          users={users}
          defaultValues={mapFilterToFormData(filter)}
          statuses={statuses}
          onClose={() => setFilter(null)}
        />
      ) : null}
      <FilterChip onOpen={setFilter} {...rest} />
    </>
  );
}
