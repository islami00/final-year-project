import { ActionIcon } from '@mantine/core';
import {
  AssigneeSelect,
  type AssigneeSelectProps,
} from '../../../../../components/AssigneeSelect/AssigneeSelect';
import { Icon } from '../../../../../components/Icon/Icon';
import { Form, useSubmit } from '@remix-run/react';
import { getFormProps, useForm, useInputControl } from '@conform-to/react';
import * as taskDetailsForm from '../../../logic/taskDetailsForm';
import { taskFetcherKeys } from '../../../../../services/queries/task/taskFetcherKeys';
import { flushSync } from 'react-dom';
import { useRef } from 'react';

type TaskAssigneeProps = AssigneeSelectProps;
export function TaskAssignee(props: TaskAssigneeProps) {
  const submit = useSubmit();

  const [form, fields] = useForm({
    defaultValue: taskDetailsForm.assigneeDefaultData(),
    onSubmit(event) {
      event.preventDefault();
    },
  });

  const assigneeControl = useInputControl(fields.assignee);
  const intentControl = useInputControl(fields.intent);

  const formRef = useRef<HTMLFormElement | null>(null);
  return (
    <Form method="POST" {...getFormProps(form)} ref={formRef}>
      <AssigneeSelect
        {...props}
        target={(_, combobox) => (
          <ActionIcon
            onClick={() => combobox.toggleDropdown()}
            size="lg"
            radius="lg"
            color="dark"
          >
            <Icon name="IconPlus" strokeSize="s24" />
          </ActionIcon>
        )}
        onChange={(value) => {
          flushSync(() => {
            switch (value.type) {
              case 'add':
                assigneeControl.change(value.value.id);
                intentControl.change(
                  taskDetailsForm.TaskDetailsIntent.ADD_ASSIGNEE
                );
                break;
              case 'remove':
                assigneeControl.change(value.value);
                intentControl.change(
                  taskDetailsForm.TaskDetailsIntent.REMOVE_ASSIGNEE
                );
                break;
              default:
                break;
            }
          });

          const fetcherKey = taskFetcherKeys.assignee(fields.assignee.id);
          submit(formRef.current, {
            fetcherKey: fetcherKey,
            navigate: false,
          });
        }}
      />
    </Form>
  );
}
