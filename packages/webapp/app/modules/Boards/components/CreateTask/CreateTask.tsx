import { Button, Modal, ScrollArea, TextInput } from '@mantine/core';
import { formRoot, submitBtn } from './CreateTask.styles';
import { Form, useActionData } from '@remix-run/react';
import { TMAModal } from '../../../../components/TMAModal/TMAModal';
import { SubmissionResult, getInputProps, useForm } from '@conform-to/react';
import * as createTaskForm from '../../logic/createTaskForm';
import { parseWithYup } from '@conform-to/yup';

interface CreateTaskProps {
  onClose: VoidFunction;
  boardId: string;
  defaultStatusId: string;
}

export function CreateTask(props: CreateTaskProps) {
  const { onClose, boardId, defaultStatusId } = props;
  const lastResult = useActionData<SubmissionResult>();
  const [form, fields] = useForm<createTaskForm.CreateTaskData>({
    lastResult,
    defaultValue: createTaskForm.defaultData(boardId),
    onValidate({ formData }) {
      return parseWithYup(formData, {
        schema: createTaskForm.schema,
      });
    },
    shouldRevalidate: 'onBlur',
  });

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
          <Form
            method="post"
            className={formRoot}
            id={form.id}
            onSubmit={form.onSubmit}
          >
            <TextInput
              label="Title"
              {...getInputProps(fields.title, { type: 'text' })}
            />
            <input
              {...getInputProps(fields.boardId, {
                type: 'hidden',
                value: false,
              })}
              value={boardId}
            />
            <input
              {...getInputProps(fields.statusId, {
                type: 'hidden',
                value: false,
              })}
              value={defaultStatusId}
            />
            <Button size="xs" type="submit" className={submitBtn}>
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </ScrollArea.Autosize>
    </TMAModal>
  );
}
