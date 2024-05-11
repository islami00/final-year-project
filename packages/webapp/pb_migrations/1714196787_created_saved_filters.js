/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "zkcwbmlrxj7yp08",
    "created": "2024-04-27 05:46:27.634Z",
    "updated": "2024-04-27 05:46:27.634Z",
    "name": "saved_filters",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "enttfegz",
        "name": "name",
        "type": "text",
        "required": true,
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
        "id": "72htofsw",
        "name": "kind",
        "type": "select",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "maxSelect": 1,
          "values": [
            "temporary",
            "normal"
          ]
        }
      },
      {
        "system": false,
        "id": "lptzjla9",
        "name": "content",
        "type": "json",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "maxSize": 2000000
        }
      },
      {
        "system": false,
        "id": "iu6nwuul",
        "name": "createdBy",
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
    "indexes": [],
    "listRule": "createdBy ?= @request.auth.id",
    "viewRule": "createdBy ?= @request.auth.id",
    "createRule": "createdBy ?= @request.auth.id",
    "updateRule": "createdBy ?= @request.auth.id",
    "deleteRule": "createdBy ?= @request.auth.id",
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("zkcwbmlrxj7yp08");

  return dao.deleteCollection(collection);
})
