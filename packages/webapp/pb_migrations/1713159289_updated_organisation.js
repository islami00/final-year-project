/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("va6wid8v3gr8xld")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "mulwdx4o",
    "name": "logo",
    "type": "file",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "mimeTypes": [],
      "thumbs": [],
      "maxSelect": 1,
      "maxSize": 5242880,
      "protected": false
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("va6wid8v3gr8xld")

  // remove
  collection.schema.removeField("mulwdx4o")

  return dao.saveCollection(collection)
})
