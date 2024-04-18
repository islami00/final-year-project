export const departmentFetcherKeys = {
  all: 'department',
  name: () => `${departmentFetcherKeys.all}/name`,
  titleFilter: (deptId: string) => `${departmentFetcherKeys.name()}/${deptId}`,
};
