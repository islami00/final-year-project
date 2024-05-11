import { TMAModal } from '../../../../../components/TMAModal/TMAModal';
import { Filter } from '../../../../../utils/Filter';
import * as classes from './ListFilters.styles';
import { Modal, ScrollArea } from '@mantine/core';
import { CancelButton } from '../../../../../components/modals/ConfirmModal/CancelButton';
import { ConfirmButton } from '../../../../../components/modals/ConfirmModal/ConfirmButton';
import { FilterChip } from '../FilterChip/FilterChip';
import { AddFilter } from '../AddFilter/AddFilter';
import { Status } from '../../../../../models/Status.model';
import { User } from '../../../../../models/User.model';

export interface ListFiltersProps {
  filters: Filter[];
  onClose: VoidFunction;
  onChange: (values: Filter[] | Filter) => void;
  statuses: Status[];
  users: User[];
}

export function ListFilters(props: ListFiltersProps) {
  const { onClose, filters, onChange, statuses, users } = props;
  return (
    <TMAModal opened onClose={onClose} title="Filters" centered>
      <Modal.Body className={classes.body}>
        <ScrollArea classNames={classes.scrollareaClasses}>
          <div className={classes.chips}>
            {filters.map((each) => (
              <FilterChip
                onClear={() =>
                  onChange(filters.filter((filter) => filter.id !== each.id))
                }
                key={each.id}
                filter={each}
              />
            ))}
          </div>
        </ScrollArea>
        <div className={classes.btns}>
          <AddFilter
            statuses={statuses}
            users={users}
            onChange={(filter) => onChange(filters.concat(filter))}
          >
            <ConfirmButton color="dark">Add Filter</ConfirmButton>
          </AddFilter>
          <CancelButton onClick={() => onChange([])}>Clear All</CancelButton>
        </div>
      </Modal.Body>
    </TMAModal>
  );
}
