import { User } from '../../models/User.model';
import { AssigneeData } from './AssigneeSelect.types';

export function mapToAssigneeData(value: User): AssigneeData {
  return {
    avatar: value.avatar,
    id: value.id,
    name: value.name,
  };
}
export function filterData(data: AssigneeData[], search: string) {
  if (!search) return data;
  return data.filter((each) => each.name.includes(search.toLowerCase()));
}
