/// <reference path="../pb_data/types.d.ts" />
// @ts-check

const DbTables = {
  BOARD: 'board',
  DEPARTMENT: 'department',
  ORGANISATION: 'organisation',
  STATUS: 'status',
  TASK: 'task',
  TASK_ASSIGNEE: 'task_assignee',
  USERS: 'users',
  ORGANISATION_USERS: 'organisation_users',
};

const utils = {
  DbTables: DbTables,
};

module.exports = utils;
