import {
  SubmissionResult,
  getFormProps,
  getInputProps,
  useForm,
} from '@conform-to/react';
import { parseWithYup } from '@conform-to/yup';
import { Button, TextInput } from '@mantine/core';
import { Form, useActionData } from '@remix-run/react';
import { CreateModal } from '../../../../components/modals/CreateModal/CreateModal';
import * as createTaskForm from '../../logic/createTaskForm';
import { formRoot, submitBtn } from './CreateTask.styles';
import { hiddenInputs } from '../../../../utils/Form/hiddenInputs';

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
    <CreateModal onClose={onClose} title="Create Task">
      <Form method="post" className={formRoot} {...getFormProps(form)}>
        <TextInput
          label="Title"
          {...getInputProps(fields.title, { type: 'text' })}
          key={fields.title.key}
        />
        {hiddenInputs([
          { field: fields.boardId, value: boardId },
          { field: fields.statusId, value: defaultStatusId },
        ])}

        <Button size="xs" type="submit" className={submitBtn}>
          Submit
        </Button>
      </Form>
    </CreateModal>
  );
}
