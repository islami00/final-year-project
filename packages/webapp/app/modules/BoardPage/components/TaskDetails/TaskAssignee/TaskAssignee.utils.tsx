import { type SelectAssigneeAction } from '../../../../../components/AssigneeSelect/AssigneeSelect';
import * as taskDetailsForm from '../../../logic/taskDetailsForm';

export function convertChangeEvent(
  value: SelectAssigneeAction
): taskDetailsForm.AssigneesFormData {
  switch (value.type) {
    case 'remove':
      return {
        assignee: value.value,
        intent: taskDetailsForm.TaskDetailsIntent.REMOVE_ASSIGNEE,
      };
    case 'add':
      return {
        assignee: value.value.value,
        intent: taskDetailsForm.TaskDetailsIntent.ADD_ASSIGNEE,
      };
    default:
      return value;
  }
}
