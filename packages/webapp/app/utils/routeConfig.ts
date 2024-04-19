export const routeConfig = {
  app: { param: '/app', routeId: 'routes/app' },
  org: { param: '/app/:orgId', routeId: 'routes/app.$orgId' },
  departmentList: {
    param: '/app/:orgId/departments/:deptId',
    routeId: 'routes/app.$orgId.departments.$deptId',
  },
  boardList: {
    param: '/app/:orgId/boards',
    routeId: 'routes/app.$orgId.boards',
  },
  board: {
    param: '/app/:orgId/boards/:boardId',
    routeId: 'routes/app.$orgId.boards.$boardId',
  },
  createTask: {
    param: '/app/:orgId/boards/:boardId/task/create',
    routeId: 'routes/app.$orgId.boards.$boardId.task.create',
  },
  boardTasks: {
    param: '/app/:orgId/boards/:boardId/task/:taskId',
    routeId: 'routes/app.$orgId.boards.$boardId.task.$taskId',
  },
} as const;
