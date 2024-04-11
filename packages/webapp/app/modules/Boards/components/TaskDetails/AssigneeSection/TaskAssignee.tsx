import { getFormProps, useForm, useInputControl } from '@conform-to/react';
import { Form, useSubmit } from '@remix-run/react';
import { useRef } from 'react';
import { flushSync } from 'react-dom';
import {
  AssigneeSelect,
  type AssigneeSelectProps,
} from '../../../../../components/AssigneeSelect/AssigneeSelect';
import { taskFetcherKeys } from '../../../../../services/queries/task/taskFetcherKeys';
import * as taskDetailsForm from '../../../logic/taskDetailsForm';

interface TaskAssigneeProps extends AssigneeSelectProps {
  classNameForm?: string;
}
export function TaskAssignee(props: TaskAssigneeProps) {
  const submit = useSubmit();
  const { classNameForm } = props;

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
    <Form
      method="POST"
      {...getFormProps(form)}
      ref={formRef}
      className={classNameForm}
    >
      <AssigneeSelect
        {...props}
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
