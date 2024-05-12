import { Button, Modal, TextInput } from '@mantine/core';
import { TMAModal } from '../../../../../components/TMAModal/TMAModal';
import * as classes from './SaveNewFilter.styles';
import { SavedFilter } from '../../../../../models/SavedFilter.model';
import { submitBtn } from '../../../../../styles/utils.styles';

export interface SaveNewFilterProps {
  onClose: VoidFunction;
  filter: SavedFilter;
}

export function SaveNewFilter(props: SaveNewFilterProps) {
  const { onClose, filter } = props;
  return (
    <TMAModal opened onClose={onClose} title="Save Filter" centered>
      <Modal.Body className={classes.body}>
        <TextInput placeholder="Filter Name" />
        <Button size="xs" className={submitBtn}>
          Save
        </Button>
      </Modal.Body>
    </TMAModal>
  );
}
