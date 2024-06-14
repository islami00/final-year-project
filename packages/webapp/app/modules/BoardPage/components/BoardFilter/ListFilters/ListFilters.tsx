import { TMAModal } from '../../../../../components/TMAModal/TMAModal';
import { Filter } from '../../../../../utils/Filter';
import * as classes from './ListFilters.styles';
import { Modal, ScrollArea } from '@mantine/core';
import { CancelButton } from '../../../../../components/modals/ConfirmModal/CancelButton';
import { ConfirmButton } from '../../../../../components/modals/ConfirmModal/ConfirmButton';
import { AddFilter } from '../AddFilter/AddFilter';
import { Status } from '../../../../../models/Status.model';
import { User } from '../../../../../models/User.model';
import { EditFilterChip } from '../EditFilterChip/EditFilterChip';

export interface ListFiltersProps {
  filters: Filter[];
  onClose: VoidFunction;
  onChange: (values: Filter[] | Filter) => void;
  onClear: VoidFunction;
  statuses: Status[];
  users: User[];
}

export function ListFilters(props: ListFiltersProps) {
  const { onClose, filters, onChange, statuses, users, onClear } = props;

  function onEdit(filter: Filter) {
    const final = filters.map((each) => {
      if (each.id === filter.id) return filter;
      return each;
    });
    onChange(final);
  }
  function onAdd(filter: Filter) {
    onChange(filters.concat(filter));
  }

  function onRemove(id: string) {
    return onChange(filters.filter((filter) => filter.id !== id));
  }

  return (
    <TMAModal opened onClose={onClose} title="Filters" centered>
      <Modal.Body className={classes.body}>
        <ScrollArea classNames={classes.scrollareaClasses}>
          <div className={classes.chips}>
            {filters.map((each) => (
              <EditFilterChip
                onChange={onEdit}
                statuses={statuses}
                users={users}
                onClear={() => onRemove(each.id)}
                key={each.id}
                filter={each}
              />
            ))}
          </div>
        </ScrollArea>
        <div className={classes.btns}>
          <AddFilter statuses={statuses} users={users} onChange={onAdd}>
            <ConfirmButton color="dark">Add Filter</ConfirmButton>
          </AddFilter>
          <CancelButton onClick={onClear}>Clear All</CancelButton>
        </div>
      </Modal.Body>
    </TMAModal>
  );
}
