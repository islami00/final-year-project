import { Modal, ScrollArea } from '@mantine/core';
import { P } from '../../../../components/P';
import { TMAModal } from '../../../../components/TMAModal/TMAModal';
import { Task } from '../../../../models/Task.model';
import { DescriptionSection } from './DescriptionSection/DescriptionSection';
import * as classes from './TaskDetails.styles';
import { TaskDetailsRightSection } from './TaskDetailsRightSection/TaskDetailsRightSection';
import { TaskTitle } from './TaskTitle/TaskTitle';
import { User } from '../../../../models/User.model';
import { ActionSection } from './ActionSection/ActionSection';

export interface TaskDetailsProps {
  task: Task;
  onClose: VoidFunction;
  assignees: User[];
  allUsers: User[];
}

export function TaskDetails(props: TaskDetailsProps) {
  const { task, onClose, assignees, allUsers } = props;

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
            <ActionSection allUsers={allUsers} assignees={assignees} />
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
