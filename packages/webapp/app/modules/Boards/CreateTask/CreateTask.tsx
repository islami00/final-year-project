import { Modal } from '@mantine/core';
import { Icon } from '../../../components/Icon';
import { modalClasses } from './CreateTask.styles';

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
      classNames={modalClasses}
      closeButtonProps={{
        icon: <Icon name="IconX" size="s16" strokeSize="s24" color="#fff" />,
      }}
    >
      Create Task Route
    </Modal>
  );
}
