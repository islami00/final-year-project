/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "dq3cwmn9bka1qx5",
    "created": "2024-03-31 10:29:21.148Z",
    "updated": "2024-03-31 10:29:21.148Z",
    "name": "department",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "fiso7cuw",
        "name": "name",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      }
    ],
    "indexes": [],
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
  const collection = dao.findCollectionByNameOrId("dq3cwmn9bka1qx5");

  return dao.deleteCollection(collection);
})
