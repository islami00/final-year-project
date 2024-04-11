export const taskFetcherKeys = {
  all: 'task',
  assignee: (id: string) => `${taskFetcherKeys.all}/${id}`,
};
