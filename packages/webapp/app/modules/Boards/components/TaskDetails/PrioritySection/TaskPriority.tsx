import {
  getFormProps,
  getInputProps,
  useForm,
  useInputControl,
} from '@conform-to/react';

import { useRef } from 'react';
import {
  PrioritySelect,
  PrioritySelectProps,
} from '../../../../../components/PrioritySelect/PrioritySelect';
import { Priority } from '../../../../../models/Task.model';
import { getOptimisticFetcherData } from '../../../../../utils/formUtils';
import * as taskDetailsForm from '../../../logic/taskDetailsForm';
import { useCurrentPriorityValue } from '../../../logic/useCurrentPriorityValue';
import { flushSync } from 'react-dom';

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

  const [form, fields] = useForm({
    lastResult: getOptimisticFetcherData(fetcher),
    defaultValue: taskDetailsForm.priorityDefaultData(currentPriority),
  });

  const priorityController = useInputControl(fields.priority);
  const submitInput = useRef<null | HTMLInputElement>(null);

  return (
    <fetcher.Form {...getFormProps(form)} method="POST">
      <PrioritySelect
        value={(priorityController.value || null) as Priority | null}
        onChange={(value) => {
          flushSync(() => {
            priorityController.change(value);
          });
          submitInput.current?.click();
        }}
        {...props}
      />
      <input
        {...getInputProps(fields.intent, { type: 'hidden' })}
        key={fields.intent.key}
      />
      <input type="submit" hidden ref={submitInput} />
    </fetcher.Form>
  );
}
