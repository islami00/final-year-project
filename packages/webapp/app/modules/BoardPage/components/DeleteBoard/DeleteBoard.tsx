import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { useNavigation, useSubmit } from '@remix-run/react';
import { CancelButton } from '../../../../components/modals/ConfirmModal/CancelButton';
import { ConfirmButton } from '../../../../components/modals/ConfirmModal/ConfirmButton';
import { ConfirmModal } from '../../../../components/modals/ConfirmModal/ConfirmModal';
import * as boardIdForm from '../../../../routes/app.$orgId.boards.$boardId/form';
import { departmentFetcherKeys } from '../../../../services/queries/department/departmentFetcherKeys';
import { serialiseFormData } from '../../../../utils/Form/serialiseFormData';
import { specialFields } from '../../../../utils/Form/specialFields';

export interface DeleteBoardProps {
  boardId: string;
}

function DeleteBoardModal(props: DeleteBoardProps) {
  const { boardId } = props;

  const modal = useModal();

  const onClose = () => modal.remove();
  const submit = useSubmit();
  const navigation = useNavigation();
  const handleSubmit = () => {
    const formData: boardIdForm.DeleteBoardFormData = {
      intent: boardIdForm.BoardIdFormIntent.DELETE_BOARD,
      boardId,
    };
    submit(serialiseFormData(formData), {
      method: 'post',
      fetcherKey: departmentFetcherKeys.deleteFilter(boardId),
    });
  };
  const isSubmitting =
    navigation.state !== 'idle' &&
    navigation.formData?.get(specialFields.intent) ===
      boardIdForm.BoardIdFormIntent.DELETE_BOARD;
  console.log(navigation.formAction);
  return (
    <ConfirmModal onClose={onClose}>
      <ConfirmButton color="red" loading={isSubmitting} onClick={handleSubmit}>
        Delete
      </ConfirmButton>
      <CancelButton onClick={onClose}>Cancel</CancelButton>
    </ConfirmModal>
  );
}
export const DeleteBoard = NiceModal.create(DeleteBoardModal);
