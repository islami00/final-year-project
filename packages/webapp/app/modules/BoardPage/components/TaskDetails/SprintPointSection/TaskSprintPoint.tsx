import { useSubmit } from '@remix-run/react';
import {
  SprintPointSelect,
  SprintPointSelectProps,
} from '../../../../../components/SprintPointSelect/SprintPointSelect';
import { taskFetcherKeys } from '../../../../../services/queries/task/taskFetcherKeys';
import { serialiseFormData } from '../../../../../utils/Form/serialiseFormData';
import * as taskDetailsForm from '../../../logic/taskDetailsForm';
export interface TaskSprintPointProps
  extends Omit<SprintPointSelectProps, 'onChange'> {
  taskId: string;
}

export function TaskSprintPoint(props: TaskSprintPointProps) {
  const { taskId } = props;
  const submit = useSubmit();

  function submitValue(value: number) {
    const formData: taskDetailsForm.SprintPointsFormData = {
      intent: taskDetailsForm.TaskDetailsIntent.SPRINT_POINTS,
      sprintPoints: value,
    };

    submit(serialiseFormData(formData), {
      method: 'post',
      fetcherKey: taskFetcherKeys.sprintPointsFilter(taskId),
      navigate: false,
    });
  }
  return <SprintPointSelect onChange={submitValue} {...props} />;
}
