import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Modal, TextInput } from '@mantine/core';
import { useForm } from 'react-hook-form';
import { TMAModal } from '../../../../../components/TMAModal/TMAModal';
import { SavedFilter } from '../../../../../models/SavedFilter.model';
import { submitBtn } from '../../../../../styles/utils.styles';
import * as saveNewFilterForm from '../../../logic/saveNewFilterForm';
import * as classes from './SaveNewFilter.styles';
import { useSubmitSaveNewFilter } from '../../../logic/useSubmitSaveNewFilter';
import NiceModal, { useModal } from '@ebay/nice-modal-react';

export interface SaveNewFilterProps {
  /** Index for NiceModal */
  [key: string]: unknown;
  filter: SavedFilter;
}

export const SaveNewFilter = NiceModal.create((props: SaveNewFilterProps) => {
  const { filter } = props;
  const modal = useModal();

  const form = useForm({
    defaultValues: saveNewFilterForm.defaultData(),
    resolver: zodResolver(saveNewFilterForm.uiSchema),
  });

  const { handleError, handleSubmit } = useSubmitSaveNewFilter({ filter });
  return (
    <TMAModal opened onClose={modal.remove} title="Save Filter" centered>
      <Modal.Body className={classes.body} component="form">
        <TextInput placeholder="Filter Name" {...form.register('name')} />
        <Button
          onClick={form.handleSubmit(handleSubmit, handleError)}
          size="xs"
          className={submitBtn}
        >
          Save
        </Button>
      </Modal.Body>
    </TMAModal>
  );
});
