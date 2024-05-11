import type { Dictionary } from 'lodash';
import { FilterMetaBase, FilterDataType, FilterMeta } from '../Filter';

interface TaskFilterOptions {
  [key: string]: unknown;
  title: FilterMetaBase;
  urgency: FilterMetaBase;
  sprintPoints: FilterMetaBase;
  assignee: FilterMetaBase;
  status: FilterMetaBase;
  created: FilterMetaBase;
}
export const TaskFilterFields: TaskFilterOptions = {
  title: { field: 'title', label: 'Title', dataType: FilterDataType.TEXT },
  urgency: {
    field: 'priority',
    label: 'Priority',
    dataType: FilterDataType.SELECT,
  },

  sprintPoints: {
    field: 'sprintPoints',
    label: 'Sprint Points',
    dataType: FilterDataType.NUMBER,
  },
  assignee: {
    field: 'task_assignee_via_taskId.assigneeId',
    label: 'Assignee',
    dataType: FilterDataType.SELECT,
    isListType: true,
  },
  status: {
    // Eventually support more complex status filters
    field: 'statusId.name',
    label: 'Status',
    dataType: FilterDataType.SELECT,
  },
  created: {
    field: 'created',
    label: 'Created At',
    dataType: FilterDataType.DATE,
  },
};

const _taskFilterOptions = Object.values(
  TaskFilterFields as Dictionary<FilterMetaBase>
);
export const taskFilterOptions = _taskFilterOptions.map<FilterMeta>(
  (each, idx) => ({
    ...each,
    id: `${idx}`,
  })
);
