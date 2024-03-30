import { Button, Modal, ScrollArea, TextInput } from '@mantine/core';
import { formRoot, submitBtn } from './CreateTask.styles';
import { Form } from '@remix-run/react';
import { TMAModal } from '../../../components/TMAModal/TMAModal';

interface CreateTaskProps {
  onClose: VoidFunction;
}

export function CreateTask(props: CreateTaskProps) {
  const { onClose } = props;
  return (
    <TMAModal
      opened
      onClose={onClose}
      closeOnClickOutside={false}
      closeOnEscape={false}
      title="Create Task"
      centered
    >
      <ScrollArea.Autosize>
        <Modal.Body>
          <Form className={formRoot}>
            <TextInput label="Name" />
            <Button size="xs" type="submit" className={submitBtn}>
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </ScrollArea.Autosize>
    </TMAModal>
  );
}
