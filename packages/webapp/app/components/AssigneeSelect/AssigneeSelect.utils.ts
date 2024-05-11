import { User } from '../../models/User.model';
import { AssigneeData } from './AssigneeSelect.types';

export function mapToAssigneeData(value: User): AssigneeData {
  return {
    avatar: value.avatar,
    value: value.id,
    label: value.name,
    
  };
}
export function filterData(data: AssigneeData[], search: string) {
  if (!search) return data;
  return data.filter((each) => each.label.includes(search.toLowerCase()));
}
