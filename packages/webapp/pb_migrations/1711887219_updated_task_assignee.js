/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("7gxj5bvheyycz1c")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "lkos8pm1",
    "name": "taskId",
    "type": "relation",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "zj22rb8dlt92u1a",
      "cascadeDelete": true,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("7gxj5bvheyycz1c")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "lkos8pm1",
    "name": "taskId",
    "type": "relation",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "zj22rb8dlt92u1a",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
})
