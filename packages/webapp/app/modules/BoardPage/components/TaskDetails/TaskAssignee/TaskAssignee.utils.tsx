import { type SelectAssigneeAction } from '../../../../../components/AssigneeSelect/AssigneeSelect';
import * as taskDetailsForm from '../../../logic/taskDetailsForm';

export function convertChangeEvent(
  action: SelectAssigneeAction
): taskDetailsForm.AssigneesFormData {
  switch (action.type) {
    case 'remove':
      return {
        assignee: action.value,
        intent: taskDetailsForm.TaskDetailsIntent.REMOVE_ASSIGNEE,
      };
    case 'add':
      return {
        assignee: action.value.value,
        intent: taskDetailsForm.TaskDetailsIntent.ADD_ASSIGNEE,
      };
    default:
      return action;
  }
}
