import { StatusSelect } from '../../../../../components/StatusSelect/StatusSelect';
import { Status } from '../../../../../models/Status.model';
import { StatusSelectTarget } from '../../../../../components/StatusSelect/StatusSelectTarget';
import { useCurrentStatus } from '../../../logic/useCurrentStatus';
import * as taskDetailsForm from '../../../logic/taskDetailsForm';
import { serialiseFormData } from '../../../../../utils/Form/serialiseFormData';
export interface StatusSectionProps {
  taskId: string;
  statuses: Status[];
  defaultValue: string;
}

export function StatusSection(props: StatusSectionProps) {
  const { defaultValue, statuses, taskId } = props;
  const { statusObject, fetcher } = useCurrentStatus({
    taskId,
    statuses,
    defaultValue,
  });
  return (
    <StatusSelect
      onChange={(statusId) => {
        const statusForm: taskDetailsForm.StatusFormData = {
          intent: taskDetailsForm.TaskDetailsIntent.STATUS,
          statusId,
        };
        fetcher.submit(serialiseFormData(statusForm), { method: 'post' });
      }}
      target={(ctx) => (
        <StatusSelectTarget bg={statusObject.color} onClick={ctx.onClick}>
          {statusObject.name}
        </StatusSelectTarget>
      )}
      data={statuses}
    />
  );
}
