export const taskFetcherKeys = {
  all: 'task',

  priority: () => `${taskFetcherKeys.all}/priority`,
  sprintPoints: () => `${taskFetcherKeys.all}/sprintPoints`,
  assignee: (id: string) => `${taskFetcherKeys.all}/assignee/${id}`,
  priorityFilter: (taskId: string) => `${taskFetcherKeys.priority()}/${taskId}`,
  sprintPointsFilter: (taskId: string) =>
    `${taskFetcherKeys.sprintPoints()}/${taskId}`,
};
