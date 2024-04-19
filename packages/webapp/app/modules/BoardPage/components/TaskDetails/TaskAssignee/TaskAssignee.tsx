import { useSubmit } from '@remix-run/react';
import {
  AssigneeSelect,
  type AssigneeSelectProps,
} from '../../../../../components/AssigneeSelect/AssigneeSelect';
import { taskFetcherKeys } from '../../../../../services/queries/task/taskFetcherKeys';
import { serialiseFormData } from '../../../../../utils/Form/serialiseFormData';
import { convertChangeEvent } from './TaskAssignee.utils';

type TaskAssigneeProps = AssigneeSelectProps;
export function TaskAssignee(props: TaskAssigneeProps) {
  const submit = useSubmit();

  return (
    <AssigneeSelect
      {...props}
      onChange={(value) => {
        const formSubmit = convertChangeEvent(value);
        const formData = serialiseFormData(formSubmit);
        const fetcherKey = taskFetcherKeys.assignee(formSubmit.assignee);
        submit(formData, {
          fetcherKey: fetcherKey,
          navigate: false,
          method: 'POST',
        });
      }}
    />
  );
}
