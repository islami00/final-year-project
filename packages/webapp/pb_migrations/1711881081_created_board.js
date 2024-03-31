/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "i233fli6okl1593",
    "created": "2024-03-31 10:31:21.241Z",
    "updated": "2024-03-31 10:31:21.241Z",
    "name": "board",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "bcqphi2g",
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
      },
      {
        "system": false,
        "id": "d6pgweur",
        "name": "departmentId",
        "type": "relation",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "dq3cwmn9bka1qx5",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": null
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
  const collection = dao.findCollectionByNameOrId("i233fli6okl1593");

  return dao.deleteCollection(collection);
})
