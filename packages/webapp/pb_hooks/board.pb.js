/// <reference path="../pb_data/types.d.ts" />
// @ts-check

// Mock Module
(function () {
  /** @type {import("./utils.cjs")} */
  const utils = require(`${__hooks}/utils.cjs`);

  // Create default statuses for a board
  onModelAfterCreate((e) => {
    // UTILS
    /** @type {import("./utils.cjs")} */
    const _utils = require(`${__hooks}/utils.cjs`);

    /**
     * @param {import("./types").DefinedModelEvent} event
     * @description Creates Default Statuses for Board.
     */
    function createDefaultStatus(event) {
      const { dao, model } = event;
      /**
       * @type {import("../app/models/Status.model").StatusColorDict}
       */
      const StatusColor = {
        BLUE: 'blue.6',
        GRAY: 'gray.6',
        GREEN: 'green.6',
        RED: 'red.6',
      };

      /**
       * @type {import("../app/models/Status.model").StatusCreatePartial[]}
       */
      const defaultStatuses = [
        {
          name: 'Not Started',
          color: StatusColor.GRAY,
        },
        {
          name: 'In Progress',
          color: StatusColor.BLUE,
        },
        {
          name: 'Blocked',
          color: StatusColor.RED,
        },
        {
          name: 'Completed',
          color: StatusColor.GREEN,
        },
      ];
      const statusRequests = defaultStatuses.map((each, idx) => {
        /** @type {import("../app/models/Status.model").StatusCreate} */
        const result = {
          ...each,
          boardId: model.getId(),
          order: idx,
        };
        return result;
      });

      // Create Default Statuses for the board
      dao.runInTransaction((txDao) => {
        // Collection
        const statusCollection = txDao.findCollectionByNameOrId(
          _utils.DbTables.STATUS
        );

        // Mutation
        for (const status of statusRequests) {
          const record = new Record(statusCollection);
          const form = new RecordUpsertForm($app, record);
          form.setDao(txDao);
          form.loadData(status);

          form.submit();
        }
      });
    }

    // RUN
    if (!e.dao) {
      throw new ApiError(400, 'Missing dao');
    }

    createDefaultStatus({ dao: e.dao, model: e.model });
  }, utils.DbTables.BOARD);
})();
