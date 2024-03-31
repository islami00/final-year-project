/// <reference path="../pb_data/types.d.ts" />
// @ts-check

/** Don't reference this in hooks due to serialisation */
const COL_NAME = 'board';
onModelBeforeCreate((e) => {
  const collections = {
    status: 'status',
  };
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
      boardId: e.model.getId(),
      order: idx,
    };
    return result;
  });

  // Create Default Statuses for the board
  $app.dao().runInTransaction((txDao) => {
    try {
      // Collection
      const statusCollection = txDao.findCollectionByNameOrId(
        collections.status
      );
      console.log('starting tx collection');
      // Mutation
      for (const status of statusRequests) {
        const record = new Record(statusCollection);

        record.load(status);
        console.log(`Saving status`, [status.name, status.boardId]);

        txDao.saveRecord(record);
      }
    } catch (err) {
      console.error(err);
      throw err;
    }
  });
}, COL_NAME);
