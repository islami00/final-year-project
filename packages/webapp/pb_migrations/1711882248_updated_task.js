/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("zj22rb8dlt92u1a")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ig4uuvzm",
    "name": "description",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 2000000
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("zj22rb8dlt92u1a")

  // remove
  collection.schema.removeField("ig4uuvzm")

  return dao.saveCollection(collection)
})
