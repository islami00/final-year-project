export const taskFetcherKeys = {
  all: 'task',

  priority: () => `${taskFetcherKeys.all}/priority`,
  sprintPoints: () => `${taskFetcherKeys.all}/sprintPoints`,
  description: () => `${taskFetcherKeys.all}/description`,
  status: () => `${taskFetcherKeys.all}/status`,
  delete: () => `${taskFetcherKeys.all}/status`,
  list: () => `${taskFetcherKeys.all}/list`,
  listByStatus: () => `${taskFetcherKeys.list()}/byStatus`,
  assignee: (id: string) => `${taskFetcherKeys.all}/assignee/${id}`,
  priorityFilter: (taskId: string) => `${taskFetcherKeys.priority()}/${taskId}`,
  sprintPointsFilter: (taskId: string) =>
    `${taskFetcherKeys.sprintPoints()}/${taskId}`,
  descriptionFilter: (taskId: string) =>
    `${taskFetcherKeys.description()}/${taskId}`,
  statusFilter: (taskId: string) => `${taskFetcherKeys.status()}/${taskId}`,
  deleteFilter: (taskId: string) => `${taskFetcherKeys.delete()}/${taskId}`,
  listByStatusFilter: (statusId: string, page: number) =>
    `${taskFetcherKeys.listByStatus()}/${statusId}/${page}`,
};
