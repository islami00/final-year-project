import {
  PrioritySelect,
  PrioritySelectProps,
} from '../../../../../components/PrioritySelect/PrioritySelect';
import { Priority } from '../../../../../models/Task.model';
import * as taskDetailsForm from '../../../logic/taskDetailsForm';
import { serialiseFormData } from '../../../../../utils/Form/serialiseFormData';
import { useSubmit } from '@remix-run/react';
import { taskFetcherKeys } from '../../../../../services/queries/task/taskFetcherKeys';
export interface TaskPriorityProps
  extends Omit<PrioritySelectProps, 'onChange' | 'value'> {
  taskId: string;
}

export function TaskPriority(props: TaskPriorityProps) {
  const { taskId } = props;
  const submit = useSubmit();

  function submitValue(value: Priority) {
    const formData: taskDetailsForm.PriorityFormData = {
      intent: taskDetailsForm.TaskDetailsIntent.PRIORITY,
      priority: value,
    };

    submit(serialiseFormData(formData), {
      method: 'post',
      fetcherKey: taskFetcherKeys.priorityFilter(taskId),
      navigate: false,
    });
  }
  return <PrioritySelect onChange={submitValue} {...props} />;
}
