import { User } from '../../../models/User.model';
import type { Dictionary } from 'lodash';
import { parseWithZod } from '@conform-to/zod';
import { useFetchers, type Fetcher } from '@remix-run/react';
import * as taskDetailsForm from './taskDetailsForm';
import { mapDefined } from '../../../utils/mapDefined';
import groupBy from 'lodash/fp/groupBy';
import keyBy from 'lodash/fp/keyBy';

interface UseOptimisticAssigneeFetchers {
  addedAssignees: string[];
  removedAssignees: string[];
}
export const groupFetchersByIntent = groupBy<Fetcher>((v) =>
  v.formData?.get('intent')
);
function useOptimisticAssigneeFetchers(): UseOptimisticAssigneeFetchers {
  const fetchers = useFetchers();
  const grouped: Dictionary<Fetcher[] | undefined> =
    groupFetchersByIntent(fetchers);

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
  allData: User[];
}
export interface ApplyOptimisticAssigneeResult {
  selected: Set<string>;
  optimisticAssignees: User[];
}

function applyOptimisticAssignee(
  args: ApplyOptimisticAssigneeArgs
): ApplyOptimisticAssigneeResult {
  const { assignees, added, removed, allData } = args;
  if (assignees.length === 0) {
    return {
      selected: new Set(),
      optimisticAssignees: assignees,
    };
  }

  const dataMap = keyBy((v) => v.id, allData);

  const selectedMap = new Map<string, User>();
  // Place added in front
  added.forEach((value) => selectedMap.set(value, dataMap[value]));
  assignees.forEach((each) => {
    // Don't override optimistic ones
    if (selectedMap.has(each.id)) return;
    selectedMap.set(each.id, each);
  });
  removed.forEach((value) => selectedMap.delete(value));
  return {
    selected: new Set(selectedMap.keys()),
    optimisticAssignees: Array.from(selectedMap.values()),
  };
}

export interface UseOptimisticAssigneesArgs {
  allUsers: User[];
  assignees: User[];
}
export function useOptimisticAssignees(
  args: UseOptimisticAssigneesArgs
): ApplyOptimisticAssigneeResult {
  const { allUsers, assignees } = args;
  const { addedAssignees, removedAssignees } = useOptimisticAssigneeFetchers();

  return applyOptimisticAssignee({
    assignees,
    added: addedAssignees,
    removed: removedAssignees,
    allData: allUsers,
  });
}
