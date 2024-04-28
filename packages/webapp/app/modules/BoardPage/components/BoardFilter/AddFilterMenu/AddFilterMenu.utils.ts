import {
  FilterMetaBase,
  FilterDataType,
  FilterMeta,
} from '../../../../../utils/Filter';

const _addFilterOptions: FilterMetaBase[] = [
  { field: 'title', label: 'Title', dataType: FilterDataType.TEXT },
  { field: 'urgency', label: 'Urgency', dataType: FilterDataType.SELECT },
  {
    field: 'sprintPoints',
    label: 'Sprint Points',
    dataType: FilterDataType.NUMBER,
  },
  {
    field: 'task_assignee_via_taskId.assigneeId',
    label: 'Assignee',
    dataType: FilterDataType.SELECT,
  },
  {
    // Eventually support more complex status filters
    field: 'statusId.name',
    label: 'Status',
    dataType: FilterDataType.SELECT,
  },
  {
    field: 'created',
    label: 'Created At',

    dataType: FilterDataType.DATE,
  },
];
export const addFilterOptions = _addFilterOptions.map<FilterMeta>(
  (each, idx) => ({
    ...each,
    id: `${idx}`,
  })
);
