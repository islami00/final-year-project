import { parseWithZod } from '@conform-to/zod';
import { useFetchers, type Fetcher } from '@remix-run/react';
import _ from 'lodash';
import { Department } from '../../../models/Department.model';
import { departmentFetcherKeys } from '../../../services/queries/department/departmentFetcherKeys';
import { mapDefined } from '../../../utils/mapDefined';
import * as departmentIdForm from './departmentIdForm';

interface UseCurrentDepartmentNameArgs<T extends Department> {
  departmentsOrDepartment: T[] | T;
}

/**
 * @description Merges all departments with their in-flight data.
 */
export function useCurrentDepartments<T extends Department>(
  args: UseCurrentDepartmentNameArgs<T>
) {
  const { departmentsOrDepartment } = args;
  const fetchers = useFetchers();
  const changes = mapDefined(fetchers, (fetcher) => {
    // Ignore uninteresting
    if (!fetcher.key.startsWith(departmentFetcherKeys.all)) return undefined;
    // Determine change
    return parseDepartmentChange(fetcher);
  });

  const departments = Array.isArray(departmentsOrDepartment)
    ? departmentsOrDepartment
    : [departmentsOrDepartment];
  const departmentMap = new Map(
    departments.map((each) => [each.id, each] as const)
  );

  changes.forEach((change) => {
    const dept = departmentMap.get(change.id);
    if (!dept) return;
    const result = _.omit(change, 'id');
    departmentMap.set(change.id, { ...dept, ...result });
  });

  return departmentMap;
}

interface DepartmentPartsToApply {
  id: string;
  name?: string;
}
type FetcherWithKey = Fetcher & {
  key: string;
};

/** @description Standardises "What changed" */
function parseDepartmentChange(fetcher: FetcherWithKey) {
  const nameChanges = parseDepartmentNameFetcher(fetcher);
  if (nameChanges) return nameChanges;
  return undefined;
}

/** @description Checks if the name changed */
function parseDepartmentNameFetcher(
  fetcher: FetcherWithKey
): DepartmentPartsToApply | undefined {
  if (
    !fetcher.formData ||
    !fetcher.key.startsWith(departmentFetcherKeys.name())
  )
    return undefined;
  const base = parseWithZod(fetcher.formData, {
    schema: departmentIdForm.titleSchema,
  });
  if (base.status !== 'success') return undefined;
  return {
    id: base.value.deptId,
    name: base.value.name,
  };
}
