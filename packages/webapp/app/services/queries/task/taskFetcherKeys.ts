export const taskFetcherKeys = {
  all: 'task',

  priority: () => `${taskFetcherKeys.all}/priority`,
  assignee: (id: string) => `${taskFetcherKeys.all}/assignee/${id}`,
  priorityFilter: (taskId: string) => `${taskFetcherKeys.priority()}/${taskId}`,
};
