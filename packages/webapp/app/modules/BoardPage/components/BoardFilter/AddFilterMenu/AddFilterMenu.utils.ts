import type { Dictionary } from 'lodash';
import {
  FilterMetaBase,
  FilterDataType,
  FilterMeta,
} from '../../../../../utils/Filter';

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
    field: 'urgency',
    label: 'Urgency',
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

const _addFilterOptions = Object.values(
  TaskFilterFields as Dictionary<FilterMetaBase>
);
export const addFilterOptions = _addFilterOptions.map<FilterMeta>(
  (each, idx) => ({
    ...each,
    id: `${idx}`,
  })
);
