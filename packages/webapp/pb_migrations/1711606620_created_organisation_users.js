/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "2qcrx1hcp406cms",
    "created": "2024-03-28 06:17:00.493Z",
    "updated": "2024-03-28 06:17:00.493Z",
    "name": "organisation_users",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "lqxsjezc",
        "name": "userId",
        "type": "relation",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "_pb_users_auth_",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": null
        }
      },
      {
        "system": false,
        "id": "uw9mo06h",
        "name": "organisationId",
        "type": "relation",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "va6wid8v3gr8xld",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": null
        }
      }
    ],
    "indexes": [
      "CREATE UNIQUE INDEX `idx_yGOgLV5` ON `organisation_users` (\n  `userId`,\n  `organisationId`\n)"
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
  const collection = dao.findCollectionByNameOrId("2qcrx1hcp406cms");

  return dao.deleteCollection(collection);
})
