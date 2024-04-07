import { Task } from '../../../../models/Task.model';
import * as React from 'react';
import { modalClassNames } from './TaskDetails.styles';
import { TMAModal } from '../../../../components/TMAModal/TMAModal';
import { Modal } from '@mantine/core';
import { css } from '@tma/design-system';
import { TaskTitle } from './TaskTitle';

export interface TaskDetailsProps {
  task: Task;
  onClose: VoidFunction;
}

export function TaskDetails(props: TaskDetailsProps) {
  const { task, onClose } = props;
  return (
    <TMAModal
      classNames={modalClassNames}
      opened
      onClose={onClose}
      title={<TaskTitle defaultValue={task.title} />}
      size="786px"
    >
      <Modal.Body>
        <div className={css({ textStyle: 'lgBold' })}>Left</div>
        <div>Right</div>
      </Modal.Body>
    </TMAModal>
  );
}
