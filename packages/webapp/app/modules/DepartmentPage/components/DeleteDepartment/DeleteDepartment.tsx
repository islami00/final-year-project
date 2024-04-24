import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { useNavigation, useSubmit } from '@remix-run/react';
import { specialFields } from '../../../../utils/Form/specialFields';
import { CancelButton } from '../../../../components/modals/ConfirmModal/CancelButton';
import { ConfirmButton } from '../../../../components/modals/ConfirmModal/ConfirmButton';
import { ConfirmModal } from '../../../../components/modals/ConfirmModal/ConfirmModal';
import { departmentFetcherKeys } from '../../../../services/queries/department/departmentFetcherKeys';
import { serialiseFormData } from '../../../../utils/Form/serialiseFormData';
import * as departmentIdForm from '../../logic/departmentIdForm';

export interface DeleteDepartmentProps {
  deptId: string;
}

function DeleteDepartmentModal(props: DeleteDepartmentProps) {
  const { deptId } = props;

  const modal = useModal();

  const onClose = () => modal.remove();
  const submit = useSubmit();
  const navigation = useNavigation();
  const handleSubmit = () => {
    const formData: departmentIdForm.DeleteDepartmentFormData = {
      intent: departmentIdForm.DepartmentIdFormIntent.DELETE_DEPARTMENT,
      deptId,
    };
    submit(serialiseFormData(formData), {
      method: 'post',
      fetcherKey: departmentFetcherKeys.deleteFilter(deptId),
    });
  };
  const isSubmitting =
    navigation.state !== 'idle' &&
    navigation.formData?.get(specialFields.intent) ===
      departmentIdForm.DepartmentIdFormIntent.DELETE_DEPARTMENT;

  return (
    <ConfirmModal onClose={onClose}>
      <ConfirmButton color="red" loading={isSubmitting} onClick={handleSubmit}>
        Delete
      </ConfirmButton>
      <CancelButton onClick={onClose}>Cancel</CancelButton>
    </ConfirmModal>
  );
}
export const DeleteDepartment = NiceModal.create(DeleteDepartmentModal);
