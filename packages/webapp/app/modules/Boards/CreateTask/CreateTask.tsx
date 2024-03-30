import { Modal } from '@mantine/core';
import { Icon } from '../../../components/Icon/Icon';

interface CreateTaskProps {
  onClose: VoidFunction;
}
export function CreateTask(props: CreateTaskProps) {
  const { onClose } = props;
  return (
    <Modal
      opened
      onClose={onClose}
      title="Create Task"
      closeOnClickOutside={false}
      closeOnEscape={false}
      closeButtonProps={{
        icon: <Icon name="IconX" size="s16" strokeSize="s24" color="#fff" />,
      }}
    >
      Create Task Route
    </Modal>
  );
}
