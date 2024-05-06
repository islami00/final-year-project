import { TMAModal } from '../../../../../components/TMAModal/TMAModal';
import { Filter } from '../../../../../utils/Filter';
import * as classes from './ListFilters.styles';
import { Modal, ScrollArea } from '@mantine/core';
import { CancelButton } from '../../../../../components/modals/ConfirmModal/CancelButton';
import { ConfirmButton } from '../../../../../components/modals/ConfirmModal/ConfirmButton';

export interface ListFiltersProps {
  content: Filter[];
  onClose: VoidFunction;
}

export function ListFilters(props: ListFiltersProps) {
  const { onClose } = props;
  return (
    <TMAModal opened onClose={onClose} title="Filters" centered>
      <Modal.Body>
        <ScrollArea.Autosize classNames={classes.scrollareaClasses}>
          <div></div>
          <div className={classes.btns}>
            <ConfirmButton color="dark">Add Filter</ConfirmButton>
            <CancelButton>Clear All</CancelButton>
          </div>
        </ScrollArea.Autosize>
      </Modal.Body>
    </TMAModal>
  );
}
