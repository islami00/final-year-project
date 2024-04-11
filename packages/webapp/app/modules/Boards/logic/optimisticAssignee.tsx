import { User } from '../../../models/User.model';
import type { Dictionary } from 'lodash';
import { parseWithZod } from '@conform-to/zod';
import { useFetchers, type Fetcher } from '@remix-run/react';
import * as taskDetailsForm from './taskDetailsForm';
import { mapDefined } from '../../../utils/mapDefined';
import groupBy from 'lodash/fp/groupBy';

interface UseOptimisticAssigneeFetchers {
  addedAssignees: string[];
  removedAssignees: string[];
}
export function useOptimisticAssigneeFetchers(): UseOptimisticAssigneeFetchers {
  const fetchers = useFetchers();

  const grouped: Dictionary<Fetcher[] | undefined> = groupBy(
    (v) => v.formData?.get('intent'),
    fetchers
  );

  const adding = grouped[taskDetailsForm.TaskDetailsIntent.ADD_ASSIGNEE] || [];
  const removing =
    grouped[taskDetailsForm.TaskDetailsIntent.REMOVE_ASSIGNEE] || [];

  const addedAssignees = mapDefined(adding, parseAssigneeFetcher);
  const removedAssignees = mapDefined(removing, parseAssigneeFetcher);
  return { addedAssignees, removedAssignees };
}
const parseAssigneeFetcher = (fetcher: Fetcher): string | undefined => {
  if (!fetcher.formData) {
    return undefined;
  }
  const submission = parseWithZod(fetcher.formData, {
    schema: taskDetailsForm.assigneesSchema,
  });
  if (submission.status !== 'success') return undefined;
  const { value } = submission;
  return value.assignee;
};

interface ApplyOptimisticAssigneeArgs {
  assignees: User[];
  added: string[];
  removed: string[];
  allData: Dictionary<User>;
}
export function applyOptimisticAssignee(args: ApplyOptimisticAssigneeArgs) {
  const { assignees, added, removed, allData } = args;
  const selectedMap = new Map(assignees.map((each) => [each.id, each]));
  added.forEach((value) => {
    selectedMap.set(value, allData[value]);
  });
  removed.forEach((value) => {
    selectedMap.delete(value);
  });

  return {
    selected: new Set(selectedMap.keys()),
    newAssignees: Array.from(selectedMap.values()),
  };
}
