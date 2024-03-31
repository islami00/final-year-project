/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "7gxj5bvheyycz1c",
    "created": "2024-03-31 10:50:25.424Z",
    "updated": "2024-03-31 10:50:25.424Z",
    "name": "task_assignee",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "lkos8pm1",
        "name": "taskId",
        "type": "relation",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "zj22rb8dlt92u1a",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": null
        }
      },
      {
        "system": false,
        "id": "exwjaqtm",
        "name": "assigneeId",
        "type": "relation",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "_pb_users_auth_",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": null
        }
      }
    ],
    "indexes": [
      "CREATE UNIQUE INDEX `idx_QTQsVig` ON `task_assignee` (\n  `taskId`,\n  `assigneeId`\n)"
    ],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("7gxj5bvheyycz1c");

  return dao.deleteCollection(collection);
})
