import { Modal } from '@mantine/core';
import { css } from '@tma/design-system';
import { TMAModal } from '../../../../components/TMAModal/TMAModal';
import { Task } from '../../../../models/Task.model';
import * as classes from './TaskDetails.styles';
import { TaskTitle } from './TaskTitle/TaskTitle';
import { TaskDetailsRightSection } from './TaskDetailsRightSection/TaskDetailsRightSection';

export interface TaskDetailsProps {
  task: Task;
  onClose: VoidFunction;
}

export function TaskDetails(props: TaskDetailsProps) {
  const { task, onClose } = props;
  return (
    <TMAModal
      classNames={classes.modalClassNames}
      opened
      onClose={onClose}
      title={<TaskTitle defaultValue={task.title} />}
      size="786px"
    >
      <Modal.Body>
        <div className={css({ textStyle: 'lgBold' })}>Left</div>
        <TaskDetailsRightSection />
      </Modal.Body>
    </TMAModal>
  );
}
