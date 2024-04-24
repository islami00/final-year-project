import { useDisclosure } from '@mantine/hooks';
import { CancelButton } from '../../../../../components/modals/ConfirmModal/CancelButton';
import { ConfirmButton } from '../../../../../components/modals/ConfirmModal/ConfirmButton';
import { ConfirmModal } from '../../../../../components/modals/ConfirmModal/ConfirmModal';
import * as taskDetailsForm from '../../../logic/taskDetailsForm';
import { useFetcher } from '@remix-run/react';
import { taskFetcherKeys } from '../../../../../services/queries/task/taskFetcherKeys';
import { serialiseFormData } from '../../../../../utils/Form/serialiseFormData';

export interface DeleteTaskProps {
  target: (onClick: VoidFunction) => void;
  taskId: string;
}

export function DeleteTask(props: DeleteTaskProps) {
  const [opened, toggle] = useDisclosure();
  const { target, taskId } = props;
  const fetcher = useFetcher({
    key: taskFetcherKeys.deleteFilter(taskId),
  });
  const handleSubmit = () => {
    const formData: taskDetailsForm.DeleteTaskFormData = {
      intent: taskDetailsForm.TaskDetailsIntent.DELETE_TASK,
      taskId,
    };
    fetcher.submit(serialiseFormData(formData), {
      method: 'post',
    });
  };
  return (
    <>
      {target(toggle.open)}
      {opened ? (
        <ConfirmModal onClose={toggle.close}>
          <ConfirmButton
            color="red"
            loading={fetcher.state !== 'idle'}
            onClick={handleSubmit}
          >
            Delete
          </ConfirmButton>
          <CancelButton onClick={toggle.close}>Cancel</CancelButton>
        </ConfirmModal>
      ) : null}
    </>
  );
}
