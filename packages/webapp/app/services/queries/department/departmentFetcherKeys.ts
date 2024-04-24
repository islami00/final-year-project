export const departmentFetcherKeys = {
  all: 'department',
  name: () => `${departmentFetcherKeys.all}/name`,
  delete: () => `${departmentFetcherKeys.all}/delete`,
  nameFilter: (deptId: string) => `${departmentFetcherKeys.name()}/${deptId}`,
  deleteFilter: (deptId: string) =>
    `${departmentFetcherKeys.delete()}/${deptId}`,
};
