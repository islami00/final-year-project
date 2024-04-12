import {
  PrioritySelect,
  PrioritySelectProps,
} from '../../../../../components/PrioritySelect/PrioritySelect';
import { Priority } from '../../../../../models/Task.model';
import * as taskDetailsForm from '../../../logic/taskDetailsForm';
import { useCurrentPriorityValue } from '../../../logic/useCurrentPriorityValue';
import { serialiseFormData } from '../../../../../utils/Form/serialiseFormData';
export interface TaskPriorityProps
  extends Omit<PrioritySelectProps, 'onChange' | 'value'> {
  taskId: string;
  defaultValue: Priority | null;
}

export function TaskPriority(props: TaskPriorityProps) {
  const { taskId, defaultValue } = props;
  const { fetcher, currentPriority } = useCurrentPriorityValue(
    taskId,
    defaultValue
  );

  function submitValue(value: Priority) {
    const formData: taskDetailsForm.PriorityFormData = {
      intent: taskDetailsForm.TaskDetailsIntent.PRIORITY,
      priority: value,
    };

    fetcher.submit(serialiseFormData(formData), { method: 'post' });
  }
  return (
    <>
      <PrioritySelect
        value={currentPriority}
        onChange={submitValue}
        {...props}
      />
    </>
  );
}
