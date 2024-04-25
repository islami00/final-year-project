export const boardFetcherKeys = {
  all: 'board',
  deleteBoard: () => `${boardFetcherKeys.all}/deleteBoard`,
  name: () => `${boardFetcherKeys.all}/name`,
  deleteBoardFilter: (id: string) => `${boardFetcherKeys.deleteBoard()}/${id}`,
  nameFilter: (boardId: string) => `${boardFetcherKeys.name()}/${boardId}`,
};
