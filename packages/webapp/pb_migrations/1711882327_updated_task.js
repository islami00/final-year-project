/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("zj22rb8dlt92u1a")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "kmhzjg59",
    "name": "boardId",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "i233fli6okl1593",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("zj22rb8dlt92u1a")

  // remove
  collection.schema.removeField("kmhzjg59")

  return dao.saveCollection(collection)
})
