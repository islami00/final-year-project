import { Modal, ScrollArea } from '@mantine/core';
import { P } from '../../../../components/P';
import { TMAModal } from '../../../../components/TMAModal/TMAModal';
import { Task } from '../../../../models/Task.model';
import { DescriptionSection } from './DescriptionSection/DescriptionSection';
import * as classes from './TaskDetails.styles';
import { TaskDetailsRightSection } from './TaskDetailsRightSection/TaskDetailsRightSection';
import { TaskTitle } from './TaskTitle/TaskTitle';

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
      <ScrollArea>
        <Modal.Body>
          <div className={classes.leftSection}>
            <div className={classes.actions}>
              <P textStyle="2xs">Example action</P>
            </div>
            <div className={classes.descriptionSection}>
              <P textStyle="mdBold">Description</P>
              <DescriptionSection defaultValue={task.description} />
            </div>
          </div>
          <TaskDetailsRightSection />
        </Modal.Body>
      </ScrollArea>
    </TMAModal>
  );
}
