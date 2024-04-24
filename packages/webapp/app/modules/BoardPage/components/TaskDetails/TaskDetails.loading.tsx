import { Modal, Skeleton } from '@mantine/core';
import { TMAModal } from '../../../../components/TMAModal/TMAModal';
import { modalClassNames } from './TaskDetails.styles';

export interface TaskDetailsLoadingProps {
  onClose: VoidFunction;
}

export function TaskDetailsLoading(props: TaskDetailsLoadingProps) {
  const { onClose } = props;
  return (
    <TMAModal
      classNames={modalClassNames}
      opened
      onClose={onClose}
      title={<Skeleton width="100%" height="28px" />}
      size="786px"
    >
      <Modal.Body>
        <Skeleton height="100%" />
        <Skeleton height="35%" />
      </Modal.Body>
    </TMAModal>
  );
}
