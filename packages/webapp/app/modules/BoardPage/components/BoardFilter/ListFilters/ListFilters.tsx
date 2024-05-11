import { TMAModal } from '../../../../../components/TMAModal/TMAModal';
import { Filter } from '../../../../../utils/Filter';
import * as classes from './ListFilters.styles';
import { Modal, ScrollArea } from '@mantine/core';
import { CancelButton } from '../../../../../components/modals/ConfirmModal/CancelButton';
import { ConfirmButton } from '../../../../../components/modals/ConfirmModal/ConfirmButton';
import { FilterChip } from '../FilterChip/FilterChip';

export interface ListFiltersProps {
  content: Filter[];
  onClose: VoidFunction;
}

export function ListFilters(props: ListFiltersProps) {
  const { onClose, content } = props;
  return (
    <TMAModal opened onClose={onClose} title="Filters" centered>
      <Modal.Body className={classes.body}>
        <ScrollArea classNames={classes.scrollareaClasses}>
          <div className={classes.chips}>
            {content.map((each) => (
              <FilterChip filter={each} />
            ))}
          </div>
        </ScrollArea>
        <div className={classes.btns}>
          <ConfirmButton color="dark">Add Filter</ConfirmButton>
          <CancelButton>Clear All</CancelButton>
        </div>
      </Modal.Body>
    </TMAModal>
  );
}
